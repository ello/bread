import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { fs } from '../constants/styled/font_stack'
import { colors } from '../constants/styled/colors'
import { em } from '../constants/styled/mixins'

// FormButton Styles --------------------------------
const FormButtonStyled = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 0 ${em(30)} 0 ${em(30)};
  height: ${em(60)};
  ${fs.body.size}
  line-height: ${em(60)};
  color: ${colors.white};
  border-width: 1px;
  border-style: solid;
  border-color: ${colors.green};
  background-color: ${colors.green};
  transition: background-color 0.2s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.2s cubic-bezier(0.23, 1, 0.32, 1), color 0.2s cubic-bezier(0.23, 1, 0.32, 1), width 0.2s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    border-color: ${colors.darkGreen};
    background-color: ${colors.darkGreen};
  }

  &:disabled {
    cursor: default;
    border-color: ${colors.lightGreen};
    background-color: ${colors.lightGreen};
  }
`

// FormButton Props ---------------------------------
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

const FormButton = ({ clickText, type, handleClick, disabled, className }) => (
  <FormButtonStyled
    type={type}
    onClick={handleClick}
    disabled={disabled}
    className={compiledClasses({ disabled, className })}
  >
    {clickText}
  </FormButtonStyled>
)

FormButton.propTypes = propTypes
FormButton.defaultProps = defaultProps

export default FormButton
