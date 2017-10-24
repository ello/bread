import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadArtistInvites } from '../actions/artist_invites'
import { selectArtistInvites } from '../selectors/artist_invites'
import ArtistInviteListItem from '../components/ArtistInviteListItem'

function mapStateToProps(state, props) {
  return {
    artistInvites: selectArtistInvites(state, props)
  }
}

class ArtistInvitesContainer extends Component {
  static propTypes = {
    artistInvites: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(loadArtistInvites())
  }

  render() {
    const { artistInvites } = this.props
    return artistInvites.map((ai) =>
      <ArtistInviteListItem
        key={'artist-invite:' + ai.get('id')}
        id={ai.get('id')}
        title={ai.get('title')}
        type={ai.get('inviteType')}
      />
    ).toArray()
  }
}

export default connect(mapStateToProps)(ArtistInvitesContainer)
