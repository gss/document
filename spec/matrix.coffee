
expect = chai.expect
assert = chai.assert


if document.body.style.transform?
  property = 'transform'
else if document.body.style.webkitTransform?
  property = 'webkitTransform'
else if document.body.style.mozTransform?
  property = 'mozTransform'

return unless property

describe 'Matrix', ->
  engine = null
  before ->
    container = document.createElement('div')
    window.$engine = engine = new GSS(container, {
      half: 0.5
      three: 3
    })
    engine.compile()
    
  describe 'dispatched by argument types', ->
    it 'should properly recognize matrix operations', ->
      expect(engine.output.Command(['translateX', 3])).to.be.an.
        instanceof(engine.output.Matrix.Transformation1)
      expect(engine.output.Command(['translateX', 3])).to.be.an.
        instanceof(engine.output.Matrix)

      expect(-> engine.output.Command(['translateX', 3, 3])).to.
        throw(/Too many/)

      expect(-> engine.output.Command(['translateX', 'a'])).to.
        throw(/Unexpected argument/)

  describe 'when executed', ->
    describe 'independently', ->
      it 'should initialize matrix', ->
        rotated = engine.output.Matrix::_mat4.create()
        rotated = engine.output.Matrix::_mat4.rotateZ(rotated, rotated, 180 * (Math.PI / 180))
        rotate = ['rotateZ', 0.5]
        expect(engine.output.Command(rotate).solve(engine.output, rotate)).
          to.eql rotated

    describe 'as nested commands', ->
      it 'should return final matrix', ->
        rotated = engine.output.Matrix::_mat4.create()
        rotated = engine.output.Matrix::_mat4.rotateY(rotated, rotated, - 18 * (Math.PI / 180))
        rotated = engine.output.Matrix::_mat4.rotateZ(rotated, rotated, 180 * (Math.PI / 180))
        rotate = ['rotateZ', ['rotateY', -0.05], 0.5]
        expect(engine.output.Command(rotate).solve(engine.output, rotate)).
          to.eql rotated

    describe 'as flat commands', ->
      it 'should return final matrix', ->
        rotated = engine.output.Matrix::_mat4.create()
        rotated = engine.output.Matrix::_mat4.rotateY(rotated, rotated, - 18 * (Math.PI / 180))
        rotated = engine.output.Matrix::_mat4.rotateZ(rotated, rotated, 180 * (Math.PI / 180))
        rotate = [['rotateY', -0.05], ['rotateZ', 0.5]]
        expect(engine.output.Command(rotate).solve(engine.output, rotate)).
          to.eql rotated

  describe 'defined as a sequence of matrix operations', ->
    it 'should group together', ->
      sequence = [
        ['translateX', 3],
        ['rotateZ', 2]
      ]
      expect(engine.output.Command(sequence)).to.be.an.
        instanceof(engine.output.Matrix::Sequence)
      expect(engine.output.Command(['translateX', 3])).to.eql(sequence[0].command)
      expect(engine.output.Command(['rotateZ', 3])).to.not.eql( sequence[1].command)
      expect(engine.output.Command(['rotateZ', ['translateX', 3], 3])).to.eql(sequence[1].command)
      expect(->
        engine.output.Command([
          1,
          ['rotateZ', 2]
        ])
      ).to.throw(/Undefined/)

  describe 'when used with unknown variables', ->
    it 'should update and recompute matrix', () ->
      expect(engine.solve(['set', 'transform', [
        ['translateX', 3]
        ['rotateZ', ['get', 'unknown']]
      ]])).to.eql(undefined)

  describe 'when used with units', ->
    it 'should update and recompute matrix', () ->
      engine.solve([
        ['==', ['get', 'a'], ['get', ['::window'], 'width']]
        ['=', 'transform', [
          ['translateX', ['vw', 3]]
          ['rotateZ', 0.5]
        ]]
      ])



  describe 'when used with known variables', ->
    it 'should update and recompute matrix', (done) ->
      container = document.createElement('div')
      document.getElementById('fixtures').appendChild(container)
      container.innerHTML = '<div id="d1"></div><div id="d2"></div>'
      window.$engine = engine = new GSS(container, {
        half: 0.5
        three: 3
      })
      d1 = engine.id('d1')
      d2 = engine.id('d2')

      M_tX3_rZ1of2 = engine.output.Matrix::_mat4.create()
      M_tX3_rZ1of2 = engine.output.Matrix::_mat4.translate(M_tX3_rZ1of2, M_tX3_rZ1of2, [3, 0, 0])
      M_tX3_rZ1of2 = engine.output.Matrix::_mat4.rotateZ(M_tX3_rZ1of2, M_tX3_rZ1of2, 180 * (Math.PI / 180))
      expect(engine.solve(['rule', ['tag', 'div'],
        ['=', ['get', 'transform'], [
          ['translateX', 3]
          ['rotateZ', ['get', ['$'], 'half']]
        ]]
      ])).to.eql({'$d1[transform]': M_tX3_rZ1of2, '$d2[transform]': M_tX3_rZ1of2})

      T_tX3_rZ1of2 = d1.style[property]
      d1.style[property] = engine.output.Matrix::format(M_tX3_rZ1of2)
      expect(d1.style[property]).to.eql(T_tX3_rZ1of2)

      M_tX3_rZ3of4 = engine.output.Matrix::_mat4.create()
      M_tX3_rZ3of4 = engine.output.Matrix::_mat4.translate(M_tX3_rZ3of4, M_tX3_rZ3of4, [3, 0, 0])
      M_tX3_rZ3of4 = engine.output.Matrix::_mat4.rotateZ(M_tX3_rZ3of4, M_tX3_rZ3of4, 270 * (Math.PI / 180))

      engine.data.merge({'half': 0.75})
      T_tX3_rZ3of4 = d1.style[property]
      d1.style[property] = engine.output.Matrix::format(M_tX3_rZ3of4)
      expect(d1.style[property]).to.eql(T_tX3_rZ3of4)

      engine.data.merge({'half': 0.5})
      expect(d1.style[property]).to.eql(T_tX3_rZ1of2)

      engine.then ->
        expect(engine.values).to.eql({'half': 0.5, 'three': 3})
        expect(engine.identity['$d1']).to.eql(undefined)
        expect(engine.identity['$d2']).to.eql(undefined)
        done()
      container.innerHTML =  ""

  describe 'when used with known variables before static part', ->
    it 'should update and recompute matrix', (done) ->
      container = document.createElement('div')
      document.getElementById('fixtures').appendChild(container)
      container.innerHTML = '<div id="d1"></div><div id="d2"></div>'
      window.$engine = engine = new GSS(container, {
        half: 0.5
        three: 3
      })
      d1 = engine.id('d1')
      d2 = engine.id('d2')

      M_tX3_rZ1of2 = engine.output.Matrix::_mat4.create()
      M_tX3_rZ1of2 = engine.output.Matrix::_mat4.rotateZ(M_tX3_rZ1of2, M_tX3_rZ1of2, 180 * (Math.PI / 180))
      M_tX3_rZ1of2 = engine.output.Matrix::_mat4.translate(M_tX3_rZ1of2, M_tX3_rZ1of2, [3, 0, 0])
      expect(engine.solve(['rule', ['tag', 'div'],
        ['=', ['get', 'transform'], [
          ['rotateZ', ['get', ['$'], 'half']]
          ['translateX', 3]
        ]]
      ])).to.eql({'$d1[transform]': M_tX3_rZ1of2, '$d2[transform]': M_tX3_rZ1of2})

      T_tX3_rZ1of2 = d1.style[property]
      d1.style[property] = engine.output.Matrix::format(M_tX3_rZ1of2)
      expect(d1.style[property]).to.eql(T_tX3_rZ1of2)

      M_tX3_rZ3of4 = engine.output.Matrix::_mat4.create()
      M_tX3_rZ3of4 = engine.output.Matrix::_mat4.rotateZ(M_tX3_rZ3of4, M_tX3_rZ3of4, 270 * (Math.PI / 180))
      M_tX3_rZ3of4 = engine.output.Matrix::_mat4.translate(M_tX3_rZ3of4, M_tX3_rZ3of4, [3, 0, 0])

      engine.data.merge({'half': 0.75})
      T_tX3_rZ3of4 = d1.style[property]
      d1.style[property] = engine.output.Matrix::format(M_tX3_rZ3of4)
      expect(d1.style[property]).to.eql(T_tX3_rZ3of4)

      engine.data.merge({'half': 0.5})
      expect(d1.style[property]).to.eql(T_tX3_rZ1of2)

      container.innerHTML =  ""
      engine.then ->
        expect(engine.values).to.eql({'half': 0.5, 'three': 3})
        expect(engine.identity['$d1']).to.eql(undefined)
        expect(engine.identity['$d2']).to.eql(undefined)
        done()


      
      

  describe 'when used with multiple variables', ->
    it 'should update and recompute matrix', (done) ->

      container = document.createElement('div')
      document.getElementById('fixtures').appendChild(container)
      container.innerHTML = '<div id="d1"></div><div id="d2"></div>'
      window.$engine = engine = new GSS(container, {
        half: 0.5
        three: 3
      })
      d1 = engine.id('d1')
      d2 = engine.id('d2')

      M_tX3_rZ1of2 = engine.output.Matrix::_mat4.create()
      M_tX3_rZ1of2 = engine.output.Matrix::_mat4.translate(M_tX3_rZ1of2, M_tX3_rZ1of2, [3, 0, 0])
      M_tX3_rZ1of2 = engine.output.Matrix::_mat4.rotateZ(M_tX3_rZ1of2, M_tX3_rZ1of2, 180 * (Math.PI / 180))
      expect(engine.solve(['rule', ['tag', 'div'],
        ['=', ['get', 'transform'], [
          ['translateX', ['get', ['$'], 'three']]
          ['rotateZ', ['get', ['$'], 'half']]
        ]]
      ])).to.eql(
        '$d1[transform]': M_tX3_rZ1of2
        '$d2[transform]': M_tX3_rZ1of2
      )
      T_tX3_rZ1of2 = d1.style[property]
      d1.style[property] = engine.output.Matrix::format(M_tX3_rZ1of2)
      expect(d1.style[property]).to.eql(T_tX3_rZ1of2)
      expect(d2.style[property]).to.eql(T_tX3_rZ1of2)

      M_tX3_rZ3of4 = engine.output.Matrix::_mat4.create()
      M_tX3_rZ3of4 = engine.output.Matrix::_mat4.translate(M_tX3_rZ3of4, M_tX3_rZ3of4, [3, 0, 0])
      M_tX3_rZ3of4 = engine.output.Matrix::_mat4.rotateZ(M_tX3_rZ3of4, M_tX3_rZ3of4, 270 * (Math.PI / 180))

      engine.data.merge({'half': 0.75})
      T_tX3_rZ3of4 = d1.style[property]
      d1.style[property] = engine.output.Matrix::format(M_tX3_rZ3of4)
      expect(d1.style[property]).to.eql(T_tX3_rZ3of4)

      engine.data.merge({'three': -3})
      M_tXminus3_rZ3of4 = engine.output.Matrix::_mat4.create()
      M_tXminus3_rZ3of4 = engine.output.Matrix::_mat4.translate(M_tXminus3_rZ3of4, M_tXminus3_rZ3of4, [-3, 0, 0])
      M_tXminus3_rZ3of4 = engine.output.Matrix::_mat4.rotateZ(M_tXminus3_rZ3of4, M_tXminus3_rZ3of4, 270 * (Math.PI / 180))

      T_tXminus3_rZ3of4 = d1.style[property]
      engine.scope.style[property] = engine.output.Matrix::format(M_tXminus3_rZ3of4)
      expect(d1.style[property]).to.eql(T_tXminus3_rZ3of4)


      engine.data.merge({'half': 0.5, 'three': 3})
      expect(d1.style[property]).to.eql(T_tX3_rZ1of2)
      #engine.data.merge({'three': null})
      #expect(d1.style[property]).to.eql('')
      container.innerHTML =  ""
      engine.then ->
        expect(engine.values).to.eql({'half': 0.5, 'three': 3})

        done()


  describe 'when used as separate property and transform property together', ->
    it 'should update and recompute final matrix', (done) ->

      container = document.createElement('div')
      document.getElementById('fixtures').appendChild(container)
      container.innerHTML = '<div id="d1"></div><div id="d2"></div>'
      window.$engine = engine = new GSS(container, {
        half: 0.5
        three: 3
      })
      d1 = engine.id('d1')
      d2 = engine.id('d2')

      MT = engine.output.Matrix::_mat4.create()
      MT = engine.output.Matrix::_mat4.rotateZ(MT, MT, 180 * (Math.PI / 180))
      MT = engine.output.Matrix::_mat4.translate(MT, MT, [3, 0, 0])


      MPT = engine.output.Matrix::_mat4.create()
      MPT = engine.output.Matrix::_mat4.rotateZ(MPT, MPT, 180 * (Math.PI / 180))
      MPT = engine.output.Matrix::_mat4.translate(MPT, MPT, [3, 0, 0])
      MPT = engine.output.Matrix::_mat4.rotateX(MPT, MPT, 3.5 * 360 * (Math.PI / 180))

      expect(engine.solve(['rule', ['tag', 'div'], [
        ['=', ['get', 'transform'], [
          ['translateX', ['get', ['$'], 'three']]
          ['rotateZ', ['get', ['$'], 'half']]
        ]]
        ['=', 
          ['get', 'rotate-x']
          ['+', ['get', ['$'], 'three'], ['get', ['$'], 'half']]
        ]
      ]])).to.eql(
        '$d1[transform]': MT
        '$d2[transform]': MT
        '$d1[rotate-x]': 3.5
        '$d2[rotate-x]': 3.5
      )
      TPT = d1.style[property]
      d1.style[property] = engine.output.Matrix::format(MPT)
      expect(d1.style[property]).to.eql(TPT)
      expect(d2.style[property]).to.eql(TPT)


      MPT2 = engine.output.Matrix::_mat4.create()
      MPT2 = engine.output.Matrix::_mat4.rotateZ(MPT2, MPT2, 270 * (Math.PI / 180))
      MPT2 = engine.output.Matrix::_mat4.translate(MPT2, MPT2, [3, 0, 0])
      MPT2 = engine.output.Matrix::_mat4.rotateX(MPT2, MPT2, 3.75 * 360 * (Math.PI / 180))

      engine.data.merge({'half': 0.75})
      TPT2 = d1.style[property]
      d1.style[property] = engine.output.Matrix::format(MPT2)
      expect(d1.style[property]).to.eql(TPT2)

      engine.data.merge({'three': -3})
      MPT3 = engine.output.Matrix::_mat4.create()
      MPT3 = engine.output.Matrix::_mat4.rotateZ(MPT3, MPT3, 270 * (Math.PI / 180))
      MPT3 = engine.output.Matrix::_mat4.translate(MPT3, MPT3, [-3, 0, 0])
      MPT3 = engine.output.Matrix::_mat4.rotateX(MPT3, MPT3, -2.25 * 360 * (Math.PI / 180))

      TPT3 = d1.style[property]
      engine.scope.style[property] = engine.output.Matrix::format(MPT3)
      expect(d1.style[property]).to.eql(TPT3)


      engine.data.merge({'half': 0.5, 'three': 3})
      expect(d1.style[property]).to.eql(TPT)
      #engine.data.merge({'three': null})
      #expect(d1.style[property]).to.eql('')
      container.innerHTML =  ""
      engine.then ->
        expect(engine.values).to.eql({'half': 0.5, 'three': 3})

        done()



  describe 'when used as separate properties', ->
    it 'should update and recompute matrix', (done) ->

      container = document.createElement('div')
      document.getElementById('fixtures').appendChild(container)
      container.innerHTML = '<div id="d1"></div><div id="d2"></div>'
      window.$engine = engine = new GSS(container, {
        half: 0.5
        three: 3
      })
      d1 = engine.id('d1')
      d2 = engine.id('d2')

      M_tX3_rZ1of2 = engine.output.Matrix::_mat4.create()
      M_tX3_rZ1of2 = engine.output.Matrix::_mat4.rotateZ(M_tX3_rZ1of2, M_tX3_rZ1of2, 180 * (Math.PI / 180))
      M_tX3_rZ1of2 = engine.output.Matrix::_mat4.translate(M_tX3_rZ1of2, M_tX3_rZ1of2, [3, 0, 0])
      expect(engine.solve(['rule', ['tag', 'div'], [
        ['=', ['get', ['&'], 'translate-x'], ['get', ['$'], 'three']]
        ['=', ['get', ['&'], 'rotate-z'], ['get', ['$'], 'half']]
      ]])).to.eql(
        '$d1[translate-x]': 3
        '$d1[rotate-z]': 0.5
        '$d2[translate-x]': 3
        '$d2[rotate-z]': 0.5
      )
      T_tX3_rZ1of2 = d1.style[property]
      d1.style[property] = engine.output.Matrix::format(M_tX3_rZ1of2)
      expect(d1.style[property]).to.eql(T_tX3_rZ1of2)
      expect(d2.style[property]).to.eql(T_tX3_rZ1of2)

      M_tX3_rZ3of4 = engine.output.Matrix::_mat4.create()
      M_tX3_rZ3of4 = engine.output.Matrix::_mat4.rotateZ(M_tX3_rZ3of4, M_tX3_rZ3of4, 270 * (Math.PI / 180))
      M_tX3_rZ3of4 = engine.output.Matrix::_mat4.translate(M_tX3_rZ3of4, M_tX3_rZ3of4, [3, 0, 0])

      engine.data.merge({'half': 0.75})
      T_tX3_rZ3of4 = d1.style[property]
      d1.style[property] = engine.output.Matrix::format(M_tX3_rZ3of4)
      expect(d1.style[property]).to.eql(T_tX3_rZ3of4)

      engine.data.merge({'three': -3})
      M_tXminus3_rZ3of4 = engine.output.Matrix::_mat4.create()
      M_tXminus3_rZ3of4 = engine.output.Matrix::_mat4.rotateZ(M_tXminus3_rZ3of4, M_tXminus3_rZ3of4, 270 * (Math.PI / 180))
      M_tXminus3_rZ3of4 = engine.output.Matrix::_mat4.translate(M_tXminus3_rZ3of4, M_tXminus3_rZ3of4, [-3, 0, 0])

      T_tXminus3_rZ3of4 = d1.style[property]
      engine.scope.style[property] = engine.output.Matrix::format(M_tXminus3_rZ3of4)
      expect(d1.style[property]).to.eql(T_tXminus3_rZ3of4)


      engine.data.merge({'half': 0.5, 'three': 3})
      expect(d1.style[property]).to.eql(T_tX3_rZ1of2)
      #engine.data.merge({'three': null})
      #expect(d1.style[property]).to.eql('')
      container.innerHTML =  ""
      engine.then ->
        expect(engine.values).to.eql({'half': 0.5, 'three': 3})

        done()

  xdescribe 'use as function call upon selector', ->
    it 'should mutate element matrix', (done) ->
      engine.scope.innerHTML = """
        <div></div>
        <div></div>
      """
      engine.solve([['tag', 'div'], ['translateX', 10]])
      engine.then ->
        done()

