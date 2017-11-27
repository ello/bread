import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import 'sanitize.css/sanitize.css'
import AuthContainer from './containers/AuthContainer';
import ArtistInvitesContainer from './containers/ArtistInvitesContainer'
import ArtistInviteDashboardContainer from './containers/ArtistInviteDashboardContainer'
import TopNav from './containers/TopNavContainer'
import { BASENAME } from './env'

class App extends Component {
  render() {
    return (
      <Router basename={BASENAME}>
        <div>
          <Helmet
            titleTemplate="%s | Manage | Ello | The Creators Network."
            defaultTitle="Manage | Ello | The Creators Network."
            meta={[
              { name: 'description', content: 'Welcome to the Creators Network. Ello is a community to discover, discuss, publish, share and promote the things you are passionate about.' },
            ]}
          />

          <TopNav />

          <Switch>
            <Redirect exact from="/" to="/artist-invites" />
            <AuthContainer>
              <Route exact path="/artist-invites" component={ArtistInvitesContainer} />
              <Route exact path="/artist-invites/:id" component={ArtistInviteDashboardContainer} />
            </AuthContainer>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
