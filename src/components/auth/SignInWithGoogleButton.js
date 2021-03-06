import React from 'react'

class SignInWithGoogleButton extends React.Component {
  state = { uri: null }

  getOAuthLink = () => fetch(`${localStorage.apiEndpoint}/auth`).then(res => res.json())

  componentDidMount() {
    this.getOAuthLink().then(json => {
      if (json.ok && json.uri) {
        setTimeout(() => {
          this.setState({ uri: json.uri })
        }, 0)
      }
    })
  }

  render() {
    const { uri } = this.state

    return (
      uri ? (
        <a className="Button Button--success" href={uri} alt="Sign in with Google">
          Sign in
        </a>
      ) : (
        <p>Loading...</p>
      )
    )
  }
}

export default SignInWithGoogleButton
