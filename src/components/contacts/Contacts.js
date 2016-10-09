import React from 'react'
import { Link, Match, Miss } from 'react-router'

import Contact from './Contact'
import Sidebar from './Sidebar'
import SubApp from '../SubApp'

import './Contacts.css'

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
    this.props.getContacts().then(json => {
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
          <div className="Contacts">
            <Match exactly pattern={`${pathname}`} render={() => (
              <div className="Contacts--Dashboard">
                <p>Select a contact to view their details.</p>
                <Link className="Button Button--success" to={`${pathname}/new`}>
                  Add contact
                </Link>
              </div>
            )} />

            <Match exactly pattern={`${pathname}/:id`} render={({ params: { id } }) => (
              <div className="Contacts--Section">
                <Match pattern={`${pathname}/new`} render={() => (<p>New</p>)} />

                <Miss render={() => (
                  <Contact contact={this.state.contacts.filter(contact => (
                    contact.id.endsWith(id)
                  ))[0]} />
                )} />
              </div>
             )} />
          </div>
        )}
        title="Contacts"
      />
    )
  }
}

export default Contacts
