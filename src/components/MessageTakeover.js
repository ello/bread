import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { ff, fs, link } from '../constants/styled/font_stack'
import { colors } from '../constants/styled/colors'
import { em } from '../constants/styled/mixins'

const MessageTakeoverStyled = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
  z-index: 0;

  .container {
    display: block;
    text-align: center;
  }

  h2 {
    display: block;
    ${ff.light.full}
    ${fs.h4.size}
  }
`

const LinkHolderStyled = styled.p`
  display: block;
  margin: 0;
  margin-top: 10px;
  ${link.subtle.package}

  a {
    position: relative;

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
`

const propTypes = {
  messageText: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  linkPath: PropTypes.string,
}

const defaultProps = {
  messageText: null,
  linkText: null,
  linkPath: null,
}

const MessageTakeover = ({ messageText, linkText, linkPath }) => (
  <MessageTakeoverStyled>
    <div className="container">
      <h2>{messageText}</h2>
      {(linkText && linkPath) &&
        <LinkHolderStyled>
          <a href={linkPath}>{linkText}</a>
        </LinkHolderStyled>
      }
    </div>
  </MessageTakeoverStyled>
)

MessageTakeover.propTypes = propTypes
MessageTakeover.defaultProps = defaultProps

export default MessageTakeover
