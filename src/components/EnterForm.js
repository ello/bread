import React, { Component } from 'react'
import PropTypes from 'prop-types'
import trim from 'lodash/trim'

import styled from 'styled-components'
import { ff, fs } from '../constants/styled/font_stack'

import FormControlInput from './FormControlInput'
import FormButton from './FormButton'

// Form Styles --------------------------------
const FormStyled = styled.form`
  width: 100%;
  max-width: 320px;

  h2 {
    margin-bottom: 30px;
    ${ff.regular.full}
    ${fs.h4.size}
  }

  p {
    margin: 0;

    &.forgot {
      margin-top: 15px;

      a {
        text-decoration: none;
      }
    }
  }

  input[type=text],
  input[type=password] {
    margin-bottom: 10px;
  }
`

export default class EnterForm extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      usernameValid: false,
      passwordValid: false,
      formValid: false,
      buttonDisabled: true,
    }
  }

  submit(e) {
    e.preventDefault()
    const { username, password, formValid } = this.state

    if (formValid) {
      this.props.login(username, password)
    }
  }

  handleChange(e) {
    const name = e.target.name
    const newValue = (name === 'username') ? trim(e.target.value) : e.target.value

    this.setState({
      [name]: newValue
    }, this.validateField(name, newValue))
  }

  validateField(name, value) {
    let isValid = false

    switch(name) {
      case 'username':
        isValid = value.length > 0
        break
      case 'password':
        isValid = value.length >= 8
        break
      default:
        break
    }
    this.setState({
      [`${name}Valid`]: isValid,
    }, this.validateForm)
  }

  validateForm() {
    const { usernameValid, passwordValid } = this.state

    const formValid = usernameValid && passwordValid
    const buttonDisabled = !formValid

    this.setState({
      formValid: formValid,
      buttonDisabled: buttonDisabled,
    })

  }

  render() {
    const { username, password, buttonDisabled } = this.state
    return (
      <FormStyled onSubmit={e => this.submit(e)}>
        <h2>Sign in.</h2>
        <p>
          <FormControlInput
            type="text"
            name="username"
            placeholder="Enter your username or email"
            value={username}
            autoCapitalize="on"
            autoCorrect="on"
            handleChange={e => this.handleChange(e)}
            labelText="Username or Email"
          />
          <br />
          <FormControlInput
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            autoCapitalize="on"
            autoCorrect="on"
            handleChange={e => this.handleChange(e)}
            labelText="Password"
          />
        </p>
        <p>
          <FormButton type="submit" clickText="Log In" disabled={buttonDisabled} />
        </p>
        <p className="forgot">
          <a href="/forgot-password">Forgot password?</a>
        </p>
      </FormStyled>
    )
  }
}
