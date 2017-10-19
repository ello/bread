import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import ArtistInvitesContainer from './containers/ArtistInvitesContainer'
import ArtistInviteDashboardContainer from './containers/ArtistInviteDashboardContainer'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="todo-real-nav">
            <h1>🍞</h1>
          </div>
          <Route exact path="/" render={() => <Redirect to="/artist-invites" />} />
          <Route exact path="/artist-invites" component={ArtistInvitesContainer} />
          <Route exact path="/artist-invites/:id" component={ArtistInviteDashboardContainer} />
        </div>
      </Router>
    )
  }
}

export default App;
