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
  name: 'name/notype',
  type: 'name',
  transformer: (prop, options) =>
    [options.prefix]
      .concat(prop.path.filter((p, i) => i !== 1))
      .join('-')
      .substring(1),
});

StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  transformer: ({ value }) => `${value}px`,
});

const output = [
  {
    source: ['src/colors/**/*.json'],

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

      less: {
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
        transforms: ['attribute/cti', 'name/notype'],
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

  {
    source: ['src/spacing/**/*.json'],

    platforms: {
      less: {
        transforms: ['attribute/cti', 'name/notype', 'size/px'],
        files: [
          {
            format: 'less/variables',
            destination: 'dist/spacing.less',
          },
        ],
      },

      css: {
        transforms: ['attribute/cti', 'name/notype', 'size/px'],
        files: [
          {
            format: 'css/variables',
            destination: 'dist/spacing.css',
          },
        ],
      },
    },
  },
];

output.forEach((config) => {
  StyleDictionary.extend(config).buildAllPlatforms();
});
