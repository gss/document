describe 'Assignments', ->
  describe 'with units', ->
    it 'should compute', (done) ->
      d1 = document.createElement('div')
      d1.style.fontSize = '17px'
      d1.id = 'd1'
      document.getElementById('fixtures').appendChild(d1)

      engine = GSS(d1)
      expect(engine.solve([
        ['=', ['get', 'b'], 10]
        ['=', ['get', 'a'], ['em', ['get', 'b']]]
      ])).to.eql
        '$d1[computed-font-size]': 17,
        'a': 170
        'b': 10

      d1.setAttribute('style', 'font-size: 19px')

      engine.then ->
        expect(engine.values).to.eql
          '$d1[computed-font-size]': 19,
          'a': 190
          'b': 10


        engine.destroy()
        done()
        

