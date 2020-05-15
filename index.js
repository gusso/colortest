const StyleDictionary = require("style-dictionary")

StyleDictionary.registerFilter({
  name: "filter",
  matcher: (prop) => !prop.hideInDesign,
})

StyleDictionary.extend({
  source: ["tokens/color/*.json"],
  platforms: {
    json: {
      transforms: ["name/ti/camel", "attribute/cti", "color/sketch"],
      files: [
        {
          format: "json",
          destination: "build/variables.json",
          filter: "filter",
        },
      ],
    },
  },
}).buildAllPlatforms()
