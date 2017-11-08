import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signOut } from '../actions/authentication'
import {
  selectAuthIsLoggedIn,
} from '../selectors/auth'

import styled from 'styled-components'
import { media, em } from '../constants/styled/mixins'

import LogoTitle from '../components/TopNav/LogoTitle'
import Nav from '../components/TopNav/Nav'

const HeaderHolder = styled.header`
  display: block;
  margin: 0 auto;
  margin-bottom: 80px;
  padding: ${em(40)};
  max-width: 1440px;
  width: 100%;
  height: ${em(100)};
  ${media.max1360`padding: ${em(20)};`}
  ${media.max960`margin-bottom: 60px;`}
  ${media.max640`
    margin-bottom: 40px;
    padding: ${em(10)};
  `}
`

function mapStateToProps(state) {
  return {
    isLoggedIn: selectAuthIsLoggedIn(state),
  }
}

class TopNavContainer extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }

  logout = (e) => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(signOut())
  }

  render() {
    const { isLoggedIn } = this.props
    return (
      <HeaderHolder>
        <LogoTitle linkHome={true} />
        <Nav isLoggedIn={isLoggedIn} handleSignOut={this.logout} />
      </HeaderHolder>
    )
  }
}

export default connect(mapStateToProps)(TopNavContainer)
