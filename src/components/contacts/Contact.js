import React from 'react'

import './Contact.css'

class Contact extends React.Component {
  render() {
    const { contact } = this.props

    return (
      contact ? (
        <div className="Contact">
          <div className="Contact--Header">
            <h2 className="Contact--Name--FullName">{contact.name.fullName}</h2>
          </div>
        </div>
      ) : (
        <div>
          <h5>No contact selected</h5>
          <p>Select a contact to view details</p>
        </div>
      )
    )
  }
}

export default Contact
