Engine = GSS #require 'gss-engine/lib/Engine.js'

assert = chai.assert
expect = chai.expect


fixtures = document.getElementById 'fixtures'

describe 'Exporter', ->
	container = engine = null

	beforeEach ->
    container = document.createElement('div')
    fixtures.appendChild(container)
    window.engine = engine = new GSS(container)

	afterEach ->
		container.parentNode?.removeChild(container)

	it 'should export regular styles', ->
    container.innerHTML = """
      <div id="div1"></div>
      <div id="div2"></div>
    """
   	engine.solve(['rule', ['tag', 'div'], [
   		['==', ['get', 'width'], 100],
   		['==', ['get', 'z-index'], 1]
   	]])

   	expect(window.engine.exporter.export(container)).to.eql("""
   		#div1{width: 1rem; z-index: 1;}
   		#div2{width: 1rem; z-index: 1;}
   	""")

   


