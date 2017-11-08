import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { ff, fs } from '../constants/styled/font_stack'
import { colors } from '../constants/styled/colors'
import { media, contentAlign, toRGB } from '../constants/styled/mixins'

const propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
}

const defaultProps = {
  imgSrc: null,
  title: null,
  type: null,
}

const CardHolder = styled.span`
  display: block;
  position: relative;
  padding-bottom: 200px;
  margin: 0 auto;
  width: 100%;
  max-width: 1360px;
  background-image: url(${(props) => props.imgSrc});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  ${media.max640`padding-bottom: 150px;`}

  .cover {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(${toRGB(colors.black)}, 0.6);
    z-index: 1;
  }
`

const ContentHolder = styled.span`
  display: block;
  position: absolute;
  padding: 0 60px 0 60px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  ${media.max960`padding: 0 30px 0 30px;`}
  ${media.max640`padding: 0 20px 0 20px;`}

  .inner {
    display: inline-block;
    position: relative;
    ${contentAlign.vertical}

    h1, p {
      margin: 0;
      ${fs.h3.size}
      ${media.max640`${fs.h4.size}`}
    }

    h1 {
      ${ff.black.full}
    }

    p {
      ${ff.light.full}
      color: ${colors.mediumGrey};
    }
  }
`

const ArtistInviteCard = ({ imgSrc, title, type }) => (
  <CardHolder imgSrc={imgSrc} className="artist-invite-card">
    <ContentHolder>
      <span className="inner">
        <h1>{title}</h1>
        <p>{type}</p>
      </span>
    </ContentHolder>
    <span className="cover"></span>
  </CardHolder>
)

ArtistInviteCard.propTypes = propTypes
ArtistInviteCard.defaultProps = defaultProps

export default ArtistInviteCard
