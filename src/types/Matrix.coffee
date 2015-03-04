Command = require('gss-engine/src/Command')

class Matrix extends Command
  type: 'Matrix'
  
  Library: require('../../vendor/gl-matrix')

  @rst: (rX, rY, rZ, sX, sY, sZ, tX, tY, tZ) ->
    mat4 = @prototype._mat4
    if rX || rY || rZ
      maxR = Math.max(rX, rY, rZ)
      matrix = mat4.create()
      mat4.rotate(matrix, matrix, maxR * 360 * (Math.PI / 180), [rX / maxR, rY / maxR, rZ / maxR])
    if tX || tY || tZ
      matrix ||= mat4.create()
      mat4.translate(matrix, matrix, [tX, tY, tZ])
    if sX != 1 || sY != 1 || sZ != 1
      matrix ||= mat4.create()
      mat4.scale(matrix, matrix, [sX, sY, sZ])
    return matrix

  matrix: ->

  matrix3d: ->

  precontextualize: (engine, scope, argument = scope) ->
    #if argument.nodeType

    return argument

  xascend: (engine, operation, continuation, scope, result) ->

    #if parent = operation.parent
    #  while parent.command.sequence
    #    if parent.indexOf(operation) == parent.length - 1
    #      unless parent.parent
    #        break 
    #      parent = parent.parent
    #      operation = parent
    #    else
    #      return super
    #  if parent.type == 'Assignment'
    #    return super


    return super


  mat3: (matrix = @_mat4.create(), method, a, b, c) ->
    if matrix.length == 9
      return @_mat3[method](matrix, matrix, a, b, c)
    else
      return @_mat4[method](matrix, matrix, a, b, c)

  mat4: (matrix = @_mat4.create(), method, a, b, c) ->
    if matrix.length == 9
      matrix = @_mat4.fromMat3(matrix)
    return @_mat4[method](matrix, matrix, a, b, c)

  for property, method of Matrix::Library
    Matrix::['_' + property] = method

  format: (matrix) ->
    return 'matrix3d(' + 
      matrix[0 ] + ',' + 
      matrix[1 ] + ',' + 
      matrix[2 ] + ',' + 
      matrix[3 ] + ',' + 
      matrix[4 ] + ',' + 
      matrix[5 ] + ',' + 
      matrix[6 ] + ',' + 
      matrix[7 ] + ',' + 
      matrix[8 ] + ',' + 
      matrix[9 ] + ',' + 
      matrix[10] + ',' +
      matrix[11] + ',' +
      matrix[12] + ',' +
      matrix[13] + ',' +
      matrix[14] + ',' +
      matrix[15] + ')'

class Matrix::Sequence extends Command.Sequence

# 1-axis transform
class Matrix.Transformation1 extends Matrix
  signature: [
    [matrix: ['Matrix', 'Selector']]
    x:       ['Variable', 'Number']
  ]

  @define

    translateX:  (matrix, x) ->
      @mat3       matrix, 'translate', [x, 0, 0]
 
    translateY:  (matrix, y) ->
      @mat3       matrix, 'translate', [0, y, 0]
 
    translateZ:  (matrix, z) ->
      @mat4       matrix, 'translate', [0, 0, z]
 
    translate:   (matrix, x) ->
      @mat3       matrix, 'translate', [x, x]

    rotateX:     (matrix, angle) ->
      @mat4       matrix, 'rotateX', angle * 360 * (Math.PI / 180)
    
    rotateY:     (matrix, angle) ->
      @mat4       matrix, 'rotateY', angle * 360 * (Math.PI / 180)
    
    rotateZ:     (matrix, angle) ->
      @mat4       matrix, 'rotateZ', angle * 360 * (Math.PI / 180)
    
    scaleX:      (matrix, x) ->
      @mat3       matrix, 'scale',  [x, 1, 1]
    
    scaleY:      (matrix, y) ->
      @mat3       matrix, 'scale',  [1, y, 1]
    
    scaleZ:      (matrix, z) ->
      @mat4       matrix, 'scale',  [1, 1, z]
    
    scale:       (matrix, x) ->
      @mat4       matrix, 'scale',  [x, x, 1]
    
    rotate:      (matrix, angle) ->
      @mat3       matrix, 'rotate', angle * 360 * (Math.PI / 180), [0, 0, 1]

# 2 axis transforms
class Matrix.Transformation2 extends Matrix
  signature: [
    [matrix: ['Matrix', 'Selector']]
    x:       ['Variable', 'Number']
    y:       ['Variable', 'Number']
  ]

  @define
    translate:   (matrix, x, y) ->
      @mat3       matrix, 'translate', [x, y]

    scale:       (matrix, x, y) ->
      @mat3       matrix, 'translate', [x, y]

# 3 axis transforms
class Matrix.Transformation3 extends Matrix
  signature: [
    [matrix: ['Matrix', 'Selector']]
    x:       ['Variable', 'Number']
    y:       ['Variable', 'Number']
    z:       ['Variable', 'Number']
  ]

  @define
    translate3d: (matrix, x, y, z) ->
      if z == 0
        @mat3     matrix, 'translate', [x, y]
      else
        @mat4     matrix, 'translate', [x, y, z]

    scale3d:     (matrix, x, y, z) ->
      if z == 1
        @mat3     matrix, 'scale', [x, y]
      else
        @mat4     matrix, 'scale', [x, y, z]

# 3 axis + angle
class Matrix.Transformation3A extends Matrix
  signature: [
    [matrix: ['Matrix', 'Selector']]
    x:       ['Variable', 'Number']
    y:       ['Variable', 'Number']
    z:       ['Variable', 'Number']
    a:       ['Variable', 'Number']
  ]

  @define
    rotate3d:    (matrix, x, y = x, z = 0, angle) ->
      if z == 0
        @mat3     matrix, 'rotate', [x, y],    angle * 360
      else
        @mat4     matrix, 'rotate', [x, y, z], angle * 360

module.exports = Matrix
