import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class ArtistInviteListItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    headerImage: PropTypes.object.isRequired,
  }

  render() {
    const { title, type, id, headerImage } = this.props
    return (
      <Link to={`/artist-invites/${id}`}>
        <div className="ArtistInviteListItem">
          <img src={headerImage.getIn(['optimized', 'url'])} height="100" alt ="" />
          <h1>{title}</h1>
          <p>{type}</p>
        </div>
      </Link>
    )
  }
}
