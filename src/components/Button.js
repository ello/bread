import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { ff, fs } from '../constants/styled/font_stack'
import { colors } from '../constants/styled/colors'
import { media, contentAlign, toRGB } from '../constants/styled/mixins'

// Button Styles --------------------------------
const ButtonStyled = styled.button`
  color: ${colors.white};
  background-color: ${colors.green};
`

// Button Props ---------------------------------
const propTypes = {
  clickText: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

const defaultProps = {
  clickText: 'Click 👇 me!',
  handleClick: null,
  type: 'button',
  disabled: false,
  className: null,
}

// Build Class String ---------------------------
const compiledClasses = ({ disabled, className }) => {
  const allClasses = []

  if (disabled) {
    allClasses.push('disabled')
  }

  if (className) {
    className.split(' ').map((cssClass) => (allClasses.push(cssClass)))
  }

  return allClasses.join(' ')
}

const Button = ({ clickText, type, handleClick, disabled, className }) => (
  <ButtonStyled
    type={type}
    onClick={handleClick}
    disabled={disabled}
    className={compiledClasses({ disabled, className })}
  >
    {clickText}
  </ButtonStyled>
)

Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default Button
