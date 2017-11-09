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

import styled from 'styled-components'
import { media } from '../constants/styled/mixins'

import ArtistInviteCard from '../components/ArtistInviteCard'
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
        <ArtistInviteHeader>
          <ArtistInviteCard
            imgSrc={artistInvite.get('headerImage').getIn(['optimized', 'url'])}
            title={artistInvite.get('title')}
            type={artistInvite.get('inviteType')}
          />
        </ArtistInviteHeader>

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
      </div>
    )
  }
}

export default connect(mapStateToProps)(ArtistInviteDashboardContainer)
