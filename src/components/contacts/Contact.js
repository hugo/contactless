import React from 'react'

import './Contact.css'

const types = {
  "http://schemas.google.com/g/2005#home": "Home",
  "http://schemas.google.com/g/2005#work": "Work"
}

class PhoneNumbers extends React.Component {
  render() {
    const { phoneNumbers = [] } = this.props
    return (
      <div className="Contact--PhoneNumbers">
        {phoneNumbers.map((phoneNumber, i) => (
          <dl key={i} className="Contact--PhoneNumber">
            <pre>{JSON.stringify(phoneNumber, null, 2)}</pre>
            <dt></dt>
            <dd></dd>
          </dl>
        ))}
      </div>
    )
  }
}

class Emails extends React.Component {
  render() {
    const { emails = [] } = this.props
    return (
      <div className="Contact--Emails">
        {emails.map((email, i) => (
          <dl key={i} className="Contact--Email">
            <pre>{JSON.stringify(email, null, 2)}</pre>
            <dt></dt>
            <dd></dd>
          </dl>
        ))}
      </div>
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
    const { addresses = [] } = this.props
    return (
      <div className="Contact--Addresses">
        {addresses.map((address, i) => (
          <div key={i} className="Contact--Address">
            <div className="Contact--Address--Meta">
              {address.primary && <span className="Pill Pill--success">Primary</span>}
              {address.type && <span className="Pill Pill--primary">{types[address.type]}</span>}
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
    )
  }
}

class Contact extends React.Component {
  render() {
    const { contact } = this.props

    return (
      contact ? (
        <div className="Contact">
          <div className="Contact--Header">
            <h2 className="Contact--Name--FullName">{contact.name.fullName}</h2>
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
