import React from 'react'

import './ContactForm.css'

// const typesBySchema = {
//   "http://schemas.google.com/g/2005#home": "Home",
//   "http://schemas.google.com/g/2005#work": "Work"
// }



class Contact {
  static defaultProps = {
    id: null,
    eTag: null,
    givenName: '',
    familyName: '',
    emails: []
  }

  constructor(props) {
    this.props = {
      ...Contact.defaultProps,
      ...props
    }
  }

  toJSON() {
    return JSON.stringify({
      id: this.props.id,
      eTag: this.props.eTag,
      name: {
        givenName: this.props.givenName,
        familyName: this.props.familyName,
        fullName:  `${this.props.givenName} ${this.props.familyName}`,
      },
      emails: this.props.emails
    })
  }
}

class Input extends React.Component {
  handleChange = (evt) => {
    evt.preventDefault()
    const { field } = this.props
    this.props.didChange(field, evt.target.value)
  }

  render() {
    const { label, value } = this.props
    return (
      <div className="ContactForm--Field">
        <label className="ContactForm--Field--Label">{label}
          <input
            className="ContactForm--Field--Input"
            type="text"
            onChange={this.handleChange}
            value={value}
          />
        </label>
      </div>
    )
  }
}

class ContactForm extends React.Component {
  state = { contact: new Contact() }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.setState({ saving: true })
    this.props.saveContact(this.state.contact)
    this.setState({ saving: false, contact: new Contact() })
  }

  handleChange = (field, value) => {
    const { contact } = this.state
    contact.props[field] = value
    this.setState({ contact })
  }

  // React lifecycle methods
  componentDidMount() {
    if (this.props.contact) {
      this.setState({ contact: this.props.contact })
    }
  }

  updateEmailAddress = (i, evt) => {
    evt.preventDefault()
    const { contact } = this.state
    contact.props.emails[i].email = evt.target.value
    this.setState({ contact })
  }

  addEmail = () => {
    const { contact } = this.state
    const emails = contact.props.emails.slice()
    emails.push({
      email: '',
      type: 'http://schemas.google.com/g/2005#home'
    })
    contact.props.emails = emails
    this.setState({ contact })
  }

  removeEmail = (i)  => {
    const { contact } = this.state
    contact.props.emails.splice(i, 1)
    this.setState({ contact })
  }

  render() {
    const { contact } = this.state
    return (
      <div className="ContactForm">
        {contact ? (
          <form className="ContactForm--Form" onSubmit={this.handleSubmit}>
            <Input
              label="Given name"
              field="givenName"
              didChange={this.handleChange}
              value={contact.props.givenName}
            />
          
            <Input
              label="Family name"
              field="familyName"
              didChange={this.handleChange}
              value={contact.props.familyName}
            />

            <div>
              {contact.props.emails.map((email, i) => (
                <div key={i} className="ContactForm--Field">
                  <label className="ContactForm--Field--Label">Email address
                    <button
                      className="Button Button--small Button--danger"
                      onClick={this.removeEmail.bind(this, i)}
                      type="button"
                    >Remove</button>
                    <input
                      className="ContactForm--Field--Input"
                      type="email"
                      onChange={this.updateEmailAddress.bind(this, i)}
                      value={email.email}
                    />
                  </label>
                </div>
              ))}
            </div>

            <div>
              <button
                className="Button Button--small Button--primary"
                type="button"
                onClick={this.addEmail}
              >Add email</button>
            </div>
          
            <div className="ContactForm--Controls">
              <button className="Button Button--success" type="submit">Save</button>
            </div>
          </form>
        ) : (
          null
        )}
      </div>
    )
  }
}

export default ContactForm

