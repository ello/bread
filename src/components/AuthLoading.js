import React from 'react'
// import PropTypes from 'prop-types'

import styled from 'styled-components'
import { fs } from '../constants/styled/font_stack'

const LoadingContainerStyled = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: none;
  z-index: 0;

  h2 {
    display: block;
    ${fs.h4.size}
    font-weight: 400;
  }
`

const LoadingContainer = () => (
  <LoadingContainerStyled>
    <h2>Loading…</h2>
  </LoadingContainerStyled>
)

export default LoadingContainer
