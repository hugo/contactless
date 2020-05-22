import React from 'react'
import { Route } from 'react-router-dom'

import Auth from './auth/Auth'
import Contacts from './contacts/Contacts'
import Home from './Home'
import Navigation from './Navigation'
import Settings from './Settings'

import AuthService from '../auth.js'
import Authorized from './auth/Authorized.js'

import api from '../api.js'

const authService = new AuthService();

const API_HOST = localStorage.apiEndpoint

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
    return (
      <div className="App">
        <Navigation authed={this.state.isAuthed} />

        <Route exact path="/" component={Home} />

        <Route path="/auth" render={() => (
          <Auth authService={authService} />
        )}/>

        <Route path="/contacts" render={() => (
          <Authorized authService={authService}>
            <Contacts
              deleteContact={deleteContact}
              getContacts={getContacts}
              saveContact={saveContact}
            />
          </Authorized>
        )}/>

        <Route exact path="/settings" component={Settings} />
      </div>
    )
  }
}

export default App

