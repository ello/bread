import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { colors } from '../constants/styled/colors'
import { media } from '../constants/styled/mixins'

import ElloLogoSquare from '-!babel-loader!svg-react-loader?name=ElloLogoSquare!./svg/ElloLogoSquare.svg' // eslint-disable-line import/no-webpack-loader-syntax

const propTypes = {
  linkHome: PropTypes.bool.isRequired,
}

const defaultProps = {
  linkHome: true,
}

const TitleHolder = styled.h1`
  margin: 0;
  width: 100%;
  font-size: 1.25em;
  line-height: 100%;
  text-align: left;

  a {
    text-decoration: none;
  }
`

const Logo = styled.span`
  display: inline-block;
  margin: 0 auto;
  margin-right: 1vw;
  width: 10vw;
  vertical-align: middle;
  ${media.max640`width: 20vw;`}
  ${media.min1440`width: 150px;`}

  svg {
    path {
      &.circle {
        fill: ${colors.black};
      }

      &.table {
        fill: ${colors.white};
      }
    }
  }
`

const Text = styled.span`
  display: none;
`

const renderWithLink = () => (
  <TitleHolder title="Ello">
    <Link to="/artist-invites">
      <Logo>
        <ElloLogoSquare />
      </Logo>
      <Text>
        Ello
      </Text>
    </Link>
  </TitleHolder>
)

const renderWithoutLink = () => (
  <TitleHolder title="Ello">
    <Logo>
      <ElloLogoSquare />
    </Logo>
    <Text>
      Ello
    </Text>
  </TitleHolder>
)

const LogoTitle = ({ linkHome }) => (
  linkHome ? renderWithLink() : renderWithoutLink()
)

LogoTitle.propTypes = propTypes
LogoTitle.defaultProps = defaultProps

export default LogoTitle
