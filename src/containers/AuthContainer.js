import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import EnterForm from '../components/EnterForm'
import { signIn } from '../actions/authentication'
import {
  selectAuthIsLoggedIn,
  selectAuthIsLoading,
  selectAuthError,
} from '../selectors/auth'

import styled from 'styled-components'
// import { fs } from '../constants/styled/font_stack'
// import { colors } from '../constants/styled/colors'
// import { em } from '../constants/styled/mixins'

// AuthContainer Styles --------------------------------
const AuthContainerHolder = styled.form`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: pink;
`

function mapStateToProps(state) {
  return {
    isLoggedIn: selectAuthIsLoggedIn(state),
    isLoading: selectAuthIsLoading(state),
    error: selectAuthError(state),
  }
}

class AuthContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  login = (email, password) => {
    const { dispatch } = this.props
    dispatch(signIn(email, password))
  }

  render() {
    const { isLoggedIn, isLoading, error, children } = this.props
    let element
    if (isLoggedIn) {
      element = (
        <AuthContainerHolder className="AuthContainer LoggedIn">
          {children}
        </AuthContainerHolder>
      )
    } else if (isLoading) {
      element = <div className="AuthContainer Loading"><p>Loading</p></div>
    } else {
      element = (
        <AuthContainerHolder className="AuthContainer LoggedOut">
          { error && <p className="error">{error}</p> }
          <EnterForm login={this.login} />
        </AuthContainerHolder>
      )
    }
    return element
  }
}

export default withRouter(connect(mapStateToProps)(AuthContainer))
