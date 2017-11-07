import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOut } from '../actions/authentication'
import {
  selectAuthIsLoggedIn,
} from '../selectors/auth'

import styled from 'styled-components'
import { colors } from '../constants/styled/colors'
import { link } from '../constants/styled/font_stack'
import { media, em, resetList, clearFix, contentAlign } from '../constants/styled/mixins'

import LogoTitle from '../components/LogoTitle'

const HeaderHolder = styled.header`
  display: block;
  margin: 0 auto;
  max-width: 1440px;
  padding: ${em(40)};
  width: 100%;
  height: ${em(100)};
  ${media.max1360`padding: ${em(20)};`}
  ${media.max640`padding: ${em(10)};`}
`

const NavHolder = styled.nav`
  text-align: right;
  ${contentAlign.vertical}

  ul {
    ${resetList}

    li {
      display: inline-block;
      margin-right: ${em(20)};

      &:last-child {
        margin-right: 0;
      }
      ${link.subtle.package}
    }
  }
`

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

  logout = (e) => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(signOut())
  }

  render() {
    const { isLoggedIn, linkHome } = this.props
    return (
      <HeaderHolder>
        <LogoTitle linkHome={linkHome} />
        {isLoggedIn &&
          <NavHolder>
            <ul>
              <li><Link to='/artist-invites'>My Dashboards</Link></li>
              <li><Link to='#logout' onClick={this.logout}>Logout</Link></li>
            </ul>
          </NavHolder>
        }
      </HeaderHolder>
    )
  }
}

export default connect(mapStateToProps)(TopNavContainer)
