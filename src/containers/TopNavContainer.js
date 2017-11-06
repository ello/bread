import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOut } from '../actions/authentication'
import {
  selectAuthIsLoggedIn,
} from '../selectors/auth'

import LogoTitle from '../components/LogoTitle'

function mapStateToProps(state) {
  return {
    isLoggedIn: selectAuthIsLoggedIn(state),
  }
}

class TopNavContainer extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    linkHome: PropTypes.bool,
  }

  logout = () => {
    const { dispatch } = this.props
    dispatch(signOut())
  }

  render() {
    const { isLoggedIn, linkHome } = this.props
    return (
      <div>
        <LogoTitle linkHome={linkHome} />
        {isLoggedIn &&
          <ul>
            <li><Link to='/artist-invites'>My Dashboards</Link></li>
            <li><button onClick={this.logout}>Logout</button></li>
          </ul>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(TopNavContainer)
