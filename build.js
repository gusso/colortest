// eslint-disable-next-line import/no-extraneous-dependencies
import StyleDictionary from 'style-dictionary';

StyleDictionary.registerFilter({
  name: 'designTool',
  matcher: ({ hideInDesign }) => !hideInDesign,
});

StyleDictionary.registerFilter({
  name: 'base',
  matcher: ({ attributes }) => attributes.type === 'base',
});

StyleDictionary.registerFilter({
  name: 'light',
  matcher: ({ attributes }) => attributes.type === 'light',
});

StyleDictionary.registerTransform({
  name: 'name/cti/kebab/notheme',
  type: 'name',
  matcher: (prop) => prop.attributes.type !== 'base',
  transformer: (prop, options) =>
    [options.prefix]
      .concat(prop.path.filter((name, i) => i !== 1))
      .join('-')
      .substring(1),
});

const output = [
  {
    source: ['tokens/color/**/*.json'],
    platforms: {
      json: {
        transforms: ['name/ti/camel', 'attribute/cti', 'color/sketch'],
        files: [
          {
            format: 'json',
            destination: 'dist/colors.json',
            filter: 'designTool',
          },
        ],
      },

      lessBase: {
        transformGroup: 'less',
        files: [
          {
            format: 'less/variables',
            destination: 'dist/colors-base.less',
            filter: 'base',
          },
        ],
      },

      css: {
        transforms: [
          'attribute/cti',
          'name/cti/kebab/notheme',
          'time/seconds',
          'content/icon',
          'size/rem',
          'color/css',
        ],
        files: [
          {
            format: 'css/variables',
            destination: 'dist/colors.css',
            filter: 'light',
          },
        ],
      },
    },
  },
];

output.forEach((config) => {
  StyleDictionary.extend(config).buildAllPlatforms();
});
