import React from 'react'
import { Link, Match, Miss } from 'react-router'

import Contact from './Contact'
import ContactForm from './ContactForm.js'
import Sidebar from './Sidebar'
import SubApp from '../SubApp'

import './Contacts.css'

class Contacts extends React.Component {
  state = { contacts: [], loading: true, currentContact: null }

  saveContact = (contact) => {
    this.setState({ saving: true })
    this.props.saveContact(contact).then(() => {
      setTimeout(() => {
        this.setState({ saving: false })
        this.props.router.transitionTo('/contacts')
        this.loadContacts()
      }, 500)
    }, err => {
      this.setState({ error: err.message, saving: false })
    })
  }

  deleteContact = (uri, etag) => {
    this.setState({ saving: true })
    const { deleteContact, router } = this.props
    deleteContact(uri, etag).then(() => {
      setTimeout(() => {
        this.setState({ saving: false })
        router.transitionTo('/contacts')
        this.loadContacts()
      }, 500) // Allow API to update
    })
  }

  loadContacts = () => {
    this.setState({ loading: true, saving: false })
    this.props.getContacts().then(json => {
      if (json.contacts) {
        // fake slow connection
        setTimeout(() => {
          this.setState({ loading: false })
          this.setState({ contacts: json.contacts })
        }, 500)
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
                <Match pattern={`${pathname}/new`} render={() => (
                  <ContactForm saveContact={this.saveContact} />
                )} />

                <Miss render={() => (
                  <Contact contact={this.state.contacts.filter(contact => (
                    contact.id.endsWith(id)
                  ))[0]} deleteContact={this.deleteContact} />
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

