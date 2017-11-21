import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { ff, fs } from '../constants/styled/font_stack'
// import { colors } from '../constants/styled/colors'
// import { em } from '../constants/styled/mixins'

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
    }
  }

  submit(e) {
    e.preventDefault()
    const { username, password } = this.state
    this.props.login(username, password)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { username, password } = this.state
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
          <FormButton type="submit" clickText="Log In" />
        </p>
        <p className="forgot">
          <a href="/forgot-password">Forgot password?</a>
        </p>
      </FormStyled>
    )
  }
}
