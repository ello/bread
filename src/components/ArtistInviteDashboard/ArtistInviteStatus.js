import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { ff, fs } from '../../constants/styled/font_stack'
import { colors } from '../../constants/styled/colors'
// import { media } from '../../constants/styled/mixins'

import ArtistInviteCountDown from './ArtistInviteCountDown'

const propTypes = {
  status: PropTypes.string.isRequired,
  openedAt: PropTypes.string,
  closedAt: PropTypes.string,
}

const defaultProps = {
  status: 'unknown',
  openedAt: null,
  closedAt: null,
}

const StatusHolder = styled.h3`
  ${ff.light.full}
  ${fs.h4.size}
  color: ${colors.grey};

  &.unknown { .current-status { color: ${colors.mediumGrey}; } }
  &.closed { .current-status { color: ${colors.red}; } }
  &.open { .current-status { color: ${colors.green}; } }
  &.preview { .current-status { color: ${colors.blue}; } }
  &.selecting { .current-status { color: ${colors.gold}; } }
  &.upcoming { .current-status { color: ${colors.purple}; } }
`

const getStatusText = (status) => {
  switch (status) {
    case 'unknown':
      return 'Calculating status…'
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

const ArtistInviteStatus = ({ status, openedAt, closedAt }) => (
  <StatusHolder className={'status-holder ' + status}>
    <span className="current-status">{getStatusText(status)}</span>
    &nbsp;
    {(status && openedAt && closedAt) &&
      <ArtistInviteCountDown
        status={status}
        openedAt={openedAt}
        closedAt={closedAt}
      />
    }
  </StatusHolder>
)

ArtistInviteStatus.propTypes = propTypes
ArtistInviteStatus.defaultProps = defaultProps

export default ArtistInviteStatus
