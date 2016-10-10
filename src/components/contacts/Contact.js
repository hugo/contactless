import React from 'react'

import './Contact.css'

const types = {
  "http://schemas.google.com/g/2005#home": "Home",
  "http://schemas.google.com/g/2005#work": "Work"
}

class PhoneNumbers extends React.Component {
  render() {
    const { phoneNumbers } = this.props
    return (
      phoneNumbers && phoneNumbers.length ? (
        <div className="Contact--PhoneNumbers">
          {phoneNumbers.map((phoneNumber, i) => (
            <div key={i} className="Contact--PhoneNumber">
            <div key={i} className="Contact--Email">
              <Pill text={types[phoneNumber.type]} classType="primary" />
              <p>{phoneNumber.number}</p> 
            </div>
          </div>
          ))}
        </div>
      ) : (
        null
      )
    )
  }
}

class Emails extends React.Component {
  render() {
    const { emails } = this.props
    return (
      emails && emails.length ? (
        <div className="Contact--Emails">
          {emails.map((email, i) => (
            <div key={i} className="Contact--Email">
              <Pill text={types[email.type]} classType="primary" />
              <p>{email.email}</p> 
            </div>
          ))}
        </div>
      ) : (
        null
      )
    )
  }
}

class Pill extends React.Component {
  render() {
    const { classType, text } = this.props
    return (
      <span className={`Pill Pill--${classType}`}>{text}</span>
    )
  }
}

class AddressPart extends React.Component {
  render() {
    const { part } = this.props
    return (
      part ? (
        <div className="Contact--AddressPart">
          {part}
        </div>
      ) : (
        null
      )
    )
  }
}

class Addresses extends React.Component {
  render() {
    const { addresses } = this.props
    return (
      addresses && addresses.length ? (
        <div className="Contact--Addresses">
          {addresses.map((address, i) => (
            <div key={i} className="Contact--Address">
              <div className="Contact--Address--Meta">
                {address.primary &&
                  <Pill text="Primary" classType="success" />
                } 
                <Pill text={types[address.type]} classType="primary" />
              </div>
              <div className="Contact--Address--Parts">
                <AddressPart part={address.street} />
                <AddressPart part={address.city} />
                <AddressPart part={address.region} />
                <AddressPart part={address.postcode} />
                <AddressPart part={address.country} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        null
      )
    )
  }
}

class Contact extends React.Component {
  deleteContact = () => {
    const { contact, deleteContact } = this.props
    deleteContact(contact.id, contact.etag)
  }

  render() {
    const { contact } = this.props

    return (
      contact ? (
        <div className="Contact">
          <div className="Contact--Header">
            <h2 className="Contact--Name--FullName">{contact.name.fullName}</h2>
            <div className="Contact--Controls">
              <button
                className="Button Button--small Button--danger"
                type="button"
                onClick={this.deleteContact} 
              >Delete</button>
            </div>
          </div>
          <div className="Contact--Details">
            <PhoneNumbers phoneNumbers={contact.phoneNumbers} />
            <Emails emails={contact.emails} />
            <Addresses addresses={contact.addresses} />
          </div>
        </div>
      ) : (
        <div className="Contact">
          <h5>No contact found</h5>
          <p>No contact was found with that ID</p>
        </div>
      )
    )
  }
}

export default Contact
