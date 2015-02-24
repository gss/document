assert = chai.assert
expect = chai.expect

describe 'Ranges', ->
  describe 'constructor', ->
    it 'should create range', ->
      engine = new GSS(document.createElement('div'))
      engine.solve(['...', 10]).expect([null, 10])
      engine.solve(['...', null, 10]).expect([null, 10])
      engine.solve(['...', null, 20]).expect([10, 20])
      engine.solve(['...', 20, null]).expect([20])

    it 'should clip by starting point', ->
      engine = new GSS(document.createElement('div'))
      # from(5)
      engine.solve(
        ['...', 
          5
        ]
      )

      # 1 ... 20 from(10) 
      engine.solve(
        ['...', 
          10
          ['...', 1, 20]
        ]
      )


    it 'should clip by ending point', ->
      engine = new GSS(document.createElement('div'))
      # 1 ... 20 to(10) 
      engine.solve(
        ['...',   
          ['...', 1, 20]
          10
        ]
      )

      # to(5)
      engine.solve(
        ['...', 
          null,
          5
        ]
      )


    describe 'mapper', ->
      describe 'mapped explicitly'
        it 'should map one range to another', ->
          engine = new GSS(document.createElement('div'))
          # 1 ... 20 -> -20 ... -1 
          engine.solve(['--',
            ['...', 1, 20]
            ['...', -20, -1]
          ])

      describe 'with transformation', ->
        it 'should map one range to another with', ->
          engine = new GSS(document.createElement('div'))
          # 1 ... 2 ease out -> 3 ... 4 quad in 
          engine.solve(['--',
            ['out',
              ['ease',
                ['...', 1, 2]
              ]
            ]
            ['in',
              ['quad', 
                ['...', 3, 4]
              ]
            ]
          ])

      describe 'with modifiers', ->
        it 'should default to double clip', ->
          engine = new GSS(document.createElement('div'))
          # 1 ... 2 -> 3 ... 4
          engine.solve(['--',
            ['...', 1, 2]
            ['...', 3, 4]
          ])

        it 'should force LTR order and invert modifiers', ->
          engine = new GSS(document.createElement('div'))
          # 1 ... 2 ~<- 3 ... 4
          engine.solve(['-~',
            ['...', 3, 4]
            ['...', 1, 2]
          ])

      describe 'with time', ->
        it 'should map one range to another with', ->
          engine = new GSS(document.createElement('div'))
          # 1 ... 2 => 100 ms
          engine.solve(['~-',
            ['out',
              ['ease',
                ['...', 1, 2]
              ]
            ]
            ['in',
              ['quad', 
                ['...', 3, 4]
              ]
            ]
          ])

  describe 'binders', ->