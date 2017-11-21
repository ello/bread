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

import AuthLoading from '../components/AuthLoading'

// AuthContainer Styles --------------------------------
const AuthContainerFormHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 10px 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 0;
`

const AuthContainerLoadingHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
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
        <div className="AuthContainer LoggedIn">
          {children}
        </div>
      )
    } else if (isLoading) {
      element = (
        <AuthContainerLoadingHolder>
          <AuthLoading />
        </AuthContainerLoadingHolder>
      )
    } else {
      element = (
        <div className="AuthContainer LoggedOut">
          <AuthContainerFormHolder>
            { error && <p className="error">{error}</p> }
            <EnterForm login={this.login} />
          </AuthContainerFormHolder>
        </div>
      )
    }
    return element
  }
}

export default withRouter(connect(mapStateToProps)(AuthContainer))
