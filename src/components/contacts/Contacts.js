import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'

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
    return (
      <SubApp
        sidebar={() => (
          <Sidebar
            contacts={this.state.contacts}
          />
        )}
        subapp={() => (
          <div className="Contacts">
            <Switch>
              <Route exact path="/contacts" render={() => (
                <div className="Contacts--Dashboard">
                  <p>Select a contact to view their details.</p>
                  <Link className="Button Button--success" to={`/contacts/new`}>
                    Add contact
                  </Link>
                </div>
              )} />

              <Route path={`/contacts/new`} render={() => (
                <ContactForm saveContact={this.saveContact} />
              )} />

              <Route exact path={`/contacts/:id`} render={({ match: {params: { id } } }) => (
                <div className="Contacts--Section">
                  <Contact contact={this.state.contacts.filter(contact => (
                        contact.id.endsWith(id)
                    ))[0]}
                    deleteContact={this.deleteContact}
                  />
                </div>
              )} />
            </Switch>
          </div>
        )}
        title="Contacts"
      />
    )
  }
}

export default Contacts

