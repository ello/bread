import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { link, fs } from '../../constants/styled/font_stack'
import { colors } from '../../constants/styled/colors'
import { media, em, resetList } from '../../constants/styled/mixins'

const ArtistInviteNavHolder = styled.nav`
  ${media.min640`float: right;`}
`

const ArtistInviteNavList = styled.ul`
  ${resetList}
  position: relative;
  padding-top: ${em(8)};
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
  inviteLinkPath: PropTypes.string.isRequired,
}

const defaultProps = {
  inviteLinkPath: '/artist-invites',
}

const ArtistInviteNav = ({ inviteLinkPath }) => (
  <ArtistInviteNavHolder className="invite-nav-holder">
    <ArtistInviteNavList>
      <li><a href={inviteLinkPath || '/artist-invites'}>View Artist Invite</a></li>
    </ArtistInviteNavList>
  </ArtistInviteNavHolder>
)

ArtistInviteNav.propTypes = propTypes
ArtistInviteNav.defaultProps = defaultProps

export default ArtistInviteNav
