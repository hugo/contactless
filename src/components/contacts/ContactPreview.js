import React from 'react'
import { Link } from 'react-router'

import './ContactPreview.css'

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
