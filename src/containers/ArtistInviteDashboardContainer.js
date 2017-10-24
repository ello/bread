import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadArtistInvite } from '../actions/artist_invites'
import { selectArtistInvite } from '../selectors/artist_invites'
import ArtistInviteListItem from '../components/ArtistInviteListItem'

function mapStateToProps(state, props) {
  const { match: { params } } = props
  return {
    id: params.id,
    artistInvite: selectArtistInvite(state, params.id),
  }
}

class ArtistInviteDashboardContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    artistInvite: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { dispatch, id } = this.props
    dispatch(loadArtistInvite(id))
  }

  render() {
    const { artistInvite } = this.props
    return (
      <div>
        <ArtistInviteListItem
          key={'artist-invite:' + artistInvite.get('id')}
          id={artistInvite.get('id')}
          title={artistInvite.get('title')}
          type={artistInvite.get('inviteType')}
          headerImage={artistInvite.get('headerImage')}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(ArtistInviteDashboardContainer)
