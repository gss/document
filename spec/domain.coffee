assert = chai.assert
expect = chai.expect

describe 'Domain', ->
  engine = null
  afterEach ->
    if engine
      engine.destroy()

  describe 'single solving domain', ->
    it 'should use intrinsic values as known values', ->
      el = document.createElement('div')
      el.innerHTML = """
        <div id="box0" style="width: 50px"></div>
        <div id="box1" style="width: 50px"></div>
      """
      document.body.appendChild(el)
      engine =  new GSS(el)
      engine.solve [
        ['==',
          ['get', 'a']
          ['+',
            ['get', ['#', 'box0'], 'z']
            ['get', ['#', 'box1'], 'intrinsic-width']
          ]
        ]
      ], (solution) ->
        expect(solution).to.eql
          "a": 0
          "$box0[z]": -50
          "$box1[intrinsic-width]": 50
        document.body.removeChild(el)


  describe 'solvers html in worker ', ->
    @timeout 60000


    it 'should receieve measurements from document to make substitutions', (done) ->
      root = document.createElement('div')
      root.innerHTML = """
        <div id="box0" style="width: 20px"></div>
      """
      document.body.appendChild(root)
      engine =  new GSS(root, true)
      problem = [
        ['=='
          ['get', 'result']
          ['-',
            ['+'
              ['get', ['#', 'box0'], 'intrinsic-width'],
              1]
            ['get', 'x']]
        ]
      ]
      engine.solve problem, 'my_funny_tracker_path', (solution) ->
        expect(solution).to.eql 
          "$box0[intrinsic-width]": 20
          result: 0
          x: 21
        
        
        engine.solve
          x: 2
        , (solution) ->
          expect(solution).to.eql 
            result: 19
            x: 2

          engine.solve
            "x": 3
          , (solution) ->
            expect(solution).to.eql 
              result: 18
              x: 3
            engine.solve
              "x": null
            , (solution) ->
              expect(solution).to.eql 
                result: 0
                x: 21
              root.removeChild(engine.id('box0'))
              engine.then (solution) ->
                expect(solution).to.eql 
                  "$box0[intrinsic-width]": null
                  "x": null
                  "result": null



                #document.body.removeChild(root)
                done()


    it 'should receive commands from document', (done) ->
      engine = new GSS true
      problem = [
        ['=='
          ['get', 'result']
          ['+',
            ['get', 'a'],
            1]
        ]
        ['=='
          ['get', 'b']
          ['+',
            1000,
            1]
        ]
      ]

      engine.solve problem, 'my_funny_tracker_path', (solution) ->
        expect(solution).to.eql 
          a: -1
          result: 0
          b: 1001

        engine.then (solution) ->
          expect(solution).to.eql 
            a: null
            result: null
            b: null

          done()
        engine.remove('my_funny_tracker_path')

          

