import React from 'react'
import { Link } from 'react-router-dom'

import './ContactPreview.css'

class ContactPreview extends React.Component {
  render() {
    const {
      contact: { id, name: { fullName } }
    } = this.props

    const segments = id.split('/')
    const to = `/contacts/${segments[segments.length - 1]}`

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
