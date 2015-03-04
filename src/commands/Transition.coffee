Range  = require('gss-engine/src/commands/Range')

class Transition extends Range.Progress

  condition: (engine, operation) ->
    for op in operation
      if op.command 
        if engine.output.Time[op[0]] || @condition(engine, op)
          return true



  @define #fixme?
    '...': Range['...'].prototype.execute

  update: (range, engine, operation, continuation, scope) ->
    start = range[0] || 0
    end   = range[1] || 0
    time = new Date
    started = range[4] ||= time
    value = (time - started - start) / ((end - start) || 1)

    @ascend(engine, operation, continuation, scope, value, true)

    if value >= 1
      return true




class Spring extends Range.Progress

  @define

    'friction': ->

    'tension': ->


module.exports = Transition