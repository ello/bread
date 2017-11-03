// Hex to RGB Conversion ------------------------------------------------------------------------
// modified from the `Polished` Style Components Project
// https://github.com/styled-components/polished

import nameToHex from './_nameToHex'

const hexRegex = /^#[a-fA-F0-9]{6}$/
const reducedHexRegex = /^#[a-fA-F0-9]{3}$/

/**
 * Returns an RgbColor or RgbaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a RgbColor or RgbaColor object back to a string.
 *
 * @example
 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
 * const color1 = 'rgb(255, 0, 0)';
 */

export function parseToRgb(color = null) {
  if (typeof color !== 'string') {
    throw new Error(
      'Passed an incorrect argument to a color function, please pass a string representation of a color.',
    )
  }

  const normalizedColor = nameToHex(color)

  if (normalizedColor.match(hexRegex)) {
    return {
      red: parseInt(`${normalizedColor[1]}${normalizedColor[2]}`, 16),
      green: parseInt(`${normalizedColor[3]}${normalizedColor[4]}`, 16),
      blue: parseInt(`${normalizedColor[5]}${normalizedColor[6]}`, 16),
      full: `${parseInt(`${normalizedColor[1]}${normalizedColor[2]}`, 16)}, ${parseInt(`${normalizedColor[3]}${normalizedColor[4]}`, 16)}, ${parseInt(`${normalizedColor[5]}${normalizedColor[6]}`, 16)}`,
    }
  }

  if (normalizedColor.match(reducedHexRegex)) {
    return {
      red: parseInt(`${normalizedColor[1]}${normalizedColor[1]}`, 16),
      green: parseInt(`${normalizedColor[2]}${normalizedColor[2]}`, 16),
      blue: parseInt(`${normalizedColor[3]}${normalizedColor[3]}`, 16),
      full: `${parseInt(`${normalizedColor[1]}${normalizedColor[1]}`, 16)}, ${parseInt(`${normalizedColor[2]}${normalizedColor[2]}`, 16)}, ${parseInt(`${normalizedColor[3]}${normalizedColor[3]}`, 16)}`,
    }
  }

  throw new Error(
    "Couldn't parse the color string. Please provide the color as a string in hex, rgb, or rgba notation.",
  )
}
