Command = require('gss-engine/src/Command')
Query   = require('gss-engine/src/Query')

class Stylesheet extends Command.List

  mimes:
    "text/gss-ast": (source) ->
      return JSON.parse(source)

    "text/gss": (source) ->
      return GSS.Parser.parse(source)?.commands

    
  # Parse stylesheet, provide root operation if needed
  parse: (engine, type = 'text/gss', source) ->
    if type == 'text/gss' && source.match(/^\s*\[/) && source.match(/\]\s*$/)
      type = 'text/gss-ast'

    engine.console.push(type.split('/')[1], [source])
    operations = engine.clone(@mimes[type](source))
    if typeof operations[0] == 'string'
      operations = [operations]
    engine.console.pop(operations)
    return operations

  descend: (engine, operation, continuation, scope, ascender, ascending) ->
    @users = (@users || 0) + 1 
    for argument, index in operation
      if argument?.push
        argument.parent ?= operation
        if command = argument.command || engine.Command(argument)
          command.solve(engine, argument, @delimit(continuation, @DESCEND), scope)
    return

  


  @operations: [
    ['import',  ['[*=]', ['tag', 'style'], 'type', 'gss']]
    ['import',  ['[*=]', ['tag', 'link' ], 'type', 'gss']]
  ]
  
  @CanonicalizeSelectorRegExp: new RegExp(
    "[$][a-z0-9-_]+([" + Command::DESCEND + Command::ASCEND + "])\\s*", "gi"
  )
  @CanonicalizeSelectorCallback: (m, symbol) ->
    if symbol == Command::DESCEND
      return symbol
    return ''

  update: (engine, operation, property, value, stylesheet, rule) ->
    watchers = @getWatchers(engine, stylesheet)
    unless sheet = stylesheet.sheet
      stylesheet.parentNode?.removeChild(stylesheet)
      return 
    if prop = engine.output.properties[property]
      if prop.property
        property = prop.property

      if typeof value != 'string'
        value = prop.format(value)

    needle = @getOperation(operation, watchers, rule)
    previous = []
    for ops, index in watchers
      if ops
        other = @getRule(watchers[ops[0]][0])
        if other == rule && index != needle
          break
        else if index > needle
          break
        else if other != rule && previous.indexOf(other) == -1
          previous.push(other)
    rules = sheet.cssRules || sheet.rules
    
    # Update rule
    index = previous.length
    generated = rules[index]
    if generated && (needle != operation.index || value == '' || (other == rule && index != needle))
      
      if (i = value.indexOf('!important')) > -1
        generated.style.setProperty(property, value.substring(0, i), 'important')
      else
        generated.style[property] = value
      
      if generated.style.length == 0
        sheet.deleteRule(index)
    else
      body = property + ':' + value
      selectors = @getSelector(stylesheet, operation)
      index = sheet.insertRule(selectors + "{" + body + "}", previous.length)
    return true

  onClean: (engine, operation, query, watcher, subscope) ->
    if @users 
      engine.Query::unobserve(engine, @source, @delimit(query))
      if !--@users
        engine.Query::clean(engine, @source)


  getRule: (operation) ->
    rule = operation
    while rule = rule.parent
      if rule[0] == 'rule'
        return rule
    return

  getStylesheet: (engine, continuation) ->
    path = continuation
    boundary = path.lastIndexOf('@import')
    index = path.indexOf(@DESCEND, boundary)
    if boundary > -1 && path.indexOf(@DESCEND) + 1 != boundary
      prefix = engine.Query::getCanonicalPath(path.substring(0, boundary))
      path = prefix + continuation.substring(boundary, index)
    else
      path = path.substring(0, index)
    
    unless sheet = engine.stylesheets[path]
      if (index = continuation.indexOf(@DESCEND)) > -1
        continuation = continuation.substring(0, index)
      sheet = engine.stylesheets[path] = document.createElement('STYLE')
      if anchor = engine.Query::getByPath(engine, continuation)
        if anchor.scoped?
          if anchor.className.indexOf('inlinable') > -1
            sheet.className += ' inlinable'
          sheet.scoping = null
          if scope = engine.getScopeElement(anchor.parentNode)
            if scope.nodeType == 1
              sheet.scoping = scope.id

        if imported = engine.imported[anchor._gss_id]
          sheet.selectors = imported[path]
        while anchor = anchor.nextSibling
          break unless anchor.selectors
      engine.stylesheets.push(sheet)
      engine.identify(sheet)
      if anchor
        anchor.parentNode.insertBefore(sheet, anchor)
      else
        (engine.scope.documentElement || engine.scope).appendChild(sheet)
    return sheet

  getWatchers: (engine, stylesheet) ->
    return (stylesheet.assignments ||= {})[stylesheet._gss_id] ||= []

  getOperation: (operation, watchers, rule) ->
    needle = operation.index
    for other in rule.properties
      if watchers[other]?.length
        needle = other
        break
    return needle

  # dump style into native stylesheet rule
  set: (engine, operation, continuation, element, property, value) ->
    if rule = @getRule(operation)
      if stylesheet = @getStylesheet(engine, continuation)
        if @watch engine, operation, continuation, stylesheet, value
          if @update engine, operation, property, value, stylesheet, rule
            engine.updating.restyled = true

      return true

  @remove: (engine, continuation) ->
    if engine.stylesheets
      for stylesheet in engine.stylesheets
        if watchers = @prototype.getWatchers(engine, stylesheet)
          if operations = watchers[continuation]
            for operation in operations by -1
              @prototype.unwatch(engine, operation, continuation, stylesheet, watchers)
    return

  watch: (engine, operation, continuation, stylesheet, value) ->
    watchers = @getWatchers(engine, stylesheet)

    meta = (watchers[operation.index] ||= [])
    if (i = meta.indexOf(continuation)) > -1
      return false

    (watchers[continuation] ||= []).push(operation)
    return meta.push(continuation) == 1

  unwatch: (engine, operation, continuation, stylesheet, watchers) ->
    watchers ?= @getWatchers(engine, stylesheet)

    index = operation.index

    meta = watchers[index]
    meta.splice meta.indexOf(continuation), 1

    observers = watchers[continuation]
    observers.splice observers.indexOf(operation), 1

    unless observers.length
      delete watchers[continuation]

    if meta.length == 0
      delete watchers[index]
      @update engine, operation, operation[1], '', stylesheet, @getRule(operation)
  
  @export: ->
    sheet = []
    for id, style of engine.stylesheets
      for rule in (style.sheet.cssRules || style.sheet.rules)
        text = rule.cssText.replace /\[matches~="(.*?)"\]/g, (m, selector) ->
          selector.replace(/@[^↓]+/g, '').replace(/↓&/g, '').replace(/↓/g, ' ')
        sheet.push text

    return sheet.join('')

  getSelector: (stylesheet, operation) ->
    selectors = @getSelectors(stylesheet, operation)
    if stylesheet.scoping
      for selector, index in selectors
        # Ignore top level qualifier
        selectors[index] = '#' + stylesheet.scoping + selector
    return selectors.join(', ')

  getSelectors: (stylesheet, operation) ->
    parent = operation
    results = wrapped = custom = undefined

    # Iterate parent commands
    while parent

      # Append condition id to path
      if parent.command.type == 'Condition'
        if !parent.command.global || results?[0].indexOf('[matches~=') > -1
          if results
            for result, index in results
              results[index] = ' ' + @getCustomSelector(parent.command.key, result)
      
      # Add rule selector to path
      else if parent.command.type == 'Iterator'
        # Prepend selectors with selectors of a parent rule
        results = @combineSelectors(results, parent[1])

      if !(parent = parent.parent) && stylesheet?.selectors
        results = @combineSelectors(results,  stylesheet)

    return results

  @empty: ['']

  combineSelectors: (results = Stylesheet.empty, operation) ->
    update = []
    for result, index in results
      if operation.selectors
        if result.substring(0, 12) == ' [matches~="'
          update.push ' ' + @getCustomSelector(result.selector, result)
        else
          for selector in operation.selectors
            update.push selector + result
      else if result.substring(0, 12) == ' [matches~="'
        update.push ' ' + @getCustomSelector(operation.command.path, result)
      else if operation[0] == ','
        for index in [1 ... operation.length] by 1
          separated = @getRuleSelector(operation[index], operation.command) + result
          if update.indexOf(separated) == -1
            update.push separated
      else 
        update.push @getRuleSelector(operation) + result
    return update


  getRuleSelector: (operation, parent) ->
    command = operation.command
    path = command.path
    if path.charAt(0) == '&'
      if (key = path.substring(1)) == command.key || !command.key
        return key
      else
        return @getCustomSelector((parent || command).path)

    if (command.selector || command.key) == path
      return ' ' + path
    else
      return ' ' + @getCustomSelector((parent || command).path)

  getCustomSelector: (selector, suffix, prefix) ->
    DESCEND = @DESCEND
    selector = selector.replace(/\s+/g, DESCEND)
    if suffix
      if suffix.charAt(0) == ' '
        suffix = suffix.substring(1)
      if suffix.substring(0, 11) == '[matches~="'
        suffix = DESCEND + suffix.substring(11)
      else
        suffix = DESCEND + suffix.replace(/\s+/g, DESCEND) + '"]'
    else
      suffix = '"]'
    return '[matches~="' + selector + suffix

  getCanonicalSelector: (selector) ->
    selector = selector.trim()
    selector = selector.
      replace(Stylesheet.CanonicalizeSelectorRegExp, Stylesheet.CanonicalizeSelectorCallback).
      replace(/\s+/g, @DESCEND)#.
    return selector


  # Schedule element to have its "matches" attribute updated
  @match: (engine, node, continuation, value) ->
    return unless node.nodeType == 1
    if (index = continuation.indexOf(@prototype.DESCEND)) > -1
      continuation = continuation.substring(index + 1)
    continuation = @prototype.getCanonicalSelector(continuation).
                    replace(/\s+/, @prototype.DESCEND)


    if value
      append = (engine.updating.matches ||= {})[node._gss_id] ||= []
      remove = engine.updating.unmatches?[node._gss_id]
    else
      remove = engine.updating.matches?[node._gss_id]
      append = (engine.updating.unmatches ||= {})[node._gss_id] ||= []

    if append && append.indexOf(continuation) == -1
      append.push(continuation)

    if remove && (i = remove.indexOf(continuation)) > -1
      remove.splice(i, 1)

  # Update matches attributes on elements matched by css rules
  @rematch: (engine) ->
    if matches = engine.updating.matches
      for id, values of matches
        element = engine.identity.get(id)
        if tokens = element.getAttribute('matches')
          bits = tokens.split(' ')
          for value in values
            if bits.indexOf(value) == -1
              bits.push(value)
        else
          bits = values

        element.setAttribute('matches', bits.join(' '))
      engine.updating.matches = undefined

    if unmatches = engine.updating.unmatches
      for id, values of unmatches
        element = engine.identity.get(id)
        if tokens = element.getAttribute('matches')
          bits = tokens.split(' ')
          for value in values
            if (index = bits.indexOf(value)) > -1
              bits.splice(index, 1)
          
          if bits.length
            element.setAttribute('matches', bits.join(' '))
          else
            element.removeAttribute('matches')

      engine.updating.unmatches = undefined
  # Dont add @import() to the path for global level stylesheets
  getKey: (engine, operation, continuation, node) ->
    if !node && continuation && continuation.lastIndexOf(@DESCEND) == -1#continuation.indexOf(@DESCEND)
      return ''
    return @key

  continue: ->
    Query::continue.apply(@, arguments)# + @DESCEND

class Stylesheet.Import extends Query
  Sequence: undefined
  
  type: 'Import'

  relative: true
  
  signature: [
    'source': ['Selector', 'String', 'Node']
    [
      'type': ['String']
      'text': ['String']
    ]
  ]
      
  @define
    'directive': (name, type, text, engine, operation, continuation, scope) ->
      Stylesheet.Import[name]::execute(type, text, undefined, engine, operation, continuation, scope)

    # Load & evaluate stylesheet
    'import': (node, type, method, engine, operation, continuation, scope) ->
      if typeof node == 'string'
        src = node
        node = undefined
      else
        unless src = @getUrl(node)
          text = node.textContent || node.innerText

        type ||= node.getAttribute?('type')

      path = @getGlobalPath(engine, operation, continuation, node)

      if stylesheet = engine.queries[path]
        command = stylesheet.command
        if node
          if !node.parentNode || (text && command.text != text)
            stylesheet.length = 0
            if node
              if node.parentNode
                command.users = 0
                @uncontinuate(engine, path)
                if text
                  stylesheet.push.apply(stylesheet, command.parse(engine, type, text))
                  @continuate(engine, path)
                  return
              else
                @clean(engine, path)

      else
        stylesheet = []
        command = stylesheet.command = new Stylesheet(engine, operation, continuation, node)
        if text
          command.key = ''
        else
          command.key = @getGlobalPath(engine, operation, continuation, node, 'import')
        command.source = path

      if node?.getAttribute('scoped')?
        node.scoped = command.scoped = true


      if (index = continuation.indexOf(@DESCEND)) > -1
        left = continuation.substring(0, index)
        if anchor = engine.Query::getByPath(engine, left)
          if anchor.tagName == 'STYLE' || anchor.tagName == 'LINK'
            left = engine.Query::getCanonicalPath(continuation) + command.key
            imported = engine.imported[anchor._gss_id] ||= {}
            imported[left] = engine.Stylesheet::getSelectors(null, operation)
      
      unless stylesheet.length
        if text
          command.text = text
          stylesheet.push.apply(stylesheet, command.parse(engine, type, text))

        else unless command.resolver
          engine.updating.block(engine)
          command.resolver = (text) =>
            command.resolver = undefined
            command.text = text
            stylesheet.push.apply(stylesheet, command.parse(engine, type, text))
            @continuate(engine, command.source)
            if engine.updating.unblock(engine) && async
              engine.engine.commit()

          unless @read src, method, command.resolver, engine.scope
            @resolve src, method, command.resolver
          async = true



      return stylesheet

  read: (url, method, callback, scope) ->
    if script = (scope.ownerDocument || scope).querySelectorAll('script[type*=gss][href*="' + url + '"]')[0]
      callback(script.textContent.trim())
      return true
    return

  resolve: (url, method, callback) ->
    xhr = new XMLHttpRequest()
    xhr.onreadystatechange = =>
      if xhr.readyState == 4
        if xhr.status == 200 || (!xhr.status && url.indexOf('file://') == 0)
          callback(xhr.responseText)
    xhr.open(method && method.toUpperCase() || 'GET', url, true)
    xhr.send()


  after: (args, result, engine, operation, continuation, scope) ->
    return result unless result?

    node = if args[0]?.nodeType == 1 then args[0] else scope
    path = result.command.source
    @set engine, path, result


    contd = @delimit(continuation, @DESCEND)

    if node.scoped
      node = scope = engine.getScopeElement(node)

    if result.command.users == 0
      @continuate(engine, path)

    # Subscribe to @parse
    @subscribe(engine, result, contd, scope, path)
    
    # Subscribe to @import
    @subscribe(engine, result, contd, scope, node)


    return result

  ascend: (engine, operation, continuation, scope, result, ascender, ascending) ->
    if result.length == 0
      return

    if ascender == 1 && ascending && ascending.scoped
      scope = engine.getScopeElement(ascending)

    if result.command.hasOwnProperty('resolver') && continuation.indexOf(result.command.key) == -1
      continuation = @delimit(continuation, @DESCEND) + result.command.key
    else
      continuation = @delimit(continuation, @DESCEND)

    @schedule(engine, result, continuation, scope)
    return


  write: (engine, operation, continuation, scope, node) ->
    return true

  getUrl: (node) ->
    return node.getAttribute('href') || node.getAttribute('src')

  getId: (node) ->
    return @getUrl(node) || node._gss_id

  formatId: (id) ->
    #if (i = id.lastIndexOf('/')) > -1
    #  id = id.substring(i + 1)
    return id

  getLocalPath: (engine, operation, continuation, node) ->
    return @getGlobalPath(engine, operation, continuation, node)

  getGlobalPath: (engine, operation, continuation, node, command = 'parse')-> 
    index = operation[0] == 'directive' && 2 || 1
    if typeof operation[index] == 'string'
      id = operation[index]
    else
      if !node? && continuation
        node = @getByPath(engine, continuation)
      id = @getId(node)
    return '@' + command + '(' + @formatId(id) + ')'

module.exports = Stylesheet