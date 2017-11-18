import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import 'sanitize.css/sanitize.css'
import AuthContainer from './containers/AuthContainer';
import ArtistInvitesContainer from './containers/ArtistInvitesContainer'
import ArtistInviteDashboardContainer from './containers/ArtistInviteDashboardContainer'
import TopNav from './containers/TopNavContainer'
import { BASENAME } from './env'

import styled from 'styled-components'

// Form Styles --------------------------------
const AppInner = styled.div`
  position: relative;
`

class App extends Component {
  render() {
    return (
      <Router basename={BASENAME}>
        <AppInner>
          <TopNav />
          <AuthContainer>
            <Route exact path="/" render={() => <Redirect to="/artist-invites" />} />
            <Route exact path="/artist-invites" component={ArtistInvitesContainer} />
            <Route exact path="/artist-invites/:id" component={ArtistInviteDashboardContainer} />
          </AuthContainer>
        </AppInner>
      </Router>
    )
  }
}

export default App;
