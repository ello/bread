import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { ff, fs } from '../constants/styled/font_stack'

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

  p {
    display: block;
    margin: 0;
    margin-top: 10px;
  }
`

const propTypes = {
  messageText: PropTypes.bool.isRequired,
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
        <p>
          <a href={linkPath}>{linkText}</a>
        </p>
      }
    </div>
  </MessageTakeoverStyled>
)

MessageTakeover.propTypes = propTypes
MessageTakeover.defaultProps = defaultProps

export default MessageTakeover
