import React from 'react'
import { Link } from 'react-router-dom'

class SignInOrOutLink extends React.Component {
  render() {
    const { authed, inText, inTo, outText, outTo, ...rest } = this.props

    return (
      <Link to={authed ? outTo : inTo} {...rest} >
        {authed ? outText : inText}
      </Link>
    )
  }
}

export default SignInOrOutLink
