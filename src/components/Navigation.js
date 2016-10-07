import React from 'react'
import { Link } from 'react-router'

import './Navigation.css'

class Navigation extends React.Component {
  render() {
    return (
      <div className="Navigation">
        <nav className="Navigation--Links">
          <Link className="Navigation--Link" to="/">Home</Link>
          <Link className="Navigation--Link" to="/contacts">Contacts</Link>
          <Link className="Navigation--Link" to="/settings">Settings</Link>
          {localStorage.access_token ? (
            <Link className="Navigation--Link" to="/auth/out">Sign out</Link>
          ) : (
            <Link className="Navigation--Link" to="/auth/in">Sign in</Link>
          )}
        </nav>
      </div>
    )
  }
}

export default Navigation
