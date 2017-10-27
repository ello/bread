import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
      <form onSubmit={e => this.submit(e)}>
        <input
          type="string"
          name="username"
          placeholder="Username/Email"
          value={username}
          onChange={e => this.handleChange(e)}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => this.handleChange(e)}
        />
        <br />
        <button type="submit">Sign In</button>
      </form>
    )
  }
}
