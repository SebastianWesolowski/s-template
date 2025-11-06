const path = require('path');

module.exports = {
  plugins: [
    '@tailwindcss/postcss',
    [
      'postcss-import',
      {
        path: [path.join(__dirname, 'src')],
      },
    ],
    'autoprefixer',
    [
      'postcss-preset-env',
      {
        stage: 1, // Najbardziej eksperymentalne funkcje
        features: {
          'nesting-rules': false,
          'custom-properties': false,
          'focus-within-pseudo-class': false,
        },
        autoprefixer: {
          grid: true,
          flexbox: 'no-2009',
        },
      },
    ],
    ...(process.env.NODE_ENV === 'production'
      ? [
          [
            'cssnano',
            {
              preset: [
                'advanced',
                {
                  discardComments: { removeAll: true },
                  reduceIdents: false,
                  zindex: false,
                  mergeIdents: false,
                  discardUnused: false,
                },
              ],
            },
          ],
        ]
      : []),
    ['postcss-discard-comments', process.env.NODE_ENV === 'production' ? { removeAll: true } : false],
  ],
};
