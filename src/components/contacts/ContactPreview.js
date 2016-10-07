import React from 'react'
import { Link } from 'react-router'

import './ContactPreview.css'

// const deleteContact = (uri, etag) => fetch(`${localStorage.apiEndpoint}/contacts/delete`, {
//   headers: {
//     'Authorization': `Bearer ${localStorage.access_token}`,
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   method: 'DELETE',
//   body: JSON.stringify({ uri, etag })
// })

// deleteContact = () => {
//   const { id, etag, onDeleteContact } = this.props
//   deleteContact(id, etag).then(() => {
//     onDeleteContact()
//   })
// }

class ContactPreview extends React.Component {
  render() {
    const {
      pathname,
      contact: { id, name: { fullName } }
    } = this.props

    const segments = id.split('/')
    const to = `${pathname}/${segments[segments.length - 1]}`

    return (
      <Link className="ContactPreview" to={to}>
        <div className="ContactPreview--Details">
          <h3>{fullName}</h3>
        </div>
      </Link>
    )
  }
}

export default ContactPreview
