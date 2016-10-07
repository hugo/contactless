import React from 'react'
import { Match } from 'react-router'

import Contact from './Contact'
import Sidebar from './Sidebar'
import SubApp from '../SubApp'

const getContacts = () => fetch(`${localStorage.apiEndpoint}/contacts`, {
  headers: {
    'Authorization': `Bearer ${localStorage.access_token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}).then(res => res.json())

const addContact = (contact) => fetch(`${localStorage.apiEndpoint}contacts/add`, {
  headers: {
    'Authorization': `Bearer ${localStorage.access_token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(contact),
}) //.then(res => res.json())

class Contacts extends React.Component {
  state = { contacts: [], loading: true, currentContact: null }

  addContact = () => {
    this.setState({ saving: true })
    addContact({}).then(() => {
      setTimeout(() => {
        this.loadContacts()
      }, 0) // Allow API to update
    })
  }

  onDeleteContact = () => {
    this.setState({ saving: true })
    setTimeout(() => {
      this.loadContacts()
    }, 0) // Allow API to update
  }

  loadContacts = () => {
    this.setState({ loading: true, saving: false })
    getContacts().then(json => {
      if (json.contacts) {
        // fake slow connection
        setTimeout(() => {
          this.setState({ loading: false })
          this.setState({ contacts: json.contacts })
        }, 0)
      } else {
        console.log('Failed to load contacts')
      }
    })
  }

  componentDidMount() {
    this.loadContacts()
  }

  render() {
    const { pathname } = this.props

    return (
      <SubApp
        sidebar={() => (
          <Sidebar
            contacts={this.state.contacts}
            pathname={pathname}
          />
        )}
        subapp={() => (
          <Match pattern={`${pathname}/:id`} render={({ params: { id } }) => (
            <Contact contact={this.state.contacts.filter(contact => (
              contact.id.endsWith(id)
            ))[0]} />
           )} />
        )}
        title="Contacts"
      />
    )
  }
}

export default Contacts
