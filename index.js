const StyleDictionary = require("style-dictionary")

StyleDictionary.registerFilter({
  name: "filter",
  matcher: (prop) => prop.attributes.type !== "base" && !prop.hideInDesign,
})

const go = {
  platforms: {
    json: {
      transforms: [
        // The following transforms map the property name, attribute
        // and color values into formats the plugin expects.
        "name/ti/camel",
        "attribute/cti",
        "color/sketch",
      ],
      files: [
        {
          // This defines the file format of the output.
          format: "json",
          destination: "output.json",
        },
      ],
    },
  },
}

StyleDictionary.extend({
  source: ["properties/color/*.json"],
  platforms: {
    json: {
      transforms: ["name/ti/camel", "attribute/cti", "color/sketch"],
      files: [
        {
          format: "json",
          destination: "variables.json",
          filter: "filter",
        },
      ],
    },
  },
}).buildAllPlatforms()
