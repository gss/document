Engine   = require('gss-engine/src/Engine')

class Document extends Engine
  @Measurement:   require('./types/Measurement')
  @Primitive:     require('./types/Primitive')
  @Unit:          require('./commands/Unit')

  class Document::Input extends Engine::Input
    Selector:     require('./commands/Selector')
    Stylesheet:   require('./commands/Stylesheet')
    Unit:         Document.Unit::Macro
    

  class Document::Output extends Engine::Output
    Style:        require('./Style')
    Properties:   require('./properties/Styles')
    Unit:         Document.Unit::Numeric

    Transition:   require('./commands/Transition')

    Gradient:     require('./types/Gradient')
    Matrix:       require('./types/Matrix')
    Color:        require('./types/Color')
    URL:          require('./types/URL')

    Number:       Document.Primitive.Number
    Integer:      Document.Primitive.Integer
    String:       Document.Primitive.String
    Strings:      Document.Primitive.Strings
    Size:         Document.Primitive.Size
    Position:     Document.Primitive.Position
    
    Length:       Document.Measurement.Length
    Time:         Document.Measurement.Time
    Frequency:    Document.Measurement.Frequency
    Angle:        Document.Measurement.Angle
    Percentage:   Document.Measurement.Percentage
    

    pretransform: (id) ->
      #if element = @identity[id]
      return @Matrix.rst(
        +@get(id, 'rotate-x')    || 0
        +@get(id, 'rotate-y')    || 0
        +@get(id, 'rotate-z')    || 0
        +(@get(id, 'scale-x')     ? 1)
        +(@get(id, 'scale-y')     ? 1)
        +(@get(id, 'scale-z')     ? 1)
        +@get(id, 'translate-x') || 0
        +@get(id, 'translate-y') || 0
        +@get(id, 'translate-z') || 0
      )


    # Style assignment
    Document::Output::StyleAssignment = Document::Output::Assignment.extend {
      signature: [
        [object:   ['Query', 'Selector']]
        property: ['String']
        value:    ['Any']
      ]

      log: ->
      unlog: ->

      # Register assignment within parent rule 
      # by its auto-incremented property local to operation list
      advices: [
        (engine, operation, command) ->
          parent = operation
          rule = undefined
          while parent.parent
            if !rule && parent[0] == 'rule'
              rule = parent
            parent = parent.parent

          operation.index ||= parent.assignments = (parent.assignments || 0) + 1
          if rule
            (rule.properties ||= []).push(operation.index)
          return
      ]
    },
      'set': (object, property, value, engine, operation, continuation, scope) ->
        engine.setStyle? object || scope, property, value, continuation, operation
        
        return

  
  class Document::Data extends Engine::Data
    immediate:    true
    Properties:   require('./properties/Getters')

    perform: ->
      if arguments.length < 4 && @data.subscribers
        @console.start('Measure', @values)
        scope = @scope
        if scope.nodeType == 9
          @measure(scope, 0, 0)
          scope = scope.body

        @each scope, 'measure'
        @console.end(@changes)
        return @propagate @commit()
      
    # Reset intrinsic style when observed initially
    subscribe: (id, property) ->
      if (node = @identity.solve(id)) && node.nodeType == 1
        property = property.replace(/^intrinsic-/, '')
        path = @getPath(id, property)
        if @engine.values.hasOwnProperty(path) || @engine.updating.solution?.hasOwnProperty(path)
          node.style[@camelize property] = ''
        @updating.reflown = true

    unsubscribe: (id, property, path) ->
      @output.set path, null
      @set path, null
      

    get: (object, property) ->
      unless (value = super)?
        path = @getPath(object, property)
        if (value = @fetch(path))?
          @set(null, path, value)
      return value# || 0

    fetch: (path) ->
      if (prop = @properties[path])?
        if typeof prop == 'function'
          return prop.call(@, object)
        else
          return prop
        return value
      else 
        if (j = path.indexOf('[')) > -1
          id = path.substring(0, j)
          property = path.substring(j + 1, path.length - 1)
          object = @identity.solve(path.substring(0, j))

          if (prop = @properties[property])?
            if prop.axiom
              return prop.call(@, object)
            else if typeof prop != 'function'
              return prop
            else if property.indexOf('intrinsic') == -1
              return prop.call(@, object)

  constructor: (data, url, scope = document) ->
    super
    
    @scope = @getScopeElement(scope)
    Engine[@identify(@scope)] = @

    if @scope.nodeType == 9
      state = @scope.readyState
      if state != 'complete' && state != 'loaded' && 
          (state != 'interactive' || document.documentMode)
        document.addEventListener('DOMContentLoaded', @engine, false)
        document.addEventListener('readystatechange', @engine, false)
        window  .addEventListener('load',             @engine, false)
      else
        setTimeout =>
          unless @engine.running
            @engine.compile()
        , 10

    @input.Selector.observe(@engine)

    @scope.addEventListener 'scroll', @engine, true
    window?.addEventListener 'resize', @engine, true

  prefixes: ['moz', 'webkit', 'ms']
    

  write: (update) ->
    @input.Selector.disconnect(@, true)
    @output.merge(update.changes)
    @input.Stylesheet.rematch(@)
    if assigned = @assign(update.changes)
      update.assigned = true
    update.changes = undefined
    @input.Selector.connect(@, true)
    return assigned

  $$events:

    validate: (update) ->
      if @data.subscribers && update.domains.indexOf(@data, update.index + 1) == -1
        @data.verify('::window', 'width')
        @data.verify('::window', 'height')
        @data.verify(@scope, 'width')
        @data.verify(@scope, 'height')
        
        @propagate @data.solve()

    remove: (path) ->
      @input.Stylesheet.remove(@, path)
      @data.remove(path)

    compile: ->
      scope = @scope.documentElement || @scope
      for property, value of @output.properties
        unless scope.style[property]?
          prop = @camelize(property)
          prop = prop.charAt(0).toUpperCase() + prop.slice(1)
          for prefix in @prefixes
            prefixed = prefix + prop
            if scope.style[prefixed]?
              value.property = '-' + prefix + '-' + property
              value.camelized = prefixed
              
      @solve @input.Stylesheet.operations
      @input.Selector.connect(@, true)


    solve: ->
      if @scope.nodeType == 9
        html = @scope.documentElement
        klass = html.className
        if klass.indexOf('gss-ready') == -1
          @input.Selector.disconnect(@, true)
          html.setAttribute('class', (klass && klass + ' ' || '') + 'gss-ready')
          @input.Selector.connect(@, true)

    finish: (update) ->
      # Unreference removed elements
      if removed = update?.removed
        for element in removed
          @identity.unset(element)
        update.removed = undefined

      if @ranges
        cancelAnimationFrame(@transitioning)
        engine = @
        @transitioning = requestAnimationFrame ->
          @transitioning = undefined
          engine.solve 'Transition', ->
            @updating.ranges = true
            return


    resize: (e = '::window') ->
      id = e.target && @identify(e.target) || e
      
      unless @resizer?
        if e.target && @updating
          if @updating.resizing
            return @updating.resizing = 'scheduled'
          @updating.resizing = 'computing'
        @once 'finish', ->
          requestAnimationFrame =>
            if @updated?.resizing == 'scheduled'
              @triggerEvent('resize')
      else
        cancelAnimationFrame(@resizer)

      @resizer = requestAnimationFrame =>
        @resizer = undefined
        if @updating && !@updating.resizing
          @updating.resizing = 'scheduled'
          return
        @solve 'Resize', id, ->
          if @scope._gss_id != id
            @data.verify(id, "width")
            @data.verify(id, "height")
          if id != '::document'
            @data.verify(id, "width")
            @data.verify(id, "height")
          @data.verify(@scope, "width")
          @data.verify(@scope, "height")
          return @data.commit()
          
    scroll: (e = '::window') ->
      id = e.target && @identify(e.target) || e
      @solve 'Scroll', id, ->
        if @transitioning
          cancelAnimationFrame(@transitioning)
          @updating.ranges = true
        if id == '::window'
          @data.verify('::document', "scroll-top")
          @data.verify('::document', "scroll-left")
        @data.verify(id, "scroll-top")
        @data.verify(id, "scroll-left")
        return @data.commit()
        
    # Fire as early as possible
    DOMContentLoaded: ->
      document.removeEventListener 'DOMContentLoaded', @
      @compile()
      @solve 'Ready', ->

    # Wait for web fonts
    readystatechange: ->
      if @running && document.readyState == 'complete'
        @solve 'Statechange', ->

    # Remeasure when images are loaded
    load: ->
      window.removeEventListener 'load', @
      document.removeEventListener 'DOMContentLoaded', @
      @solve 'Loaded', ->

    # Unsubscribe events and observers
    destroy: ->
      if @scope
        Engine[@scope._gss_id] = undefined
        for element in @scope.getElementsByTagName('*')
          @identity.unset(element)
        @identity.unset(@scope)
        @dispatchEvent(@scope, 'destroy')
      @scope.removeEventListener 'DOMContentLoaded', @
      #if @scope != document
      #  document.removeEventListener 'scroll', @
      @scope.removeEventListener 'scroll', @
      window.removeEventListener 'resize', @

      @input.Selector.disconnect(@)


  getComputedStyle: (element, force) ->
    unless (old = element.currentStyle)?
      computed = (@computed ||= {})
      id = @identify(element)
      old = computed[id]
      if force || !old?
        return computed[id] = window.getComputedStyle(element)
    return old

  # Set or unset absolute position 
  setAbsolutePosition: (element, property, value) ->
    position = element.style.position
    if element.positioned == undefined
      element.positioned = + !!position
    if position && position != 'absolute'
      return
    if element.style[property] == ''
      if value? && value != ''
        element.positioned = (element.positioned || 0) + 1
    else 
      if !value? || value == ''
        element.positioned = (element.positioned || 0) - 1
    if element.positioned == 1
      element.style.position = 'absolute'
    else if element.positioned == 0
      element.style.position = ''


  setStyle: (element, property, value = '', continuation, operation, bypass) -> 
    switch property
      when "x"
        property = "left"
      when "y"
        property = "top"

    if parent = operation
      while parent.parent
        parent = parent.parent
        if parent.command.type == 'Iterator'
          ruled = true
        if !ruled && parent.command.type == 'Condition' && !parent.command.global
          break

      if parent.command.parse
        if parent.command.set @, operation, @Command::delimit(continuation), element, property, value
          return

    return unless prop = @output.properties[property]
    camel = prop.camelized || @camelize(property)
    
    if typeof value != 'string'
      if value < 0 && (property == 'width' || property == 'height')
        @console.warn(property + ' of', element, ' is negative: ', value)

      value = prop.format(value)

      

    path = @getPath(element, 'intrinsic-' + property)

    if @data.watchers?[path]
      return

    if property == 'left' || property == 'top'
      @setAbsolutePosition(element, property, value)

    if element.style[camel] != undefined
      element.style[camel] = value
    return

  # Iterate elements and measure intrinsic offsets
  each: (parent, callback, x = 0,y = 0, a,r,g,s) ->
    scope = @engine.scope

    # Calculate new offsets for given element and styles
    if offsets = @[callback](parent, x, y, a,r,g,s)
      x += offsets.x || 0
      y += offsets.y || 0

    if parent.offsetParent == scope
      x -= scope.offsetLeft
      y -= scope.offsetTop
    else if parent != scope
      if !offsets 
        measure = true

    # Recurse to children
    if parent == document
      parent = document.body
    child = parent.firstChild

    while child
      if child.nodeType == 1
        # Elements with explicitly set position: relative 
        # lay out their children as if the parent was at 0,0
        if measure && child.offsetParent == parent
          x += parent.offsetLeft + parent.clientLeft
          y += parent.offsetTop + parent.clientTop
          measure = false
        if child.style.position == 'relative'
          @offsetLeft += x
          @offsetTop  += y
          @each(child, callback, 0, 0, a,r,g,s)
          @offsetLeft -= x
          @offsetTop  -= y
        else
          @each(child, callback, x, y, a,r,g,s)
        
      child = child.nextSibling
    return a

  getStyle: (node, property) ->
    property = @camelize(property)
    value = node.style[property] || @getComputedStyle(node)[property]
    if value
      num = parseFloat(value)
      if String(num) == String(value) || (num + 'px') == value
        return num
    return value
    
  measure: (node, x, y, full) ->
    if id = node._gss_id
      if properties = @data.subscribers[id]
        if node.nodeType == 9
          node = node.documentElement

        for prop of properties
          switch prop
            when "absolute-x", "absolute-left"
              @set id, prop, x + node.offsetLeft + @offsetLeft 
            when "absolute-y", "absolute-top"
              @set id, prop, y + node.offsetTop + @offsetTop
            when "intrinsic-x", "computed-x", "intrinsic-left", "computed-left"
              @set id, prop, x + node.offsetLeft
            when "intrinsic-y", "computed-y", "intrinsic-top", "computed-top"
              @set id, prop, y + node.offsetTop
            when "intrinsic-width",  "computed-width"
              @set id, prop, node.offsetWidth
            when "intrinsic-height", "computed-height"
              @set id, prop, node.offsetHeight
            when "scroll-top", "scroll-left"

            
            else
              style = prop.replace(/^(?:computed|intrinsic)-/, '')
              if prop != style
                if @properties[style]
                  @set id, prop, @get(node, style)
                else if @output.properties[style]
                  @set id, prop, @getStyle(node, style)

    return

  camelize: (string) ->
    return string.toLowerCase().replace /-([a-z])/gi, (match) ->
      return match[1].toUpperCase()

  dasherize: (string) ->
    return string.replace /[A-Z]/g, (match) ->
      return '-' + match[0].toLowerCase()


  group: (data) ->
    # Apply changed styles in batch, 
    # leave out positioning properties (Restyle/Reflow)
    pretransforms = @updating.pretransform
    transforms = result = undefined

    for path, value of data
      last = path.lastIndexOf('[')
      continue if last == -1
      property = path.substring(last + 1, path.length - 1)
      id = path.substring(0, last)

      # Find unregistered elements by id
      continue if id.charAt(0) == ':'
      #unless element = @engine.identity[id]
      #  continue unless element = document.getElementById(id.substring(1))
      
      if @values[id + '[intrinsic-' + property + ']']?
        continue

      if (property == 'x' || property == 'y') 
        key = 'positions'
      else if prop = @output.properties[property]
        if property == 'opacity' || property == 'color'
          key = 'restyles'
        else
          key = 'styles'
        if prop.task
          (@updating[prop.task] ||= {})[id] ||= true
          if prop.task == 'pretransform'
            pretransforms = @updating.pretransform
          continue

        if property == 'transform'
          (pretransforms ||= {})[id] = @output.pretransform(id)
          (transforms ||= {})[id] = value
          continue
      else
        continue

      if id.indexOf('"') == -1
        if @identity[id] || document.getElementById(id.substring(1))
          (((result ||= {})[key] ||= {})[id] ||= {})[property] = value

    # Combine matricies
    if pretransforms
      for id, pretransform of pretransforms
        if pretransform == true
          pretransform = @output.pretransform(id) 
        
        transform = transforms?[id] || @values[id + '[transform]']


        ((result ||= {}).transforms ||= {})[id] = 
          if pretransform && transform
            @output.Matrix.prototype._mat4.multiply(pretransform, transform, pretransform)
          else
            pretransform || transform || null


      @updating.pretransform = undefined

      
    return result

      
  ### 
  Applies style changes in bulk, separates reflows & positions.
  It recursively offsets global coordinates to respect offset parent, 
  then sets new positions
  ###

  assign: (data) ->
    unless changes = @group(data)
      return

    @console.start('Apply', changes)
    styles = changes.styles
    positions = changes.positions
    restyles = changes.restyles    

    if transforms = changes.transforms
      prop = @output.properties.transform
      camel = prop.camelized || 'transform'
      for id, value of transforms
        element = @identity[id]# || document.getElementById(id.substring(1))
        if element?.nodeType == 1
          element.style[camel] = if value? then @output.Matrix::format(value) else ''
        else
          path = @output.getPath(id, 'final-transform')
          if value? || @output.values[path]?
            @output.set(null, path, value)

      if !styles && !positions && !restyles
        @console.end(changes)
        return

    # Apply styles that don't affect layout
    if restyles
      for id, properties of restyles
        element = @identity[id] || document.getElementById(id.substring(1))
        if element.nodeType == 1
          for prop, value of properties
            @setStyle(element, prop, value)
      if !styles && !positions
        @console.end(changes)
        return

    if styles
      for id, properties of styles
        element = @identity[id] || document.getElementById(id.substring(1))
        if element.nodeType == 1
          for prop, value of properties
            @setStyle(element, prop, value)


    if positions
      # Adjust positioning styles to respect element offsets 
      @each(@scope, 'placehold', null, null, changes.positions)

      for id, styles of positions
        element = @identity[id] || document.getElementById(id.substring(1))
        if element.nodeType == 1
          for prop, value of styles
            @setStyle(element, prop, value)

    @console.end(changes)
    return true

  # Calculate offsets according to new values (but dont set anything)
  placehold: (element, x, y, positioning, full) ->
    offsets = undefined
    if uid = element._gss_id
      # Adjust newly set positions to respect parent offsets
      styles = positioning?[uid]
      if values = @engine.values
        if styles?.x == undefined
          if (left = values[uid + '[x]'])?
            (styles ||= (positioning[uid] ||= {})).x = left
        if styles?.y == undefined
          if (top = values[uid + '[y]'])?
            (styles ||= (positioning[uid] ||= {})).y = top

      if styles
        for property, value of styles
          unless value == null
            switch property
              when "x"
                styles.x = value - x
                (offsets ||= {}).x = value - x
              when "y"
                styles.y = value - y
                (offsets ||= {}).y = value - y



    return offsets

  offsetTop: 0
  offsetLeft: 0

module.exports = Document
