import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { link } from '../../constants/styled/font_stack'
import { colors } from '../../constants/styled/colors'
import { em, resetList, contentAlign } from '../../constants/styled/mixins'

const NavHolder = styled.nav`
  text-align: right;
  ${contentAlign.vertical}
`

const NavList = styled.ul`
  ${resetList}
  position: relative;
  z-index: 1;

  li {
    display: inline-block;
    margin-right: ${em(20)};

    &:last-child {
      margin-right: 0;
    }
    ${link.subtle.package}

    a {
      position: relative;
      text-decoration: none;

      &:before {
        content: '';
        position: absolute;
        bottom: -${em(6)};
        width: 0%;
        border-bottom: ${colors.mediumGrey} solid 0;
        transition: width 0.2s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.2s ease;
      }

      &:hover {
        text-decoration: none;

        &:before {
          width: 100%;
          border-bottom: ${colors.grey} solid 1.5pt;
        }
      }

      &:active {
        text-decoration: none;

        &:before {
          width: 100%;
          border-bottom: ${colors.white} solid 1.5pt;
          transition: border-color 0 ease;
        }
      }
    }
  }
`

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleSignOut: PropTypes.func.isRequired,
}

const defaultProps = {
  isLoggedIn: false,
  handleSignOut: null,
}

const renderLoggedIn = ({ handleSignOut }) => {
  return (
    <NavHolder>
      <NavList>
        <li><Link to='/artist-invites'>My Dashboards</Link></li>
        <li><Link to='#logout' onClick={handleSignOut}>Logout</Link></li>
      </NavList>
    </NavHolder>
  )
}

const renderLoggedOut = () => (
  <NavHolder>
    <NavList>
      <li>
        <a href="/">Back to Ello</a>
      </li>
    </NavList>
  </NavHolder>
)

const Nav = ({ isLoggedIn, handleSignOut }) => (
  isLoggedIn ? renderLoggedIn({ handleSignOut }) : renderLoggedOut()
)

Nav.propTypes = propTypes
Nav.defaultProps = defaultProps

export default Nav
