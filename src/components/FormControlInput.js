import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { fs } from '../constants/styled/font_stack'
import { colors } from '../constants/styled/colors'
import { em } from '../constants/styled/mixins'

// FormControlInput Styles --------------------------------
const FormControlInputStyled = styled.input`

`

const LabelStyled = styled.label`

`

// FormControlInput Props ---------------------------------
const propTypes = {
  handleChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'password', 'email', 'tel']),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  labelText: PropTypes.string,
}

const defaultProps = {
  handleChange: null,
  type: 'radio',
  name: null,
  placeholder: null,
  value: null,
  disabled: false,
  className: null,
  labelText: null,
}

class FormControlInput extends React.Component {
  // handleChange = (event) => {
  //   this.props.textChange(event)
  // }

  // componentDidMount(){
  //    this.textInput.focus()
  // }

  render({ handleChange, type, name, placeholder, value, disabled, className, labelText } = this.props) {
    if (labelText) {
      return (
        <span className="text-input-with-label">
          <LabelStyled
            htmlFor={name}
          >
            {labelText}
          </LabelStyled>
          <FormControlInputStyled
            onChange={handleChange}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            className={className}
            disabled={disabled}
          />
        </span>
      )
    }
    return (
      <FormControlInputStyled
        onChange={handleChange}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
      />
    )
  }
}

FormControlInput.propTypes = propTypes
FormControlInput.defaultProps = defaultProps

export default FormControlInput
