import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { colors } from '../../constants/styled/colors'
import { contentAlign } from '../../constants/styled/mixins'

import ElloLogo from '-!babel-loader!svg-react-loader?name=ElloLogo!../svg/ElloLogo.svg' // eslint-disable-line import/no-webpack-loader-syntax

const propTypes = {
  linkHome: PropTypes.bool.isRequired,
}

const defaultProps = {
  linkHome: true,
}

const TitleHolder = styled.h1`
  position: relative;
  margin: 0;
  font-size: 1.25em;
  line-height: 100%;
  text-align: left;
  float: left;
  ${contentAlign.vertical}
  z-index: 2;

  a {
    text-decoration: none;
  }
`

const Logo = styled.span`
  display: inline-block;
  margin: 0 auto;
  margin-right: 1vw;
  vertical-align: middle;

  svg {
    polygon,
    path {
      fill: ${colors.white};
    }
  }
`

const Text = styled.span`
  display: none;
`

const renderWithLink = () => (
  <TitleHolder title="Ello">
    <Link to="/">
      <Logo>
        <ElloLogo />
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
      <ElloLogo />
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
