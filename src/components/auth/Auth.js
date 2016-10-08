import React from 'react'
import { Match } from 'react-router'

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

  componentWillReceiveProps(nextProps) {
    this.setState({ error: false })
    const { location: { query } } = nextProps
    if (query && query.code) {
      this.exchangeCodeForToken(query.code)
    }
  }

  exchangeCodeForToken = (code) => {
    this.getOAuthToken(code).then(json => {
      if (json.access_token) {
        const expires = new Date();
        expires.setSeconds(expires.getSeconds() + json.expires_in)
        localStorage.tokenExpiry = expires
        localStorage.refreshToken = json.refresh_token
        localStorage.access_token = json.access_token
        this.setState({ isAuthed: true })
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
    delete localStorage['access_token']
    delete localStorage['tokenExpiry']
    this.setState({ isAuthed: false })
    const { router } = this.props
    router.transitionTo('/auth')
  }

  render() {
    const { pathname } = this.props
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
            <Match exactly pattern={`${pathname}`} render={() => (
              <div>
                <h2>Authorization</h2>
                <p>Auth stuff goes here</p>
              </div>
            )} />

            <Match pattern={`${pathname}/in`} render={() => (
              <div>
                <h2>Sign in with Google</h2>
                <SignInWithGoogleButton />
              </div>
            )} />

            <Match pattern={`${pathname}/out`} render={() => (
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

export default Auth
