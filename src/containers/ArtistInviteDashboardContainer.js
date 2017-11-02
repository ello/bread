import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  loadArtistInvite,
  loadTotalSubmissions,
  loadDailySubmissions,
  loadTotalParticipants,
} from '../actions/artist_invites'
import {
  selectArtistInvite,
  selectTotalApprovedSubmissions,
  selectTotalUnapprovedSubmissions,
  selectTotalDeclinedSubmissions,
  selectTotalSelectedSubmissions,
  selectDailySubmissions,
  selectNormalParticipants,
  selectInfluentialParticipants,
} from '../selectors/artist_invites'
import ArtistInviteListItem from '../components/ArtistInviteListItem'
import SubmissionCount from '../components/ArtistInviteDashboard/SubmissionCount'
import ParticipantCount from '../components/ArtistInviteDashboard/ParticipantCount'
import SubmissionGraph from '../components/ArtistInviteDashboard/SubmissionGraph'

function mapStateToProps(state, props) {
  const { match: { params } } = props
  return {
    id: params.id,
    artistInvite: selectArtistInvite(state, params.id),
    totalApprovedSubmissions: selectTotalApprovedSubmissions(state, params.id),
    totalUnapprovedSubmissions: selectTotalUnapprovedSubmissions(state, params.id),
    totalDeclinedSubmissions: selectTotalDeclinedSubmissions(state, params.id),
    totalSelectedSubmissions: selectTotalSelectedSubmissions(state, params.id),
    totalDailySubmissions: selectDailySubmissions(state, params.id),
    totalNormalParticipants: selectNormalParticipants(state ,params.id),
    totalInfluentialParticipants: selectInfluentialParticipants(state ,params.id),
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
    totalDailySubmissions: PropTypes.array,
    totalNormalParticipants: PropTypes.object,
    totalInfluentialParticipants: PropTypes.object,
  }

  componentWillMount() {
    const { dispatch, id } = this.props
    dispatch(loadArtistInvite(id))
    dispatch(loadTotalSubmissions(id))
    dispatch(loadDailySubmissions(id))
    dispatch(loadTotalParticipants(id))
  }

  render() {
    const {
      artistInvite,
      totalApprovedSubmissions,
      totalUnapprovedSubmissions,
      totalDeclinedSubmissions,
      totalSelectedSubmissions,
      totalDailySubmissions,
      totalNormalParticipants,
      totalInfluentialParticipants,
    } = this.props
    return (
      <div>
        <ArtistInviteListItem
          key={'artist-invite:' + artistInvite.get('id')}
          id={artistInvite.get('id')}
          title={artistInvite.get('title')}
          type={artistInvite.get('inviteType')}
          headerImage={artistInvite.get('headerImage')}
        />
        <SubmissionCount
          totalApprovedSubmissions={totalApprovedSubmissions}
          totalUnapprovedSubmissions={totalUnapprovedSubmissions}
          totalDeclinedSubmissions={totalDeclinedSubmissions}
          totalSelectedSubmissions={totalSelectedSubmissions}
        />
        <ParticipantCount
          totalNormalParticipants={totalNormalParticipants}
          totalInfluentialParticipants={totalInfluentialParticipants}
        />
        <SubmissionGraph
          totalDailySubmissions={totalDailySubmissions}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(ArtistInviteDashboardContainer)
