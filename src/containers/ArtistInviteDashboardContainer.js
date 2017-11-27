import React, { Component } from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  loadArtistInvite,
  loadTotalSubmissions,
  loadDailySubmissions,
  loadTotalParticipants,
  loadDailyImpressions,
  loadTotalImpressions,
  loadNetworkActivities,
} from '../actions/artist_invites'
import {
  selectArtistInvite,
  selectTotalApprovedSubmissions,
  selectTotalUnapprovedSubmissions,
  selectTotalDeclinedSubmissions,
  selectTotalSelectedSubmissions,
  selectTotalSubmissions,
  selectDailySubmissions,
  selectNormalParticipants,
  selectInfluentialParticipants,
  selectDailyImpressions,
  selectTotalImpressions,
  selectCommentActivity,
  selectFollowerActivity,
  selectLoveActivity,
  selectMentionActivity,
  selectRepostActivity,
} from '../selectors/artist_invites'
import { Helmet } from 'react-helmet'

import styled from 'styled-components'
import { colors } from '../constants/styled/colors'
import { media } from '../constants/styled/mixins'
import { ff } from '../constants/styled/font_stack'

import ArtistInviteCard from '../components/ArtistInviteCard'
import ArtistInviteStatus from '../components/ArtistInviteDashboard/ArtistInviteStatus'
import SubmissionCount from '../components/ArtistInviteDashboard/SubmissionCount'
import ParticipantCount from '../components/ArtistInviteDashboard/ParticipantCount'
import SubmissionGraph from '../components/ArtistInviteDashboard/SubmissionGraph'
import ViewCountGraph from '../components/ArtistInviteDashboard/ViewCountGraph'
import ViewCountOverlay from '../components/ArtistInviteDashboard/ViewCountOverlay'
import ViewCountAverageOverlay from '../components/ArtistInviteDashboard/ViewCountAverageOverlay'
import ActivityBar from '../components/ArtistInviteDashboard/ActivityBar'
import CustomCharts from '../components/ArtistInviteDashboard/CustomCharts'

const ArtistInviteHeader = styled.header`
  padding: 0 40px 0 40px;
  ${media.max1360`padding: 0 20px 0 20px;`}
  ${media.max640`padding: 0 10px 0 10px;`}
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;

  .status-holder {
    margin: 40px 0 40px 0;
  }
`

const ChartsHolder = styled.section`
  /* stylelint-disable rule-empty-line-before, declaration-empty-line-before */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  ${media.max1360`padding: 0 10px 0 10px;`}
  ${media.max640`padding: 0 5px 0 5px;`}
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;

  .chart-container {
    display: block;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 40px;

    ${media.max1360`
      margin-left: 10px;
      margin-right: 10px;
      margin-bottom: 20px;
    `}

    ${media.max640`
      margin-left: 5px;
      margin-right: 5px;
      margin-bottom: 10px;
    `}

    .chart-structure {
      position: relative;
      display: block;
      padding-bottom: 100%;
      background-color: ${colors.grey};
      border-radius: 5px;
      width: 100%;

      .chart {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      &.loading {
        .chart { /* stylelint-disable-line selector-max-class */
          display: flex;
          align-items: center;
          justify-content: center;
        }
        h4 {
          display: block;
          margin: 0;
          padding: 0;
          color: ${colors.darkGrey};
          ${ff.light.full}
        }
      }
    }

    &.quarter {
      width: calc(25% - 40px);
      ${media.max1360`width: calc(25% - 20px);`}
      ${media.max640`width: calc(50% - 10px);`}
    }

    &.half {
      width: calc(50% - 40px);
      ${media.max1360`width: calc(50% - 20px);`}
      ${media.max640`width: calc(100% - 10px);`}

      .chart-structure {
        padding-bottom: calc(50% - 20px);
        ${media.max1360`padding-bottom: calc(50% - 10px);`}
        ${media.max640`padding-bottom: calc(50% - 5px);`}
      }
    }

    &.full {
      width: 100%;
      .chart-structure {
        padding-bottom: calc(25% - 30px);
        ${media.max1360`padding-bottom: calc(25% - 15px);`}
        ${media.max640`padding-bottom: calc(50% - 5px);`}
      }
    }
  }
  /* stylelint-enable rule-empty-line-before, declaration-empty-line-before */
`

function mapStateToProps(state, props) {
  const { match: { params } } = props
  return {
    id: params.id,
    artistInvite: selectArtistInvite(state, params.id),
    totalApprovedSubmissions: selectTotalApprovedSubmissions(state, params.id),
    totalUnapprovedSubmissions: selectTotalUnapprovedSubmissions(state, params.id),
    totalDeclinedSubmissions: selectTotalDeclinedSubmissions(state, params.id),
    totalSelectedSubmissions: selectTotalSelectedSubmissions(state, params.id),
    totalSubmissions: selectTotalSubmissions(state, params.id),
    totalDailySubmissions: selectDailySubmissions(state, params.id),
    totalNormalParticipants: selectNormalParticipants(state ,params.id),
    totalInfluentialParticipants: selectInfluentialParticipants(state ,params.id),
    totalDailyImpressions: selectDailyImpressions(state, params.id),
    totalImpressions: selectTotalImpressions(state, params.id),
    totalCommentActivity: selectCommentActivity(state, params.id),
    totalFollowerActivity: selectFollowerActivity(state, params.id),
    totalLoveActivity: selectLoveActivity(state, params.id),
    totalMentionActivity: selectMentionActivity(state, params.id),
    totalRepostActivity: selectRepostActivity(state, params.id),
  }
}

class ArtistInviteDashboardContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    artistInvite: PropTypes.object.isRequired,
    totalApprovedSubmissions: PropTypes.object,
    totalUnapprovedSubmissions: PropTypes.object,
    totalDeclinedSubmissions: PropTypes.object,
    totalSelectedSubmissions: PropTypes.object,
    totalDailySubmissions: PropTypes.object,
    totalNormalParticipants: PropTypes.object,
    totalInfluentialParticipants: PropTypes.object,
    totalDailyImpressions: PropTypes.object,
    totalImpressions: PropTypes.object,
    totalCommentActivity: PropTypes.object,
    totalFollowerActivity: PropTypes.object,
    totalLoveActivity: PropTypes.object,
    totalMentionActivity: PropTypes.object,
    totalRepostActivity: PropTypes.object,
  }

  componentWillMount() {
    const { dispatch, id } = this.props
    dispatch(loadArtistInvite(id))
    dispatch(loadTotalSubmissions(id))
    dispatch(loadDailySubmissions(id))
    dispatch(loadTotalParticipants(id))
    dispatch(loadDailyImpressions(id))
    dispatch(loadTotalImpressions(id))
    dispatch(loadNetworkActivities(id))
  }

  render() {
    const {
      artistInvite,
      totalApprovedSubmissions,
      totalUnapprovedSubmissions,
      totalDeclinedSubmissions,
      totalSelectedSubmissions,
      totalSubmissions,
      totalDailySubmissions,
      totalNormalParticipants,
      totalInfluentialParticipants,
      totalDailyImpressions,
      totalImpressions,
      totalCommentActivity,
      totalFollowerActivity,
      totalLoveActivity,
      totalMentionActivity,
      totalRepostActivity,
    } = this.props
    return (
      <div>
        <Helmet title={artistInvite.get('id') ? `${artistInvite.get('title')} | Artist Invite Dashboard` : 'Artist Invite Dashboard'} />
        <ArtistInviteHeader>
          <ArtistInviteCard
            imgSrc={(artistInvite.get('id')) ? artistInvite.getIn(['headerImage', 'optimized', 'url']) : null}
            title={artistInvite.get('id') ? artistInvite.get('title') : null}
            type={artistInvite.get('id') ? artistInvite.get('inviteType') : null}
          />
          <ArtistInviteStatus
            status={artistInvite.get('id') ? artistInvite.get('status') : 'unknown'}
            openedAt={artistInvite.get('id') ? artistInvite.get('openedAt') : null}
            closedAt={artistInvite.get('id') ? artistInvite.get('closedAt') : null}
          />
        </ArtistInviteHeader>

        <ChartsHolder>
          <SubmissionCount
            totalApprovedSubmissions={totalApprovedSubmissions}
            totalUnapprovedSubmissions={totalUnapprovedSubmissions}
            totalDeclinedSubmissions={totalDeclinedSubmissions}
            totalSelectedSubmissions={totalSelectedSubmissions}
            totalSubmissions={totalSubmissions}
          />
          <ParticipantCount
            totalNormalParticipants={totalNormalParticipants}
            totalInfluentialParticipants={totalInfluentialParticipants}
          />
          <SubmissionGraph
            totalDailySubmissions={totalDailySubmissions}
          />
          <ViewCountGraph
            totalDailyImpressions={totalDailyImpressions}
          />
          <ViewCountOverlay
            totalImpressions={totalImpressions}
          />
          <ViewCountAverageOverlay
            totalImpressions={totalImpressions}
            totalSubmissions={totalSubmissions}
          />
          <ActivityBar
            totalCommentActivity={totalCommentActivity}
            totalFollowerActivity={totalFollowerActivity}
            totalLoveActivity={totalLoveActivity}
            totalMentionActivity={totalMentionActivity}
            totalRepostActivity={totalRepostActivity}
          />
          <CustomCharts
            data={artistInvite.get('customStats', Immutable.List())}
          />
        </ChartsHolder>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ArtistInviteDashboardContainer)
