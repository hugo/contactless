import React from 'react'
import { Link } from 'react-router'

import SignInOrOutLink from './auth/SignInOrOutLink'

import './Navigation.css'

class Navigation extends React.Component {
  render() {
    return (
      <div className="Navigation">
        <nav className="Navigation--Links">
          <Link className="Navigation--Link" to="/">Home</Link>
          <Link className="Navigation--Link" to="/contacts">Contacts</Link>
          <Link className="Navigation--Link" to="/settings">Settings</Link>
          <SignInOrOutLink
            authed={this.props.authed}
            className="Navigation--Link"
            inText="Sign in"
            inTo="/auth/in"
            outText="Sign out"
            outTo="/auth/out"
          />
        </nav>
      </div>
    )
  }
}

export default Navigation
