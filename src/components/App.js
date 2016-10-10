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

const API_HOST = localStorage.apiEndpoint

import api from '../api.js'

const getContacts = api.getContacts(API_HOST, authService)
const saveContact = api.saveContact(API_HOST, authService)
const deleteContact = api.deleteContact(API_HOST, authService)

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
            <Contacts
              deleteContact={deleteContact}
              getContacts={getContacts}
              saveContact={saveContact}
              pathname={pathname}
              router={router}
            />
          </Authorized>
        )}/>

        <Match exactly pattern="/settings" component={Settings} />
      </div>
    )
  }
}

export default App

