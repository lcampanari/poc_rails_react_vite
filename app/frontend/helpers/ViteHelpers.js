// From https://github.com/reactjs/react-rails/issues/1134#issuecomment-1415112288

export const viteConstructorRequireContext = function (reqCtx) {
  const fromRequireContext = function (reqCtx) {
    return function (className) {
      var parts = className.split('.')
      var filename = parts.shift()
      var keys = parts
      // Load the module:
      var componentPath = Object.keys(reqCtx).find(
        path => path.search(filename) > 0
      )
      var component = reqCtx[componentPath]
      // Then access each key:
      keys.forEach(function (k) {
        component = component[k]
      })
      component = component.default
      return component
    }
  }

  const fromCtx = fromRequireContext(reqCtx)
  return function (className) {
    var component
    try {
      // `require` will raise an error if this className isn't found:
      component = fromCtx(className)
    } catch (firstErr) {
      console.error(firstErr)
    }
    return component
  }
}
