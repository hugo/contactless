import React from 'react'

import './Authorized.css'

class Authorized extends React.Component {
  state =  { isAuthed: false }

  signIn = () => {
    const { authService } = this.props
    authService.signOut().then(() => {
       this.setState({ isAuthed: true })
    }, (err) => {
      this.setState({ isAuthed: false, error: err.message })
    })
  }

  signOut = () => {
    const { authService } = this.props
    authService.signOut().then(() => {
      this.setState({ isAuthed: false })
    }, (err) => { 
      this.setState({ isAuthed: false, error: err.message })
    })
  }


  // React lifecycle methods

  componentDidMount() {
    const { authService } = this.props
    this.setState({ isAuthed: authService.isAuthed() })
    this.unsubscribe = authService.subscribe((msg) => {
      console.log(msg)
      this.setState({ isAuthed: msg.isAuthed || false }) 
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { children  } = this.props
    const { isAuthed } = this.state
    return (
      isAuthed ? (
        children
      ) : (
        <div className="Authorized Authorized--unauthorized">
          <div>
            <h2 className="Authorized--Unauthorized--Title">
              I'm sorry, Dave. I'm afraid I can't do that 
            </h2>
            <p className="Authorized--Unauthorized--Title">
              You must sign in to see this page
            </p>
          </div>
        </div>
      )
    )
  }
}

export default Authorized
