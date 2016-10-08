import React from 'react'
import { Match } from 'react-router'

import Auth from './auth/Auth'
import Contacts from './contacts/Contacts'
import Home from './Home'
import Navigation from './Navigation'
import Settings from './Settings'

class App extends React.Component {
  render() {
    const { router } = this.props

    return (
      <div className="App">
        <Navigation />

        <Match exactly pattern="/" component={Home} />

        <Match pattern="/auth" render={({ pathname, location }) => (
          <Auth pathname={pathname} location={location} router={router} />
        )}/>

        <Match pattern="/contacts" render={({ pathname }) => (
          <Contacts pathname={pathname} />
        )}/>

        <Match exactly pattern="/settings" component={Settings} />
      </div>
    )
  }
}

export default App
