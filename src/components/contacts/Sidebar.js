import React from 'react'

import ContactPreview from './ContactPreview'

import './Sidebar.css'

class Sidebar extends React.Component {
  render() {
    const { contacts = [], onDeleteContact } = this.props

    return (
      <div className="ContactsList">
        {contacts.map((contact, i) => (
          <ContactPreview
            key={i}
            contact={contact}
            onDeleteContact={onDeleteContact}
          />
        ))}
      </div>
    )
  }
}

export default Sidebar
