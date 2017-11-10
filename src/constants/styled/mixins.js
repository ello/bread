// global mixins / helpers ----------------------------------------------------------------------
// little-no actual _presentation_ styling should exist in these mixins
import ReactDOMServer from 'react-dom/server'

import { css } from 'styled-components'
import { parseToRgb } from '../../helpers/vendor/polished/color_hex_to_rgb'

// media queries & breakpoints ------------------------------------------------------------
const sizes = {
  max2440: [2440, true],
  min2440: [2441, false],
  max2080: [2080, true],
  min2080: [2081, false],
  max1720: [1720, true],
  min1720: [1721, false],
  max1360: [1360, true],
  min1360: [1361, false],
  max960: [960, true],
  min960: [961, false],
  max640: [640, true],
  min640: [641, false],
}

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label][0] / 16
  const max = sizes[label][1]
  const updatedAccumulator = accumulator

  if (max) {
    updatedAccumulator[label] = (...args) => css`

      @media (max-width: ${emSize}em) {
        ${css(...args)}
      }

    `
  } else {
    updatedAccumulator[label] = (...args) => css`

      @media (min-width: ${emSize}em) {
        ${css(...args)}
      }

    `
  }

  return updatedAccumulator
}, {})


// utility aliases ------------------------------------
// hook in external js helpers here
export function toRGB(color = null) { // particularly helpful when calling rgba
  return parseToRgb(color).full
}

// get em from px with
export function em(pxRequested = null) {
  const base = 16

  let px = base
  if (pxRequested !== null) {
    px = pxRequested
  }

  const emCalculated = (px / base)
  const emDisplay = `${emCalculated}rem`

  return emDisplay
}

// render SVG for CSS embedding
export function embedSvgRender(svgObject, color) {
  const iconRenderedString = ReactDOMServer.renderToStaticMarkup(svgObject).replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"').replace('<path', `<path fill="${color}"`)
  return { svg: iconRenderedString }
}


// layout helpers -------------------------------------
export const clearFix = css`
  &:after {
    content: '""',
    display: 'block',
    clear: 'both',
  }
`

export const hideText = css`
  text-indent: -120%;
  white-space: nowrap;
  overflow: hidden;
`

export const cancelTypeSize = css`
  font-size: inherit;
  line-height: inherit;
`

export const contentAlign = {
  vertical: css`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`,
  cancelVertical: css`
  top: auto;
  transform: translateY(0);
`,
  horizontal: css`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`,
  cancelHorizontal: css`
  left: auto;
  transform: translateX(0);
`,
  center: css`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`,
  cancelCenter: css`
  top: auto;
  left: auto;
  transform: translateY(0) translateX(0);
`,
}

// svg helpers ----------------------------------------
export function svgStroke(strokeWidth, strokeColor) {
  const strokePackage = {
    line: css`
    fill: none;
    stroke: ${strokeColor};
    stroke-width: ${strokeWidth}; /* width given without a unit will default to pixels */
    stroke-linecap: 'square';
  `,
    path: css`
    stroke: ${strokeColor};
    stroke-width: ${strokeWidth}; /* width given without a unit will default to pixels */
    stroke-linecap: 'square';
  `,
  }

  return strokePackage
}

// resets ---------------------------------------------
export const resetList = css`
  margin: 0;
  padding: 0;
  list-style-type: none;
`
