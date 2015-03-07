Range  = require('gss-engine/src/commands/Range')

class Transition extends Range.Progress

  condition: (engine, operation) ->
    for op in operation
      if op.command 
        if engine.output.Time[op[0]] || @condition(engine, op)
          return true


  size: 4
  lazy: true

  @define #fixme?
    '...': Range['...'].prototype.execute

  compute: (range, now, from) ->
    start = range[0] || 0
    end   = range[1] || 0

    return Math.min(1, (now - from - start) / ((end - start) || 1))

  complete: (range, value) ->
    if value >= 1
      return true

  update: (range, engine, operation, continuation, scope) ->
    now   = Date.now()
    from  = range[4] ||= now

    value = @compute(range, now, from)
    if value == true
      return true

    if !value? && !range[2]?
      value = range[0]

    if value?
      copy = range.slice()
      copy[2] = value
      copy.valueOf = range.valueOf
      copy.operation = range.operation
      copy.continuation = range.continuation
      copy.scope = range.scope
      @ascend(engine, operation, continuation, scope, copy, true)

    return @complete(range, value)


# Code taken from rebound.js. Thanks facebook!
class Transition.Spring extends Transition

  signature: [
    tension: ['Number']
    friction: ['Number']
  ]

  condition: null

  @define

    'spring': (tension = 40, friction = 7)->
      return @wrap [0, 1, null, 0, # start, end, now, target
                    0, 0,       # time, accumulator 
                    0, 0,       # velocity, position (fixme)
                    0, 0, 0, 0, # temp, previous states 
                    @getTension(tension), @getFriction(friction), 0]

  valueOf: ->
    if (value = @[2])?
      start = @[0]
      end = @[1]
      return value * ((end - start) || 1) + start

  getTension: (value) ->
    return (value - 30.0) * 3.62 + 194.0

  getFriction: (value) ->
    return (value - 8.0) * 3.0 + 25.0;

  compute: (range, now, from) ->
    start = range[0] || 0
    end   = range[1] || 0
    goal  = range[3] || 1
    from  = range[14] || from

    range[5] = Math.min(@MAX, range[5] + (now - from) / 1000)

    tension = range[12]
    friction = range[13]

    velocity = range[6]
    position = old = range[2]

    Tv = range[8]
    Tp = range[9]

    Pv = range[10]
    Pp = range[11]

    STEP = @STEP
    HALF = @HALF

    while range[5] >= STEP
      range[5] -= STEP

      if range[5] < STEP
        range[10] = velocity
        range[11] = position

      Av = velocity
      Aa = (tension * (goal - Tp)) - friction * velocity

      Tp = position + Av * HALF
      Tv = velocity + Aa * HALF

      Bv = Tv
      Ba = (tension * (goal - Tp)) - friction * Tv

      Tp = position + Bv * HALF
      Tv = velocity + Ba * HALF

      Cv = Tv
      Ca = (tension * (goal - Tp)) - friction * Tv

      Tp = position + Cv * HALF
      Tv = velocity + Ca * HALF

      Dv = Tv
      Da = (tension * (goal - Tp)) - friction * Tv

      dxdt = (Av + 2 * (Bv + Cv) + Dv) / 6;
      dvdt = (Aa + 2 * (Ba + Ca) + Da) / 6

      position += dxdt * STEP
      velocity += dvdt * STEP

    if interpolation = range[5] / STEP
      position = position * interpolation + range[10] * (1 - interpolation)
      velocity = velocity * interpolation + range[11] * (1 - interpolation)

    range[6] = velocity

    range[8] = Tv
    range[9] = Tp

    range[14] = now

    if range[7] && Math.abs(range[6]) < @REST_THRESHOLD
      if position != goal
        return goal
      else
        return

    range[2] = position

    if Math.abs(old - position) > @DISPLACEMENT_THRESHOLD
      range[7] = 1
      return position

  complete: (range, value) ->
    if range[7] && Math.abs(range[6]) < @REST_THRESHOLD
      range[7] = 0
      return true

  STEP: 0.001
  HALF: 0.0005
  MAX: 0.064
  DISPLACEMENT_THRESHOLD: 0.0001
  REST_THRESHOLD: 0.0001


module.exports = Transition