import React from 'react'
import { Link } from 'react-router'

class SignInOrOutLink extends React.Component {
  state = { isSignedIn: false }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.setState({ isSignedIn: this.isSignedIn() })
    }, 500)
  }

  componentWillUnmout() {
    clearInterval(this._interval)
  }

  isSignedIn = () => {
    const timestamp = Date.parse(localStorage.tokenExpiry)
    if (isNaN(timestamp)) {
      return false
    }
    const expires = new Date(timestamp)
    return !!localStorage.access_token && expires > new Date()
  }

  render() {
    const { inText, inTo, outText, outTo, ...rest } = this.props

    return (
      <Link to={this.state.isSignedIn ? outTo : inTo} {...rest} >
        {this.state.isSignedIn ? outText : inText}
      </Link>
    )
  }
}

export default SignInOrOutLink
