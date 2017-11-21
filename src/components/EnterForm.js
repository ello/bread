import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
// import { fs } from '../constants/styled/font_stack'
// import { colors } from '../constants/styled/colors'
// import { em } from '../constants/styled/mixins'

import FormControlInput from './FormControlInput'
import FormButton from './FormButton'

// Form Styles --------------------------------
const FormStyled = styled.form`
  width: 100%;
  max-width: 320px;
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
        <FormControlInput
          type="text"
          name="username"
          placeholder="Enter your username or email"
          value={username}
          handleChange={e => this.handleChange(e)}
          labelText="Username or Email"
        />
        <br />
        <FormControlInput
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          handleChange={e => this.handleChange(e)}
          labelText="Password"
        />
        <br />
        <FormButton type="submit" clickText="Log In" />
      </FormStyled>
    )
  }
}
