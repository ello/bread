import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { ff, fs } from '../../constants/styled/font_stack'
import { colors } from '../../constants/styled/colors'
// import { media } from '../../constants/styled/mixins'

const propTypes = {
  status: PropTypes.string.isRequired,
}

const defaultProps = {
  status: 'closed'
}

const StatusHolder = styled.h3`
  ${ff.light.full}
  ${fs.h4.size}

  &.closed { .current-status { color: ${colors.red} } }
  &.open { .current-status { color: ${colors.green} } }
  &.preview { .current-status { color: ${colors.blue} } }
  &.selecting { .current-status { color: ${colors.gold} } }
  &.upcoming { .current-status { color: ${colors.purple} } }
`

const getStatusText = (status) => {
  switch (status) {
    case 'closed':
      return 'Invite Closed'
    case 'open':
      return 'Open For Submissions'
    case 'preview':
      return 'Preview'
    case 'selecting':
      return 'Selections In Progress'
    case 'upcoming':
      return 'Upcoming'
    default:
      return null
  }
}

const ArtistInviteStatus = ({ status }) => (
  <StatusHolder className={'status-holder ' + status}>
    <span className="current-status">{getStatusText(status)}</span>
    &nbsp;
    <span className="time-remaining">Forever</span>
  </StatusHolder>
)

ArtistInviteStatus.propTypes = propTypes
ArtistInviteStatus.defaultProps = defaultProps

export default ArtistInviteStatus
