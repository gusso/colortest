const StyleDictionary = require("style-dictionary")

StyleDictionary.registerFilter({
  name: "filter",
  matcher: (prop) => prop.attributes.type !== "base" && !prop.hideInDesign,
})

StyleDictionary.extend({
  source: ["neptune/tokens/transferwise/color/*.json"],
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
