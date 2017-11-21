import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { ff, fs } from '../constants/styled/font_stack'
import { colors } from '../constants/styled/colors'
import { em } from '../constants/styled/mixins'

// FormControlInput Styles --------------------------------
const FormControlInputStyled = styled.input`
  /* reset */
  appearance: none;
  outline: none;
  background: transparent;
  border: 0;
  border-radius: 0;

  /* styling */
  padding: 0 ${em(30)} 0 ${em(30)};
  width: 100%;
  height: ${em(60)};
  font-family: ${ff.regular};
  ${fs.body.size}
  color: ${colors.black};
  background-color: ${colors.grey};

  &:focus {
    background-color: ${colors.white};
  }
`

const FormControlInputWithLabel = styled.span`
  position: relative;
`

const LabelStyled = styled.label`
  position: absolute;
  top: 0;
  right: ${em(11)};
  font-family: ${ff.regular};
  ${fs.small.size}
  color: ${colors.mediumGrey};
  text-align: right;
  vertical-align: baseline;
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1);

  &.has-value {
    opacity: 1;
    transform: translate3d(0, -${em(15)}, 0);
  }
`

// FormControlInput Props ---------------------------------
const propTypes = {
  handleChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'password', 'email', 'tel']),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  autoCapitalize: PropTypes.oneOf(['off', 'on']),
  autoCorrect: PropTypes.oneOf(['off', 'on']),
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
  autoCapitalize: null,
  autoCorrect: null,
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

  render({ handleChange, type, name, placeholder, value, autoCapitalize, autoCorrect, disabled, className, labelText } = this.props) {
    if (labelText) {
      return (
        <FormControlInputWithLabel>
          <FormControlInputStyled
            onChange={handleChange}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            className={className}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            disabled={disabled}
          />
          <LabelStyled
            htmlFor={name}
            className={value ? 'has-value' : null}
          >
            {labelText}
          </LabelStyled>
        </FormControlInputWithLabel>
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
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        disabled={disabled}
      />
    )
  }
}

FormControlInput.propTypes = propTypes
FormControlInput.defaultProps = defaultProps

export default FormControlInput
