import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { ff, fs } from '../../constants/styled/font_stack'
import { colors } from '../../constants/styled/colors'

const ChartTitleHolder = styled.h4`
  ${ff.light.full}
  ${fs.h6.size}
`

const propTypes = {
  title: PropTypes.bool,
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
