import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadArtistInvites } from '../actions/artist_invites'
import { selectArtistInvites } from '../selectors/artist_invites'
import { Helmet } from 'react-helmet'

import styled from 'styled-components'
import { media } from '../constants/styled/mixins'

import MessageTakeover from '../components/MessageTakeover'
import ArtistInviteListItem from '../components/ArtistInviteListItem'

const ArtistInvitesList = styled.section`
  padding: 0 40px 100px 40px;
  ${media.max1360`padding: 0 20px 80px 20px;`}
  ${media.max640`padding: 0 10px 40px 10px;`}
`

function mapStateToProps(state, props) {
  return {
    artistInvites: selectArtistInvites(state, props)
  }
}

const renderArtistInvites = ({ artistInvites }) => (
  <div>
    {artistInvites.map((ai) =>
      <ArtistInviteListItem
        key={'artist-invite:' + ai.get('id')}
        id={ai.get('id')}
        title={ai.get('title')}
        type={ai.get('inviteType')}
        headerImage={ai.get('headerImage')}
      />
    ).toArray()}
  </div>
)

const renderEmpty = () => (
  <div>
    <MessageTakeover
      messageText="No Dashboards available."
      linkText="Back to Ello"
      linkPath="/"
    />
  </div>
)

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
    return (
      <ArtistInvitesList>
        <Helmet title="Artist Invites" />
        {(artistInvites && (Object.keys(artistInvites).length > 0)) ? renderArtistInvites({ artistInvites }) : renderEmpty()}
      </ArtistInvitesList>
    )
  }
}

export default connect(mapStateToProps)(ArtistInvitesContainer)
