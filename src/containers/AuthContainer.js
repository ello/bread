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

function mapStateToProps(state) {
  return {
    isLoggedIn: selectAuthIsLoggedIn(state),
    isLoading: selectAuthIsLoading(state),
    error: selectAuthError(state),
  }
}

class AuthContainer extends Component {
  static propTypes = {
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
    const { isLoggedIn, isLoading, error } = this.props
    let element
    if (isLoggedIn) {
      element = this.props.children
    } else if (isLoading) {
      element = <div className="AuthContainer Loading"><p>Loading</p></div>
    } else {
      element = (
        <div className="AuthContainer LoggedOut">
          { error && <p className="error">{error}</p> }
          <EnterForm login={this.login} />
        </div>
      )
    }
    return element
  }
}

export default withRouter(connect(mapStateToProps)(AuthContainer))
