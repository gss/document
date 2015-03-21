
describe 'Standalone page tests', -> 
  engine = container = iframe = null

  afterEach ->
    iframe.parentNode.removeChild(iframe)

  beforeEach ->
    iframe = document.createElement('iframe')
    document.body.appendChild(iframe)

  @timeout 100000

  roughAssert = (expected, given, threshold = 10) ->
    if !expected? || !given?
      expect(expected).to.eql(given)
    else
      expect(Math.abs(expected - given) < threshold).to.eql(true, expected + ' is not ' + given)
    
  describe 'Grid website', ->
    describe 'Virtuals demo', ->

      it 'should reorient', (done) ->
        i = 0
        listener = (e) ->
          console.log('msg')
          if (e.origin == location.origin)
            roughAssert(e.data['$wrap2"target"[x]'], 200);
            roughAssert(e.data['$wrap2"target"[width]'], 100);
            roughAssert(e.data['$wrap2"target"[height]'], 100);
            roughAssert(e.data['$wrap1"target"[x]'], 50);
            roughAssert(e.data['$wrap1"target"[width]'], 100);
            roughAssert(e.data['$wrap1"target"[height]'], 100);
            roughAssert(e.data['$other1[x]'], 75);
            roughAssert(e.data['$other1[width]'], 50);
            roughAssert(e.data['$other1[height]'], 50);
            roughAssert(e.data['$other2[x]'], 225);
            roughAssert(e.data['$other2[width]'], 50);
            roughAssert(e.data['$other2[height]'], 50);


            window.removeEventListener('message', listener)
            done()

        window.addEventListener('message', listener)

        iframe.width = 1024
        iframe.height = 768
        iframe.src = './pages/virtuals.html?log=0.5'


    describe 'Simple post', ->

      it 'should reorient', (done) ->
        i = 0
        listener = (e) ->
          console.log('msg', e.data)
          if (e.origin == location.origin)
            if i == 9
              window.removeEventListener('message', listener)
              done()
            else if ++i % 3 == 1
              roughAssert(e.data['$content1[width]'], 624);
              roughAssert(e.data['$content1[x]'], 0);
              roughAssert(e.data['$content1[y]'], 72);
              expect(e.data['$title1[width]']?).to.eql(false);
              expect(e.data['$title1[x]']?).to.eql(false);
              expect(e.data['$title1[y]']?).to.eql(false);
              expect(e.data['$subtitle1[width]']?).to.eql(false);
              expect(e.data['$subtitle1[x]']?).to.eql(false);
              expect(e.data['$subtitle1[y]']?).to.eql(false);

              iframe.width = 500
            else if i % 3 == 2
              roughAssert(e.data['$content1[width]'], 226);
              roughAssert(e.data['$content1[x]'], 234);
              roughAssert(e.data['$content1[y]'], 32);
              roughAssert(e.data['$title1[width]'], 154);
              roughAssert(e.data['$title1[x]'], 270);
              roughAssert(e.data['$title1[y]'], 259);
              roughAssert(e.data['$subtitle1[width]'], 154);
              roughAssert(e.data['$subtitle1[x]'], 270);
              roughAssert(e.data['$subtitle1[y]'], 460);
              iframe.width = 320
            else
              roughAssert(e.data['$content1[width]'], 288);
              roughAssert(e.data['$content1[x]'], 16);
              roughAssert(e.data['$content1[y]'], 384);
              roughAssert(e.data['$title1[width]'], 248);
              roughAssert(e.data['$title1[x]'], 36);
              roughAssert(e.data['$title1[y]'], 456);
              roughAssert(e.data['$subtitle1[width]'], 248);
              roughAssert(e.data['$subtitle1[x]'], 36);
              roughAssert(e.data['$subtitle1[y]'], 583);
              iframe.width = 1024

        window.addEventListener('message', listener)

        iframe.width = 1024
        iframe.height = 768
        iframe.src = './pages/grid_post_simple.html?log=0.5&z' + Math.random()



    xdescribe 'Head cta section', ->

      it 'should reorient', (done) ->
        i = 0

        window.addEventListener('message', (e) ->
          if (e.origin == location.origin)
            
            expect()
        )

        iframe.width = 1024
        iframe.height = 768
        iframe.src = './pages/grid_head_cta.html?log=0.5'


    describe 'Team section', ->

      it 'should reorient', (done) ->
        i = 0

        window.addEventListener('message', (e) ->
          setTimeout ->
            if (e.origin == location.origin)
              i++
              if i == 8
                return done()
              if i % 4 == 1
                roughAssert(e.data['$dan_tocchini[y]'], 235)
                roughAssert(e.data['$dan_tocchini[x]'], 368)
                roughAssert(e.data['$dan_tocchini[width]'], 288)
                expect(Math.floor(e.data['$yaroslaff_fedin[y]'])).to.eql 1577
                expect(Math.floor(e.data['$yaroslaff_fedin[x]'])).to.eql 523
                expect(Math.floor(e.data['$yaroslaff_fedin[width]'])).to.eql 216
                roughAssert(e.data['$lost_cosmonaut[y]'], 2171)
                roughAssert(e.data['$lost_cosmonaut[x]'], 762)
                roughAssert(e.data['$lost_cosmonaut[width]'], 216)
                iframe.width = 768
              else if i % 4 == 2
                roughAssert(e.data['$dan_tocchini[y]'], 0)
                roughAssert(e.data['$dan_tocchini[x]'], 768)
                roughAssert(e.data['$dan_tocchini[width]'], 768)
                expect(Math.floor(e.data['$yaroslaff_fedin[y]'])).to.eql 0
                expect(Math.floor(e.data['$yaroslaff_fedin[x]'])).to.eql 6912
                expect(Math.floor(e.data['$yaroslaff_fedin[width]'])).to.eql 768
                roughAssert(e.data['$lost_cosmonaut[y]'], 0)
                roughAssert(e.data['$lost_cosmonaut[x]'], 10752)
                roughAssert(e.data['$lost_cosmonaut[width]'], 768)
                iframe.width = 1024
              else if i % 4 == 3
                roughAssert(e.data['$dan_tocchini[y]'], 235)
                roughAssert(e.data['$dan_tocchini[x]'], 368)
                roughAssert(e.data['$dan_tocchini[width]'], 288)
                expect(Math.floor(e.data['$yaroslaff_fedin[y]'])).to.eql 1577
                expect(Math.floor(e.data['$yaroslaff_fedin[x]'])).to.eql 523
                expect(Math.floor(e.data['$yaroslaff_fedin[width]'])).to.eql 216
                roughAssert(e.data['$lost_cosmonaut[y]'], 2171)
                roughAssert(e.data['$lost_cosmonaut[x]'], 762)
                roughAssert(e.data['$lost_cosmonaut[width]'], 216)
                iframe.width = 320
              else
                roughAssert(e.data['$dan_tocchini[y]'], 224)
                roughAssert(e.data['$dan_tocchini[x]'], 320)
                roughAssert(e.data['$dan_tocchini[width]'], 320)
                expect(Math.floor(e.data['$yaroslaff_fedin[y]'])).to.eql 223
                expect(Math.floor(e.data['$yaroslaff_fedin[x]'])).to.eql 2880
                expect(Math.floor(e.data['$yaroslaff_fedin[width]'])).to.eql 320
                roughAssert(e.data['$lost_cosmonaut[y]'], 240)
                roughAssert(e.data['$lost_cosmonaut[x]'], 4480)
                roughAssert(e.data['$lost_cosmonaut[width]'], 320)
                iframe.width = 1024
          , 10
        )

        iframe.width = 1024
        iframe.height = 768
        iframe.src = './pages/grid_team.html?log=0.5&' + Math.random()
        

