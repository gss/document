

describe 'Ranges', ->
  engine = null
  before ->
    engine = new GSS(document.createElement('div'))
    engine.compile()

  describe 'types', ->
    it 'should use proper range type', ->
      expect(engine.output.Command(['...', 10])).to.not.be.instanceOf(engine.output.Transition)
      expect(engine.output.Command(['...', ['ms', 10]])).to.be.instanceOf(engine.output.Transition)
      expect(engine.output.Command(['...', ['+', ['ms', 10], 20]])).to.be.instanceOf(engine.output.Transition)
  

  describe 'mappers', ->
    describe 'with static range on the left', ->
      xdescribe 'and static range on the right', ->
        it 'should not do anything', ->

      xdescribe 'and value range on the right', ->
        it 'should not do anything', ->

      describe 'and transition on the right', ->
        describe 'with lower boundary', ->
          describe 'with upper boundary', ->

            describe 'without delay', ->
              it 'should start transition', (done) ->
                counter = 0
                engine.addEventListener 'solved', listener = (solution) ->
                  if ++counter == 1
                    expect(+solution.A).to.eql(0)
                  else if +solution.A == 1
                    engine.remove('tracking')
                  else if solution.A == null
                    engine.removeEventListener('solved', listener)
                    done()

                engine.solve(['=', ['get', 'A'], ['map', 
                  [
                    '...',
                    0,
                    1
                  ],

                  [
                    '...',
                    false,
                    ['ms', 10]
                  ]
                ]], 'tracking')

            xdescribe 'with implicit range', ->
              describe 'without delay', ->
                it 'should start transition', (done) ->
                  counter = 0
                  engine.addEventListener 'solved', listener = (solution) ->
                    if ++counter == 1
                      expect(+solution.A).to.eql(0)
                    else if solution.A == 1
                      engine.remove('tracking')
                    else if solution.A == null
                      engine.removeEventListener('solved', listener)
                      done()

                  # 0 > 1 -> 10ms
                  engine.solve(['=', ['get', 'A'], ['map', 
                    [
                      '>',
                      0,
                      1
                    ],

                    [
                      '...',
                      false,
                      ['ms', 10]
                    ]
                  ]], 'tracking')

            describe 'with implicit range starting from half', ->
              describe 'without delay', ->
                it 'should start transition', (done) ->
                  counter = 0
                  engine.addEventListener 'solved', listener = (solution) ->
                    if ++counter == 1
                      expect(+solution.A).to.eql(0.5)
                    else if +solution.A == 1
                      engine.remove('tracking')
                    else if solution.A == null
                      engine.removeEventListener('solved', listener)
                      done()
                  # 0 < 0.5 < 1 -> 10ms
                  engine.solve(['=', ['get', 'A'], ['map', 
                    ['<', 
                      0, 
                      ['<',
                        0.5,
                        1]]

                    [
                      '...',
                      false,
                      ['ms', 10]
                    ]
                  ]], 'tracking')


            describe 'with delay', ->
              it 'should start transition', (done) ->
                first = true
                engine.addEventListener 'solved', listener = (solution) ->
                  if first
                    first = false
                    expect(+solution.A).to.eql(0)
                  else if +solution.A == 1
                    engine.remove('tracking')
                  else if solution.A == null
                    engine.removeEventListener('solved', listener)
                    done()

                # 0 ... 1 -> 10ms ... 20ms
                engine.solve(['=', ['get', 'A'], ['map', 
                  [
                    '...',
                    0,
                    1
                  ],

                  [
                    '...',
                    ['ms', 10],
                    ['ms', 20]
                  ]
                ]], 'tracking')
          describe 'without upper boundary', ->
            describe 'without delay', ->
              it 'should start transition', (done) ->
                counter = 0
                engine.addEventListener 'solved', listener = (solution) ->
                  if ++counter == 1
                    expect(+solution.A).to.eql(0)
                  else if +solution.A >= 1
                    engine.remove('tracking')
                  else if solution.A == null
                    engine.removeEventListener('solved', listener)
                    done()

                engine.solve(['=', ['get', 'A'], ['map', 
                  [
                    '...',
                    0,
                    false
                  ],

                  [
                    '...',
                    false,
                    ['ms', 10]
                  ]
                ]], 'tracking')


            describe 'with delay', ->
              it 'should start transition', (done) ->
                counter = 0
                engine.addEventListener 'solved', listener = (solution) ->
                  if ++counter == 1
                    expect(+solution.A).to.eql(0)
                  else if +solution.A >= 1
                    engine.remove('tracking')
                  else if solution.A == null
                    engine.removeEventListener('solved', listener)
                    done()

                # 0 ... 1 -> 10ms ... 20ms
                engine.solve(['=', ['get', 'A'], ['map', 
                  [
                    '...',
                    0,
                    false
                  ],

                  [
                    '...',
                    ['ms', 10],
                    ['ms', 20]
                  ]
                ]], 'tracking')
        describe 'without lower boundary', ->
          describe 'with upper boundary', ->
            describe 'without delay', ->
              it 'should start transition', (done) ->
                counter = 0
                engine.addEventListener 'solved', listener = (solution) ->
                  if ++counter == 1
                    expect(+solution.A).not.to.eql(1)
                  else if +solution.A == 1
                    engine.remove('tracking')
                  else if solution.A == null
                    engine.removeEventListener('solved', listener)
                    done()

                # 1 -> 10ms ... 20ms
                engine.solve(['=', ['get', 'A'], ['map', 
                  1,
                  [
                    '...',
                    false
                    ['ms', 20]
                  ]
                ]], 'tracking')

                expect(engine.values.A).to.not.eql(undefined)

            describe 'with delay', ->
              it 'should start transition', (done) ->
                first = true
                engine.addEventListener 'solved', listener = (solution) ->
                  if first
                    first = false
                    expect(+solution.A).to.not.eql(-1)
                  else if +solution.A == 1
                    engine.remove('tracking')
                  else if solution.A == null
                    engine.removeEventListener('solved', listener)
                    done()

                engine.solve(['=', ['get', 'A'], ['map', 
                  1,
                  [
                    '...',
                    ['ms', 10],
                    ['ms', 100]
                  ]
                ]], 'tracking')

                expect(engine.values.A).to.eql(undefined)

          describe 'without upper boundary', ->
            describe 'without delay', ->
              it 'should start transition', (done) ->
                counter = 0
                engine.addEventListener 'solved', listener = (solution) ->
                  if ++counter == 1
                    expect(+solution.A).not.to.eql(1)
                  else if +solution.A >= 1
                    engine.remove('tracking')
                  else if solution.A == null
                    engine.removeEventListener('solved', listener)
                    done()

                # 1 -> 10ms ... 20ms
                engine.solve(['=', ['get', 'A'], ['map', 
                  ['...', false, false],
                  [
                    '...',
                    false
                    ['ms', 20]
                  ]
                ]], 'tracking')

            describe 'with delay', ->
              it 'should start transition', (done) ->
                first = true
                engine.addEventListener 'solved', listener = (solution) ->
                  if first
                    first = false
                    expect(+solution.A).to.eql(-1)
                  else if +solution.A >= 1
                    engine.remove('tracking')
                  else if solution.A == null
                    engine.removeEventListener('solved', listener)
                    done()

                engine.solve(['=', ['get', 'A'], ['map', 
                  ['...', false, false],
                  [
                    '...',
                    ['ms', 10],
                    ['ms', 20]
                  ]
                ]], 'tracking')

      xdescribe 'and spring on the right', ->
        it 'should start transition', ->


    describe 'with value range on the left', ->
      xdescribe 'and static range on the right', ->
        it 'should map ranges', ->

      xdescribe 'and update property on the right', ->
        it 'should not do anything', ->

      xdescribe 'and transition on the right', ->
        it 'should not do anything', ->

      xdescribe 'and spring on the right', ->
        it 'should start transition', ->


    describe 'with transition range on the left', ->
      describe 'and static range on the right', ->
        it 'should map ranges over time', ->
          first = true
          engine.addEventListener 'solved', listener = (solution) ->
            if first
              first = false
              expect(solution.A).to.eql(undefined)
              engine.remove('tracking')
            else if solution.A == null
              engine.removeEventListener('solved', listener)
              done()

          engine.solve(['=', ['get', 'A'], ['map', 
            ['spring', 10, 20],
            [
              '...',
              0,
              1
            ]
          ]], 'tracking')

          expect(engine.values.A).to.eql(undefined)
          #expect(engine.ranges).to.be.eql(undefined)


      xdescribe 'and update property on the right', ->
        it 'should map ranges over time', ->

      describe 'and transition on the right', ->
        it 'should map ranges over time', ->
          first = true
          engine.addEventListener 'solved', listener = (solution) ->
            if first
              first = false
              expect(solution.A).to.eql(undefined)
              engine.remove('tracking')
            else if solution.A == null
              engine.removeEventListener('solved', listener)
              done()

          engine.solve(['=', ['get', 'A'], ['map', 
            ['spring', 10, 20],
            [
              '...',
              0,
              1
            ]
          ]], 'tracking')

          expect(engine.values.A).to.eql(undefined)
          #expect(engine.ranges).to.be.eql(undefined)

      xdescribe 'and spring on the right', ->
        it 'should start transition', ->