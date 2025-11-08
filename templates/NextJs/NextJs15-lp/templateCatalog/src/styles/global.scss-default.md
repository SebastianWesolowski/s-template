/*! NOTE: These are just recommended default global styles, edit as required */

/* Use highlight color for selection with fallback */
/* stylelint-disable-next-line no-vendor-prefix, property-no-vendor-prefix */
/* stylelint-disable plugin/no-unsupported-browser-features */
::selection {
  color: #242424;

  /* Optional */

  /* It can be really hard to read highlighted text with a text-shadow, it should be removed when selected */
  text-shadow: none;
  background-color: #f9b80f;

  /* NOTE: Using this means the color and background-color are set to transparent for selected text... */

  /* So you can customise your styles below */
}
/* stylelint-enable plugin/no-unsupported-browser-features */

html {
  /* Make base font-size 100% of browser font-size */
  /* stylelint-disable plugin/no-unsupported-browser-features */
  text-size-adjust: 100%;
  /* stylelint-enable plugin/no-unsupported-browser-features */
  font-size: 100%;
}

body {
  /* Declare your default font stack here */

  /* Better text rendering - font-smoothing has not been officially declared, but can still be useful */
  text-rendering: optimizespeed;
  -webkit-font-smoothing: antialiased;
}

/* Basic responsive image handling */
img {
  max-width: 100%;
  height: auto;

  /* This isn't needed, but as a user, I get frustrated when I highlight text and the image gets highlighted too */
  /* stylelint-disable plugin/no-unsupported-browser-features */
  user-select: none;
  /* stylelint-enable plugin/no-unsupported-browser-features */
}

/* Basic touch target handling */
a,
button {
  cursor: pointer;
}

/* SVG defaults */
svg {
  display: inline-block;
  vertical-align: middle;
}

/* Media element defaults */
iframe,
video {
  max-width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
}
