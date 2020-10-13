var plugins = [{
      plugin: require('/Users/robertmerrill/Desktop/gatsby-pizza/pizza-business/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/robertmerrill/Desktop/gatsby-pizza/pizza-business/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/robertmerrill/Desktop/gatsby-pizza/pizza-business/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"3tmorhil","dataset":"production","watchMode":true,"token":"sk4OmvQkrXw2SVVGvE5HvI0848eVO56ON9E12UZ01g7Gsj5amOvkjNvhpXaNHRZ9T4ptPyg1P68XQ5kY7koJFGPFXf5jvMgPyBDuBUOi3y7xK8oM9kQa2EPoOQ6nlHxIV5qeD1CLYpMw31lIRptlNKtfZo468qpiNnyw7leSH8w5KXVtzStG"},
    },{
      plugin: require('/Users/robertmerrill/Desktop/gatsby-pizza/pizza-business/node_modules/gatsby-plugin-snipcartv3/gatsby-ssr'),
      options: {"plugins":[],"apiKey":"MzUxZjFkYTAtNjc1NS00MzBkLWFiMDgtZjhlYzUwMjQ5MWY5NjM3MzgxMzIyMTkzMzg1NTg4","autopop":false},
    },{
      plugin: require('/Users/robertmerrill/Desktop/gatsby-pizza/pizza-business/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
