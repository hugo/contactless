import React from 'react'

import ContactPreview from './ContactPreview'

import './Sidebar.css'

class Sidebar extends React.Component {
  render() {
    const { contacts = [], onDeleteContact, pathname } = this.props

    return (
      <div className="ContactsList">
        {contacts.map((contact, i) => (
          <ContactPreview
            key={i}
            pathname={pathname}
            contact={contact}
            onDeleteContact={onDeleteContact}
          />
        ))}
      </div>
    )
  }
}

export default Sidebar
