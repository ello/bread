import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { colors } from '../constants/styled/colors'
import { media, contentAlign, toRGB } from '../constants/styled/mixins'

import ArtistInviteCard from '../components/ArtistInviteCard'

const StyledLink = styled(Link)`
  display: block;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    .artist-invite-card {
      .cover {
        background-color: rgba(${toRGB(colors.black)}, 0.8);
      }
    }
  }
`

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
      <StyledLink to={`/artist-invites/${id}`}>
        <ArtistInviteCard
          imgSrc={headerImage.getIn(['optimized', 'url'])}
          title={title}
          type={type}
        />
      </StyledLink>
    )
  }
}
