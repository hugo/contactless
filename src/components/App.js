import React from 'react'
import { Match } from 'react-router'

import Auth from './auth/Auth'
import Contacts from './contacts/Contacts'
import Home from './Home'
import Navigation from './Navigation'
import Settings from './Settings'

import AuthService from '../auth.js'
import Authorized from './auth/Authorized.js'

const authService = new AuthService();

const getContacts = () => fetch(`${localStorage.apiEndpoint}/contacts`, {
  headers: {
    'Authorization': `Bearer ${authService.getToken()}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}).then(res => res.json())

class App extends React.Component {
  state = { isAuthed: false }

  componentDidMount() {
    this.setState({ isAuthed: authService.isAuthed() })
    this.unsubscribe = authService.subscribe((msg) => {
      this.setState({ isAuthed: msg.isAuthed || false })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { router } = this.props

    return (
      <div className="App">
        <Navigation authed={this.state.isAuthed} />

        <Match exactly pattern="/" component={Home} />

        <Match pattern="/auth" render={({ pathname, location }) => (
          <Auth 
            authService={authService}
            pathname={pathname}
            location={location}
            router={router}
          />
        )}/>

        <Match pattern="/contacts" render={({ pathname }) => (
          <Authorized authService={authService}>
            <Contacts getContacts={getContacts} pathname={pathname} />
          </Authorized>
        )}/>

        <Match exactly pattern="/settings" component={Settings} />
      </div>
    )
  }
}

export default App

