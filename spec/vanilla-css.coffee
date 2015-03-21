
  # Vanilla CSS + CCSS
  # ===========================================================
  
describe 'Vanilla CSS', -> 
  
  engine = null
  container = null
  
  beforeEach ->
    container = document.createElement 'div'
    document.getElementById('fixtures').appendChild container
    window.$engine = engine = new GSS(container)
    
  afterEach ->
    container.parentNode.removeChild(container)
    engine.destroy()

  getSource = (style) ->
    Array.prototype.slice.call(style.sheet.cssRules).map (rule) ->
      return rule.cssText.replace(/^\s+|\s+$|\n|\t|\s*({|}|:|;)\s*|(\s+)/g, '$1$2').replace(/\='/g, '="').replace(/'\]/g, '"]').replace /{(.*?)}/, (m, inside) ->
        bits = inside.split(/\s*;\s*/g)
        unless bits[bits.length - 1]
          bits.pop()
        return '{' +  bits.sort().join(';') + ';}'
    .join('\n')
  
  describe 'just CSS', ->
    engine = null
  
    it 'should dump and clean', (done) ->
      container.innerHTML =  """
        <style type="text/gss" scoped>
          #css-only-dump {
            height: 100px;
          }
        </style>
        <div id="css-only-dump"></div>
        """
      engine.once 'solve', (e) ->
        expect(getSource(engine.tag('style')[1])).to.equal "#css-only-dump{height:100px;}"

        dumper = engine.id('css-only-dump')
        dumper.parentNode.removeChild(dumper)
        engine.once 'solve', (e) ->
          expect(getSource(engine.tag('style')[1])).to.equal ""

          done()   

  describe 'just with vendor prefix CSS', ->
    engine = null
  
    it 'should dump and clean', (done) ->
      engine.output.properties['line-height'].property = 'font-size'
      container.innerHTML =  """
        <style type="text/gss" scoped>
          #css-only-dump {
            line-height: 12px;
          }
        </style>
        <div id="css-only-dump"></div>
        """
      engine.once 'solve', (e) ->
        expect(getSource(engine.tag('style')[1])).to.equal "#css-only-dump{font-size:12px;}"

        dumper = engine.id('css-only-dump')
        dumper.parentNode.removeChild(dumper)
        engine.once 'solve', (e) ->
          expect(getSource(engine.tag('style')[1])).to.equal ""
          delete engine.output.properties['line-height'].property

          done()   
    
  describe 'with multiple properties', ->
    it 'should dump background color before color', (done) ->
      container.innerHTML =  """
        <style type="text/gss" scoped>
          #css-only-dump {
            background-color: green;
            color: blue;
          }
        </style>
        <div id="css-only-dump"></div>
        """
      engine.once 'solve', (e) ->
        expect(getSource(engine.tag('style')[1])).to.equal "#css-only-dump{background-color:green;color:blue;}"

        dumper = engine.id('css-only-dump')
        dumper.parentNode.removeChild(dumper)
        engine.once 'solve', (e) ->
          expect(getSource(engine.tag('style')[1])).to.equal ""

          done()   

    it 'should dump color before background-color', (done) ->
      container.innerHTML =  """
        <style type="text/gss" scoped>
          #css-only-dump {
            color: blue;
            background-color: green;
          }
        </style>
        <div id="css-only-dump"></div>
        """
      engine.once 'solve', (e) ->
        expect(getSource(engine.tag('style')[1])).to.equal "#css-only-dump{background-color:green;color:blue;}"

        dumper = engine.id('css-only-dump')
        dumper.parentNode.removeChild(dumper)
        engine.once 'solve', (e) ->
          expect(getSource(engine.tag('style')[1])).to.equal ""

          done()   


  describe 'CSS + CCSS', ->
    engine = null
  
    it 'should dump', (done) ->
      container.innerHTML =  """
        <div class="css-simple-dump"></div>
        <style type="text/gss" scoped>
          .css-simple-dump {
            width: == 100;
            height: 100px;
          }
        </style>
        """
      engine.once 'solve', (e) ->   
        expect(getSource(engine.tag('style')[1])).to.equal ".css-simple-dump{height:100px;}"

        dump = engine.class('css-simple-dump')[0]
        clone = dump.cloneNode()
        dump.parentNode.appendChild(clone)

        engine.once 'solve', (e) ->  
          expect(getSource(engine.tag('style')[1])).to.equal ".css-simple-dump{height:100px;}"
          dump.parentNode.removeChild(dump)

          engine.once 'solve', (e) ->  
            expect(getSource(engine.tag('style')[1])).to.equal ".css-simple-dump{height:100px;}"
            clone.parentNode.removeChild(clone)

            engine.once 'solve', (e) ->  
              expect(getSource(engine.tag('style')[1])).to.equal ""
              done()
  
  describe 'nested', ->
    engine = null
  
    it 'should dump', (done) ->
      container.innerHTML =  """
        <div class="outer">
          <div class="innie-outie">
            <div id="css-inner-dump-1"></div>
          </div>
        </div>
        <div class="outie">
          <div class="innie-outie">
            <div id="css-inner-dump-2"></div>
          </div>
        </div>
        <style type="text/gss" scoped>
          .outer, .outie {
            #css-inner-dump-1 {
              width: == 100;
              height: 100px;
              z-index: 5;
            }
            .innie-outie {
              #css-inner-dump-2 {
                height: 200px;
              }
            }
          }
        </style>
        """
      engine.once 'solve', ->
        expect(getSource(engine.tag('style')[1])).to.equal """
          .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:100px;z-index:5;}
          .outer .innie-outie #css-inner-dump-2, .outie .innie-outie #css-inner-dump-2{height:200px;}
          """

        el = engine.class("innie-outie")[1]
        el.setAttribute('class', 'innie-outie-zzz')

        engine.once 'solve', ->
          expect(getSource(engine.tag('style')[1])).to.equal """
            .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:100px;z-index:5;}
            """
          el.setAttribute('class', 'innie-outie')

          engine.once 'solve', ->
            expect(getSource(engine.tag('style')[1])).to.equal """
              .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:100px;z-index:5;}
              .outer .innie-outie #css-inner-dump-2, .outie .innie-outie #css-inner-dump-2{height:200px;}
              """

            done()

  describe 'custom selectors', ->
    it 'should dump', (done) ->
      container.innerHTML =  """
        <div class="outer">
          <div class="innie-outie">
            <div id="css-inner-dump-1"></div>
          </div>
        </div>
        <div class="outie">
          <div class="innie-outie">
            <div id="css-inner-dump-2"></div>
          </div>
        </div>
        <style type="text/gss" scoped>
            .innie-outie {
              !> * {
                height: 200px;

                #css-inner-dump-2 {
                  z-index: -1;
                }
              }
            }
        </style>
        """
      engine.once 'solve', ->
        expect(getSource(engine.tag('style')[1])).to.equal """
          [matches~=".innie-outie↓!>*"]{height:200px;}
          [matches~=".innie-outie↓!>*"] #css-inner-dump-2{z-index:-1;}
          """

        A = engine.class("innie-outie")[0]
        B = engine.class("innie-outie")[1]

        B.setAttribute('class', 'innie-outie-zzz')
        engine.once 'solve', ->
          expect(getSource(engine.tag('style')[1])).to.equal """
            [matches~=".innie-outie↓!>*"]{height:200px;}
            """
          B.setAttribute('class', 'innie-outie')

          engine.once 'solve', ->
            expect(getSource(engine.tag('style')[1])).to.equal """
              [matches~=".innie-outie↓!>*"]{height:200px;}
              [matches~=".innie-outie↓!>*"] #css-inner-dump-2{z-index:-1;}
              """
            A.setAttribute('class', 'innie-outie-zzz')

            engine.once 'solve', ->
              expect(getSource(engine.tag('style')[1])).to.equal """
                [matches~=".innie-outie↓!>*"]{height:200px;}
                [matches~=".innie-outie↓!>*"] #css-inner-dump-2{z-index:-1;}
                """
              B.setAttribute('class', 'innie-outie-zzz')

              engine.once 'solve', ->
                expect(getSource(engine.tag('style')[1])).to.equal ""

                A.setAttribute('class', 'innie-outie')


                engine.once 'solve', ->
                  expect(getSource(engine.tag('style')[1])).to.equal """
                    [matches~=".innie-outie↓!>*"]{height:200px;}
                    """
                  B.setAttribute('class', 'innie-outie')

                  engine.once 'solve', ->
                    expect(getSource(engine.tag('style')[1])).to.equal """
                      [matches~=".innie-outie↓!>*"]{height:200px;}
                      [matches~=".innie-outie↓!>*"] #css-inner-dump-2{z-index:-1;}
                      """
                    done()
  describe 'conditional', ->
    it 'should dump', (done) ->
      container.innerHTML =  """
        <div class="outer">
          <div class="innie-outie">
            <div id="css-inner-dump-1"></div>
          </div>
        </div>
        <div class="outie">
          <div class="innie-outie">
            <div id="css-inner-dump-2"></div>
          </div>
        </div>
        <style type="text/gss" scoped>
          .outer, .outie {
            @if $A > 0 {
              .innie-outie {
                #css-inner-dump-2 {
                  width: 100px;
                }
              }
            }
            
            #css-inner-dump-1 {
              z-index: 5;

              @if $B > 0 {
                height: 200px;
              }
            }
          }
        </style>
        """
      engine.once 'solve', ->
        expect(getSource(engine.tag('style')[1])).to.equal """
          .outer #css-inner-dump-1, .outie #css-inner-dump-1{z-index:5;}
          """
        engine.solve
          A: 1
        , ->
          expect(getSource(engine.tag('style')[1])).to.equal """
            .outer .innie-outie #css-inner-dump-2, .outie .innie-outie #css-inner-dump-2{width:100px;}
            .outer #css-inner-dump-1, .outie #css-inner-dump-1{z-index:5;}
            """
          engine.solve
            B: 1
          , ->
            expect(getSource(engine.tag('style')[1])).to.equal """
              .outer .innie-outie #css-inner-dump-2, .outie .innie-outie #css-inner-dump-2{width:100px;}
              .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:200px;z-index:5;}
              """
            engine.solve
              A: 0
            , ->
              expect(getSource(engine.tag('style')[1])).to.equal """
                .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:200px;z-index:5;}
                """
              engine.solve
                B: 0
              , ->
                expect(getSource(engine.tag('style')[1])).to.equal """
                  .outer #css-inner-dump-1, .outie #css-inner-dump-1{z-index:5;}
                  """
                engine.solve
                  B: 1
                , ->
                  expect(getSource(engine.tag('style')[1])).to.equal """
                    .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:200px;z-index:5;}
                    """
                  engine.solve
                    A: 1
                  , ->
                    expect(getSource(engine.tag('style')[1])).to.equal """
                      .outer .innie-outie #css-inner-dump-2, .outie .innie-outie #css-inner-dump-2{width:100px;}
                      .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:200px;z-index:5;}
                      """
                    engine.solve
                      B: 0
                    , ->
                      expect(getSource(engine.tag('style')[1])).to.equal """
                        .outer .innie-outie #css-inner-dump-2, .outie .innie-outie #css-inner-dump-2{width:100px;}
                        .outer #css-inner-dump-1, .outie #css-inner-dump-1{z-index:5;}
                        """
                      done()
            
  describe 'conditional inverted', ->
    it 'should dump', (done) ->
      container.innerHTML =  """
        <div class="outer">
          <div class="innie-outie">
            <div id="css-inner-dump-1"></div>
          </div>
        </div>
        <div class="outie">
          <div class="innie-outie">
            <div id="css-inner-dump-2"></div>
          </div>
        </div>
        <style type="text/gss" scoped>
          .outer, .outie {
            #css-inner-dump-1 {
              @if $B > 0 {
                height: 200px;
              }
              z-index: 5;
            }
            @if $A > 0 {
              .innie-outie {
                #css-inner-dump-2 {
                  width: 100px;
                }
              }
            }
          }
        </style>
        """
      zIndexAndHeight = (document.all && !window.atob || document.body.style.msTouchAction?) && 'height:200px;z-index:5;' || 'z-index:5;height:200px;'
      engine.once 'solve', ->
        expect(getSource(engine.tag('style')[1])).to.equal """
          .outer #css-inner-dump-1, .outie #css-inner-dump-1{z-index:5;}
          """
        engine.solve
          A: 1
        , ->
          expect(getSource(engine.tag('style')[1])).to.equal """
            .outer #css-inner-dump-1, .outie #css-inner-dump-1{z-index:5;}
            .outer .innie-outie #css-inner-dump-2, .outie .innie-outie #css-inner-dump-2{width:100px;}
            """
          engine.solve
            B: 1
          , ->
            expect(getSource(engine.tag('style')[1])).to.equal """
              .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:200px;z-index:5;}
              .outer .innie-outie #css-inner-dump-2, .outie .innie-outie #css-inner-dump-2{width:100px;}
              """
            engine.solve
              A: 0
            , ->
              expect(getSource(engine.tag('style')[1])).to.equal """
                .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:200px;z-index:5;}
                """
              engine.solve
                B: 0
              , ->
                expect(getSource(engine.tag('style')[1])).to.equal """
                  .outer #css-inner-dump-1, .outie #css-inner-dump-1{z-index:5;}
                  """
                engine.solve
                  B: 1
                , ->
                  expect(getSource(engine.tag('style')[1])).to.equal """
                    .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:200px;z-index:5;}
                    """
                  engine.solve
                    A: 1
                  , ->
                    expect(getSource(engine.tag('style')[1])).to.equal """
                      .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:200px;z-index:5;}
                      .outer .innie-outie #css-inner-dump-2, .outie .innie-outie #css-inner-dump-2{width:100px;}
                      """
                    engine.solve
                      B: 0
                    , ->
                      expect(getSource(engine.tag('style')[1])).to.equal """
                        .outer #css-inner-dump-1, .outie #css-inner-dump-1{z-index:5;}
                        .outer .innie-outie #css-inner-dump-2, .outie .innie-outie #css-inner-dump-2{width:100px;}
                        """
                      done()

  describe 'conditional with customs electors', ->
    it 'should dump', (done) ->
      container.innerHTML =  """
        <div class="outer">
          <div class="innie-outie">
            <div id="css-inner-dump-1"></div>
          </div>
        </div>
        <div class="outie">
          <div class="innie-outie">
            <div id="css-inner-dump-2"></div>
          </div>
        </div>
        <style type="text/gss" scoped>
          .outie !+ .outer, .outer ++ .outie {
            @if $A > 0 {
              .innie-outie {
                #css-inner-dump-2 {
                  width: 100px;
                }
              }
            }
            
            #css-inner-dump-1 {
              z-index: 5;

              @if $B > 0 {
                height: 200px;
              }
            }
          }
        </style>
        """
      engine.once 'solve', ->
        expect(getSource(engine.tag('style')[1])).to.equal """
          [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{z-index:5;}
          """
        engine.solve
          A: 1
        , ->
          expect(getSource(engine.tag('style')[1])).to.equal """
            [matches~=".outie!+.outer,.outer++.outie"] .innie-outie #css-inner-dump-2{width:100px;}
            [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{z-index:5;}
            """
          engine.solve
            B: 1
          , ->
            expect(getSource(engine.tag('style')[1])).to.equal """
              [matches~=".outie!+.outer,.outer++.outie"] .innie-outie #css-inner-dump-2{width:100px;}
              [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{height:200px;z-index:5;}
              """
            engine.solve
              A: 0
            , ->
              expect(getSource(engine.tag('style')[1])).to.equal """
                [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{height:200px;z-index:5;}
                """
              engine.solve
                B: 0
              , ->
                expect(getSource(engine.tag('style')[1])).to.equal """
                  [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{z-index:5;}
                  """
                engine.solve
                  B: 1
                , ->
                  expect(getSource(engine.tag('style')[1])).to.equal """
                    [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{height:200px;z-index:5;}
                    """
                  engine.solve
                    A: 1
                  , ->
                    expect(getSource(engine.tag('style')[1])).to.equal """
                      [matches~=".outie!+.outer,.outer++.outie"] .innie-outie #css-inner-dump-2{width:100px;}
                      [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{height:200px;z-index:5;}
                      """
                    engine.solve
                      B: 0
                    , ->
                      expect(getSource(engine.tag('style')[1])).to.equal """
                        [matches~=".outie!+.outer,.outer++.outie"] .innie-outie #css-inner-dump-2{width:100px;}
                        [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{z-index:5;}
                        """
                      done()
            
  describe 'conditional with customs electors inverted', ->
    it 'should dump', (done) ->
      container.innerHTML =  """
        <div class="outer">
          <div class="innie-outie">
            <div id="css-inner-dump-1"></div>
          </div>
        </div>
        <div class="outie">
          <div class="innie-outie">
            <div id="css-inner-dump-2"></div>
          </div>
        </div>
        <style type="text/gss" scoped>
          .outie !+ .outer, .outer ++ .outie {
            #css-inner-dump-1 {
              @if $B > 0 {
                height: 200px;
              }
              z-index: 5;
            }
            @if $A > 0 {
              .innie-outie {
                #css-inner-dump-2 {
                  width: 100px;
                }
              }
            }
          }
        </style>
        """
      
      engine.once 'solve', ->
        expect(getSource(engine.tag('style')[1])).to.equal """
          [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{z-index:5;}
          """
        expect(engine.class('outer')[0].getAttribute('matches')).to.eql('.outie!+.outer,.outer++.outie')
        expect(engine.class('outie')[0].getAttribute('matches')).to.eql('.outie!+.outer,.outer++.outie')
        
        engine.solve
          A: 1
        , ->
          expect(getSource(engine.tag('style')[1])).to.equal """
            [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{z-index:5;}
            [matches~=".outie!+.outer,.outer++.outie"] .innie-outie #css-inner-dump-2{width:100px;}
            """
          engine.solve
            B: 1
          , ->
            expect(getSource(engine.tag('style')[1])).to.equal """
              [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{height:200px;z-index:5;}
              [matches~=".outie!+.outer,.outer++.outie"] .innie-outie #css-inner-dump-2{width:100px;}
              """
            engine.solve
              A: 0
            , ->
              expect(getSource(engine.tag('style')[1])).to.equal """
                [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{height:200px;z-index:5;}
                """
              engine.solve
                B: 0
              , ->
                expect(getSource(engine.tag('style')[1])).to.equal """
                  [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{z-index:5;}
                  """
                engine.solve
                  B: 1
                , ->
                  expect(getSource(engine.tag('style')[1])).to.equal """
                    [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{height:200px;z-index:5;}
                    """
                  engine.solve
                    A: 1
                  , ->
                    expect(getSource(engine.tag('style')[1])).to.equal """
                      [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{height:200px;z-index:5;}
                      [matches~=".outie!+.outer,.outer++.outie"] .innie-outie #css-inner-dump-2{width:100px;}
                      """
                    engine.solve
                      B: 0
                    , ->
                      expect(getSource(engine.tag('style')[1])).to.equal """
                        [matches~=".outie!+.outer,.outer++.outie"] #css-inner-dump-1{z-index:5;}
                        [matches~=".outie!+.outer,.outer++.outie"] .innie-outie #css-inner-dump-2{width:100px;}
                        """
                      done()

  describe 'scoped + css', ->
    it 'should dump', (done) ->
      container.innerHTML =  """
        <div class="outer" id="azaza">
          <style scoped src="./fixtures/external-file-css1.gss" type="text/gss"></style>
          <button></button>
          <button></button>
        </div>  
        <div class="outie" id="outzor">
          <style scoped src="./fixtures/external-file-css1.gss" type="text/gss"></style>
          <button></button>
          <button></button>
        </div>
        """
      engine.once 'solve', ->
        expect(getSource(engine.tag('style')[1])).to.equal """
          #azaza button{z-index:1;}
          """
        expect(getSource(engine.tag('style')[3])).to.equal """
          #outzor button{z-index:1;}
          """
        for el in engine.scope.querySelectorAll('#azaza button') by -1
          el.parentNode.removeChild(el)

        engine.then ->
          expect(getSource(engine.tag('style')[1])).to.equal ""
          expect(getSource(engine.tag('style')[3])).to.equal """
            #outzor button{z-index:1;}
            """
          done()

  describe 'imported and scoped', ->
    it 'should dump', (done) ->
      container.innerHTML =  """
        <div id="something">
          <div class="outer">
            <button></button>
            <button></button>
          </div>
          <div class="outie">
            <button></button>
            <button></button>
          </div>
          <style type="text/gss" scoped>
            .outer, .outie {
              @import fixtures/external-file-css1.gss;
            }
          </style>
        </div>
        <div id="otherthing">
          <div class="outer">
            <button></button>
            <button></button>
          </div>
          <div class="outie">
            <button></button>
            <button></button>
          </div>
          <style type="text/gss" scoped>
            .outer, .outie {
              @import fixtures/external-file-css1.gss;
            }
          </style>
        </div>
        """
      engine.once 'solve', ->
        expect(engine.tag('style').length).to.eql(4)
        expect(getSource(engine.tag('style')[1])).to.equal """
          #something .outer button, #something .outie button{z-index:1;}
          """
        expect(getSource(engine.tag('style')[3])).to.equal """
          #otherthing .outer button, #otherthing .outie button{z-index:1;}
          """
        for el in engine.tag('div')
          el.setAttribute('class', '')

        engine.then ->
          expect(engine.tag('style').length).to.eql(4)
          expect(getSource(engine.tag('style')[1])).to.equal """"""
          expect(getSource(engine.tag('style')[3])).to.equal """"""
          engine.tag('div')[1].setAttribute('class', 'outer')
          
          engine.then ->
            expect(engine.tag('style').length).to.eql(4)
            expect(getSource(engine.tag('style')[1])).to.equal """
              #something .outer button, #something .outie button{z-index:1;}
              """
            expect(getSource(engine.tag('style')[3])).to.equal """"""
            engine.tag('div')[4].setAttribute('class', 'outie')

            engine.then ->
              expect(engine.tag('style').length).to.eql(4)
              expect(getSource(engine.tag('style')[1])).to.equal """
                #something .outer button, #something .outie button{z-index:1;}
                """
              expect(getSource(engine.tag('style')[3])).to.equal  """
                #otherthing .outer button, #otherthing .outie button{z-index:1;}
                """
              engine.tag('div')[1].setAttribute('class', '')
              engine.then ->
                expect(engine.tag('style').length).to.eql(4)
                expect(getSource(engine.tag('style')[1])).to.equal """"""
                expect(getSource(engine.tag('style')[3])).to.equal  """
                  #otherthing .outer button, #otherthing .outie button{z-index:1;}
                  """
                engine.tag('div')[4].setAttribute('class', '')
                engine.then ->
                  expect(engine.tag('style').length).to.eql(4)
                  expect(getSource(engine.tag('style')[1])).to.equal """"""
                  expect(getSource(engine.tag('style')[3])).to.equal  """"""
                  for el in engine.tag('div')
                    el.setAttribute('class', 'outer')
                  engine.then ->
                    expect(engine.tag('style').length).to.eql(4)
                    expect(getSource(engine.tag('style')[1])).to.equal """
                      #something .outer button, #something .outie button{z-index:1;}
                      """
                    expect(getSource(engine.tag('style')[3])).to.equal """
                      #otherthing .outer button, #otherthing .outie button{z-index:1;}
                      """
                    for el in engine.tag('div')
                      el.setAttribute('class', '')
                    engine.then ->
                      expect(engine.tag('style').length).to.eql(4)
                      expect(getSource(engine.tag('style')[1])).to.equal """"""
                      expect(getSource(engine.tag('style')[3])).to.equal  """"""
                      done()

  describe 'conditional with nested custom selectors', ->
    it 'should dump', (done) ->
      container.innerHTML =  """
        <div class="outer">
          <div class="innie-outie">
            <div id="css-inner-dump-1"></div>
          </div>
        </div>
        <div class="outie">
          <div class="innie-outie">
            <div id="css-inner-dump-2"></div>
          </div>
        </div>
        <style type="text/gss" scoped>
          .outer, .outie {
            @if $A > 0 {
              .innie-outie {
                #css-inner-dump-2 !> * > * {
                  width: 100px;
                }
              }
            }
            
            #css-inner-dump-1 {
              z-index: 5;

              @if $B > 0 {
                height: 200px;
              }
            }
          }
        </style>
        """
      engine.once 'solve', ->
        expect(getSource(engine.tag('style')[1])).to.equal """
          .outer #css-inner-dump-1, .outie #css-inner-dump-1{z-index:5;}
          """
        engine.solve
          A: 1
        , ->
          expect(getSource(engine.tag('style')[1])).to.equal """
            [matches~=".outer,.outie↓@$[A]>0↓.innie-outie↓#css-inner-dump-2!>*>*"]{width:100px;}
            .outer #css-inner-dump-1, .outie #css-inner-dump-1{z-index:5;}
            """
          expect(engine.id('css-inner-dump-2').getAttribute('matches')).to.eql('.outer,.outie↓@$[A]>0↓.innie-outie↓#css-inner-dump-2!>*>*')
          engine.solve
            B: 1
          , ->
            expect(getSource(engine.tag('style')[1])).to.equal """
              [matches~=".outer,.outie↓@$[A]>0↓.innie-outie↓#css-inner-dump-2!>*>*"]{width:100px;}
              .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:200px;z-index:5;}
              """
            expect(engine.id('css-inner-dump-2').getAttribute('matches')).to.eql('.outer,.outie↓@$[A]>0↓.innie-outie↓#css-inner-dump-2!>*>*')
          
            engine.solve
              A: 0
            , ->
              expect(getSource(engine.tag('style')[1])).to.equal """
                .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:200px;z-index:5;}
                """
              expect(engine.id('css-inner-dump-2').getAttribute('matches')).to.eql(null)
              engine.solve
                B: 0
              , ->
                expect(getSource(engine.tag('style')[1])).to.equal """
                  .outer #css-inner-dump-1, .outie #css-inner-dump-1{z-index:5;}
                  """
                engine.solve
                  B: 1
                , ->
                  expect(getSource(engine.tag('style')[1])).to.equal """
                    .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:200px;z-index:5;}
                    """
                  engine.solve
                    A: 1
                  , ->
                    expect(getSource(engine.tag('style')[1])).to.equal """
                      [matches~=".outer,.outie↓@$[A]>0↓.innie-outie↓#css-inner-dump-2!>*>*"]{width:100px;}
                      .outer #css-inner-dump-1, .outie #css-inner-dump-1{height:200px;z-index:5;}
                      """
                    engine.solve
                      B: 0
                    , ->
                      expect(getSource(engine.tag('style')[1])).to.equal """
                        [matches~=".outer,.outie↓@$[A]>0↓.innie-outie↓#css-inner-dump-2!>*>*"]{width:100px;}
                        .outer #css-inner-dump-1, .outie #css-inner-dump-1{z-index:5;}
                        """
                      done()

  describe 'imported and unscoped', ->
    it 'should dump', (done) ->
      container.innerHTML =  """
        <div id="something">
          <div class="outer">
            <button></button>
            <button></button>
          </div>
          <div class="outie">
            <button></button>
            <button></button>
          </div>
          <style type="text/gss">
            .outer, .outie {
              @import fixtures/external-file-css1.gss;

              opacity: 1;
            }
          </style>
        </div>
        """
      engine.once 'solve', ->
        expect(getSource(engine.tag('style')[1])).to.equal """
          .outer button, .outie button{z-index:1;}
          """
        expect(getSource(engine.tag('style')[2])).to.equal """
          .outer, .outie{opacity:1;}
          """
        expect(engine.tag('style').length).to.eql(3)
        for el in engine.tag('div')
          el.className = ''

        engine.then ->
          expect(getSource(engine.tag('style')[1])).to.equal """"""
          expect(getSource(engine.tag('style')[2])).to.equal """"""
          engine.tag('div')[0].className = 'outer'
          
          expect(engine.tag('style').length).to.eql(3)
          engine.then ->
            expect(getSource(engine.tag('style')[1])).to.equal """
              .outer button, .outie button{z-index:1;}
              """
            expect(getSource(engine.tag('style')[2])).to.equal """
              .outer, .outie{opacity:1;}
              """
            expect(engine.tag('style').length).to.eql(3)
            engine.tag('div')[2].className = 'outer'
            engine.then ->
              expect(engine.tag('style').length).to.eql(3)
              expect(getSource(engine.tag('style')[1])).to.equal """
                .outer button, .outie button{z-index:1;}
                """
              for el in engine.tag('div')
                el.className = ''
              engine.then ->
                expect(getSource(engine.tag('style')[1])).to.equal """"""
                expect(getSource(engine.tag('style')[2])).to.equal """"""
                
                done()


