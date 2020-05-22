import React from 'react'
import { Route, withRouter } from 'react-router-dom'

import SignInWithGoogleButton from './SignInWithGoogleButton'

import './Auth.css'

class Auth extends React.Component {
  state = { error: null, isAuthed: false }

  componentDidMount() {
    const { location: { query } } = this.props
    if (query && query.code) {
      this.exchangeCodeForToken(query.code)
    }
  }

  exchangeCodeForToken = (code) => {
    this.getOAuthToken(code).then(json => {
      if (json.access_token) {
        this.props.authService.signIn(json)
        this.props.router.transitionTo('/auth')
      } else {
        this.setState({ error: 'Google OAuth failed, sorry'})
      }
    }).catch(err => {
      this.setState({ error: 'Google OAuth failed, sorry'})
    })
  }

  getOAuthToken = (code) => {
    return fetch(`${localStorage.apiEndpoint}/auth/token`, {
      method: 'POST',
      body: JSON.stringify({ code }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        return Promise.reject()
      }
    })
  }

  signOut = (evt) => {
    evt.preventDefault()
    this.props.authService.signOut().then(() => {
      this.setState({ isAuthed: false })
      this.props.history.push('/auth')
    })
  }

  render() {
    const { error } = this.state

    return (
      <div className="Auth">
        {error ? (
          <div>
            <h5>Something went wrong</h5>
            <p>Sorry, an error occured. {error}</p>
          </div>
        ) : (
          <div className="Auth--Section">
            <Route exact path="/auth" render={() => (
              <div>
                <h2>Authorization</h2>
                <p>Auth stuff goes here</p>
              </div>
            )} />

            <Route path="/auth/in" render={() => (
              <div>
                <h2>Sign in with Google</h2>
                <SignInWithGoogleButton />
              </div>
            )} />

            <Route path="/auth/out" render={() => (
              <div>
                <h2>Sign out</h2>
                <button
                  type="button"
                  className="Button Button--danger"
                  onClick={this.signOut}
                >
                  Sign out
                </button>
              </div>
            )} />
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Auth)
