# .gss files
# ===========================================================

describe 'External .gss files', ->
  
  engine = null
  container = null
  
  beforeEach ->
    container = document.createElement 'div'
    document.getElementById('fixtures').appendChild container
    window.$engine = engine = new GSS(container)
    
  afterEach ->
    container.parentNode.removeChild(container)
    engine.destroy()

  
  @timeout 40000
  describe "single scoped file", ->
  
    it 'should compute', (done) ->
      counter = 0
      listen = (e) ->     
        counter++
        if counter == 1
          expect(engine.values).to.eql 
            "$something[external-file]": 1000
          container.innerHTML = ""
        else
          expect(engine.values).to.eql {}
          engine.removeEventListener 'solve', listen
          done()     
                     
      engine.addEventListener 'solve', listen
  
      container.innerHTML =  """
          <div id="something">
            <link rel="stylesheet" type="text/gss" href="./fixtures/external-file.gss" scoped></link>
          </div>
        """
        
  describe "single imported file", ->
  
    it 'should compute', (done) ->
      counter = 0
      listen = (e) ->     
        counter++
        if counter == 1
          expect(engine.values).to.eql 
            "$something[external-file]": 1000
          container.innerHTML = ""
        else
          expect(engine.values).to.eql {}
          engine.removeEventListener 'solve', listen
          done()     
                     
      engine.addEventListener 'solve', listen
  
      container.innerHTML =  """
          <div id="something">
            <style type="text/gss" scoped>
              @import ./fixtures/external-file.gss;
            </style>
          </div>
        """
        
  describe "single conditional imported file", ->
  
    it 'should compute', (done) ->
      counter = 0
      listen = (e) ->     
        counter++
        if counter == 1
          expect(engine.values).to.eql 
            a: 0
            "$something[external-file]": 1000
          engine.solve
            a: 100
        else if counter == 2
          expect(engine.values).to.eql 
            a: 100
            "$something[external-file-2]": 2000
          engine.solve
            a: 5
        else if counter == 3
          expect(engine.values).to.eql 
            a: 5
            "$something[external-file]": 1000
          container.innerHTML = ""
        else
          expect(engine.values).to.eql {}
          engine.removeEventListener 'solve', listen
          done()     
                     
      engine.addEventListener 'solve', listen
  
      container.innerHTML =  """
          <div id="something">
            <style type="text/gss" scoped>
              $a = 0;
              @if $a > 10 {
                @import ./fixtures/external-file-2.gss;

              } @else {
                @import ./fixtures/external-file.gss;

              }
            </style>
          </div>
        """

  describe "single scoped file", ->
  
    it 'should compute', (done) ->
      counter = 0
      listen = (e) ->     
        counter++
        if counter == 1
          expect(engine.values).to.eql 
            "$something[external-file]": 1000
          container.innerHTML = ""
        else
          expect(engine.values).to.eql {}
          engine.removeEventListener 'solve', listen
          done()     
                     
      engine.addEventListener 'solve', listen
  
      container.innerHTML =  """
          <div id="something">
            <link rel="stylesheet" type="text/gss" href="./fixtures/external-file.gss" scoped></link>
          </div>
        """

  describe "multiple files", ->
  
    it 'should compute', (done) ->
      counter = 0
      listen = (e) ->
        counter++
        if counter == 1
          expect(engine.values).to.eql 
            "external-file": 1000
            "external-file-2": 2000
            "external-file-3": 3000
          container.innerHTML = ""
        else
          expect(engine.values).to.eql {}
          engine.removeEventListener 'solve', listen
          done()     
                   
      engine.addEventListener 'solve', listen
  
      container.innerHTML =  """
          <link rel="stylesheet" type="text/gss" href="./fixtures/external-file.gss" scoped></link>
          <link rel="stylesheet" type="text/gss" href="./fixtures/external-file-2.gss" scoped></link>
          <link rel="stylesheet" type="text/gss" href="./fixtures/external-file-3.gss" scoped></link>
        """

  describe "single scoped file with some selectors", ->
  
    it 'should compute', (done) ->
      counter = 0
      listen = (e) ->     
        counter++
        if counter == 1
          expect(engine.values['$title1[width]']).to.eql undefined
          expect(engine.values['$title2[width]']).to.eql 300
          container.innerHTML = ""
        else
          expect(engine.values).to.eql {}
          engine.removeEventListener 'solve', listen
          done()     
                     
      engine.addEventListener 'solve', listen
  
      container.innerHTML =  """
  <section id="s1">
    <article id="a1" class="post left repost media image w-cover landscape w-title w-source w-author titleTC imageMC linkBC "  >
       <div id="b1" class="block media image w-cover landscape w-title w-source from-Twitter w-author">
         <div class="title"  id="title1" >
            3 min read <br>This Nifty Tool Uses Artificial Intelligence to Build Your Ultimate Website
         </div>
       </div>
     </article>
  </section>
  <section id="s2">
    <style type="text/gss" src="./fixtures/external-scoped-gss.gss" scoped></style>
    <article id="a2" class="post left repost media image w-cover landscape w-title w-source w-author titleTC imageMC linkBC "  >
       <div id="b2" class="block media image w-cover landscape w-title w-source from-Twitter w-author">
         <div class="title" id="title2">
            3 min read <br>This Nifty Tool Uses Artificial Intelligence to Build Your Ultimate Website
         </div>
       </div>
    </article>
  </section>

"""




  describe "single imported scoped file with some selectors", ->
  
    it 'should compute', (done) ->
      counter = 0
      listen = (e) ->     
        counter++
        if counter == 1
          expect(engine.values['$title1[width]']).to.eql undefined
          expect(engine.values['$title2[width]']).to.eql 300
          container.innerHTML = ""
        else
          expect(engine.values).to.eql {}
          engine.removeEventListener 'solve', listen
          done()     
                     
      engine.addEventListener 'solve', listen
  
      container.innerHTML =  """
  <section id="s1">
    <article id="a1" class="post left repost media image w-cover landscape w-title w-source w-author titleTC imageMC linkBC "  >
       <div id="b1" class="block media image w-cover landscape w-title w-source from-Twitter w-author">
         <div class="title"  id="title1" >
            3 min read <br>This Nifty Tool Uses Artificial Intelligence to Build Your Ultimate Website
         </div>
       </div>
     </article>
  </section>
  <section id="s2">
    <style type="text/gss">
      #s2 {
        @import ./fixtures/external-scoped-gss.gss;
      }
    </style>
    <article id="a2" class="post left repost media image w-cover landscape w-title w-source w-author titleTC imageMC linkBC "  >
       <div id="b2" class="block media image w-cover landscape w-title w-source from-Twitter w-author">
         <div class="title" id="title2">
            3 min read <br>This Nifty Tool Uses Artificial Intelligence to Build Your Ultimate Website
         </div>
       </div>
    </article>
  </section>

"""


  describe "imported file accessing parent scopes", ->
  
    it 'should compute', (done) ->
      counter = 0
      listen = (e) ->     
        counter++
        if counter == 1
          expect(engine.values['$s1[width]']).to.eql 100
          expect(engine.values['$s2[width]']).to.eql 100
          container.innerHTML = ""
        else
          expect(engine.values).to.eql {}
          engine.removeEventListener 'solve', listen
          done()     
                     
      engine.addEventListener 'solve', listen
  
      container.innerHTML =  """
  <section id="s1">
    <style type="text/gss" scoped>
      &width == 100;
    </style>
    <article id="a1" class="post left repost media image w-cover landscape w-title w-source w-author titleTC imageMC linkBC "  >
       <div id="b1" class="block media image w-cover landscape w-title w-source from-Twitter w-author">
         <div class="title"  id="title1" >
            3 min read <br>This Nifty Tool Uses Artificial Intelligence to Build Your Ultimate Website
         </div>
       </div>
     </article>
  </section>
  <section id="s2">
    <style type="text/gss">
      #s2 {
        $ #s1 {
          @import ./fixtures/external-ascending-gss.gss;
        }
      }
    </style>
    <article id="a2" class="post left repost media image w-cover landscape w-title w-source w-author titleTC imageMC linkBC "  >
       <div id="b2" class="block media image w-cover landscape w-title w-source from-Twitter w-author">
         <div class="title" id="title2">
            3 min read <br>This Nifty Tool Uses Artificial Intelligence to Build Your Ultimate Website
         </div>
       </div>
    </article>
  </section>

"""

  describe "single scoped file", ->
  
    it 'should compute', (done) ->
      counter = 0
      listen = (e) ->     
        counter++
        if counter == 1
          expect(engine.values).to.eql 
            "$something[external-file]": 1000
          container.innerHTML = ""
        else
          expect(engine.values).to.eql {}
          engine.removeEventListener 'solve', listen
          done()     
                     
      engine.addEventListener 'solve', listen
  
      container.innerHTML =  """
          <div id="something">
            <link rel="stylesheet" type="text/gss" href="./fixtures/external-file.gss" scoped></link>
          </div>
        """

  describe "single imported file", ->
  
    it 'should compute', (done) ->
      counter = 0
      listen = (e) ->     
        counter++
        if counter == 1
          expect(engine.values).to.eql 
            "$something[external-file]": 1000
          container.innerHTML = ""
        else
          expect(engine.values).to.eql {}
          engine.removeEventListener 'solve', listen
          done()     
                     
      engine.addEventListener 'solve', listen
  
      container.innerHTML =  """
          <style type="text/gss">
            #something { 
              @import ./fixtures/external-file.gss; 
            }
          </style>
          <div id="something">
          </div>
        """


  describe "single file", ->
  
    it 'should compute', (done) ->
      counter = 0
      listen = (e) ->     
        counter++
        if counter == 1
          expect(engine.values).to.eql 
            "external-file": 1000
          container.innerHTML = ""
        else
          expect(engine.values).to.eql {}
          engine.removeEventListener 'solve', listen
          done()     
                     
      engine.addEventListener 'solve', listen
  
      container.innerHTML =  """
          <link rel="stylesheet" type="text/gss" href="./fixtures/external-file.gss" scoped></link>
        """

  describe "multiple files", ->
  
    it 'should compute', (done) ->
      counter = 0
      listen = (e) ->
        counter++
        if counter == 1
          expect(engine.values).to.eql 
            "external-file": 1000
            "external-file-2": 2000
            "external-file-3": 3000
          container.innerHTML = ""
        else
          expect(engine.values).to.eql {}
          engine.removeEventListener 'solve', listen
          done()     
                   
      engine.addEventListener 'solve', listen
  
      container.innerHTML =  """
          <link rel="stylesheet" type="text/gss" href="./fixtures/external-file.gss" scoped></link>
          <link rel="stylesheet" type="text/gss" href="./fixtures/external-file-2.gss" scoped></link>
          <link rel="stylesheet" type="text/gss" href="./fixtures/external-file-3.gss" scoped></link>
        """

  describe "nested files", ->
  
    it 'should compute', (done) ->
      counter = 0
      inline = null
      external = null
      listen = (e) ->
        counter++
        if counter == 1
          expect(engine.values).to.eql 
            "external-file": 1000
            "external-file-2": 2000
            "external-file-3": 3000
          inline = engine.id('inline')
          inline.parentNode.removeChild(inline)
        else if counter == 2
          expect(engine.values).to.eql 
            "external-file-2": 2000
            "external-file-3": 3000
          engine.scope.appendChild(inline)
        else if counter == 3
          expect(engine.values).to.eql 
            "external-file": 1000
            "external-file-2": 2000
            "external-file-3": 3000
          external = engine.id('external')
          external.parentNode.removeChild(external)
        else if counter == 4
          expect(engine.values).to.eql 
            "external-file": 1000
          engine.scope.appendChild(external)
        else if counter == 5
          expect(engine.values).to.eql 
            "external-file": 1000
            "external-file-2": 2000
            "external-file-3": 3000
          engine.scope.innerHTML = ''
        else 
          expect(engine.values).to.eql {}

          engine.removeEventListener 'solve', listen
          done()    
                   
      engine.addEventListener 'solve', listen
  
      container.innerHTML =  """
          <style type="text/gss" scoped id="inline">
            @import ./fixtures/external-file.gss;
          </style>
          <link rel="stylesheet" id="external" type="text/gss" href="./fixtures/external-file-2-3.gss" scoped></link>
        """

  describe "single file with ^ and id rulesets", ->

    it 'should compute', (done) ->
      counter = 0
      listen = (e) ->     
        counter++
        if counter == 1
          expect(e['$d2[x]']).to.eql(100)
          container.innerHTML = ""
        else
          expect(e['$d2[x]']).to.eql(null)
          engine.removeEventListener('solve', listen)
          expect(engine.identity['$d2']).to.eql(undefined)
          done()     
                     

      engine.addEventListener 'solve', listen

      container.innerHTML =  """
          <section id="s1">
            <div id="d1">123</div>
            <div id="d2">123</div>
          </section>
          <link rel="stylesheet" type="text/gss" href="./fixtures/external-file-parent.gss"></link>
        """