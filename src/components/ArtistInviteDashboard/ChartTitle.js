import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { ff, fs } from '../../constants/styled/font_stack'

const ChartTitleHolder = styled.h4`
  ${ff.light.full}
  ${fs.h6.size}
  margin-bottom: 8px;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const propTypes = {
  title: PropTypes.string,
}

const defaultProps = {
  title: 'Chart',
}

const ChartTitle = ({ title }) => (
  <ChartTitleHolder>
    {title}
  </ChartTitleHolder>
)

ChartTitle.propTypes = propTypes
ChartTitle.defaultProps = defaultProps

export default ChartTitle
