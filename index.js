const StyleDictionary = require('style-dictionary')

StyleDictionary.registerFilter({
  name: 'filter-alias',
  matcher: function(prop) {
    return prop.attributes.type !== 'base'
  },
})

StyleDictionary.extend({
  source: ['properties/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          filter: 'filter-alias',
        },
      ],
    },
  },
}).buildAllPlatforms()
