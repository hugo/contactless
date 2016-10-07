import React from 'react'

class Contact {
  constructor(props = {}) {
    this.id = props.id || null
    this.eTag = props.eTag || null
    this.givenName = props.givenName || ''
    this.familyName = props.familyName || ''
  }

  toJSON() {
    return JSON.stringify({
      id: this.id,
      eTag: this.eTag,
      name: {
        givenName: this.givenName,
        familyName: this.familyName,
        fullName:  `${this.givenName} ${this.familyName}`,
        displayName: `${this.givenName} ${this.familyName}`
      }
    })
  }

  update(field, value) {
    this[field] = value
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
      <div>
        <label>{label}
          <input
            type="text"
            value={value}
            onChange={this.handleChange}
          />
        </label>
      </div>
    )
  }
}

class ContactForm extends React.Component {
  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.saveContact()
  }

  handleChange = (field, value) => {
    this.props.onChangeField(field, value)
  }

  render() {
    const {
      contact: { givenName, familyName }
    } = this.props

    return (
      <form onSubmit={this.handleSubmit}>

        <Input
          label="Given name"
          field="givenName"
          didChange={this.handleChange}
          value={givenName}
        />

        <Input
          label="Family name"
          field="familyName"
          didChange={this.handleChange}
          value={familyName}
        />

        <button type="submit">Save</button>
      </form>
    )
  }
}

class New extends React.Component {
  state = { saving: false, contact: new Contact() }

  saveContact = () => {
    this.setState({ saving: true })
    const { contact } = this.state
    fetch(`${localStorage.apiEndpoint}/contacts/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage['access_token']}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: contact.toJSON()
    }).then(res => res.json())
    .then(() => {
      this.setState({ saving: false, contact: new Contact() })
    })
  }

  onChangeField = (field, value) => {
    const { contact } = this.state
    contact.update(field, value)
    this.setState({ contact })
  }

  render() {
    return (
      this.state.saving ? (
        <div>
          <h5>Saving</h5>
          <p>Saving, please wait...</p>
        </div>
      ) : (
        <div>
          <h5>New contact</h5>
          <p>New contact form</p>

          <ContactForm
            contact={this.state.contact}
            onAddContact={this.onAddContact}
            onChangeField={this.onChangeField}
            saveContact={this.saveContact}
          />
        </div>
      )
    )
  }
}

export default New
