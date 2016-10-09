class AuthService {
  constructor() {
    this.subscriptions = []
    this.loadAuth()
  }

  broadcast(msg) {
    this.subscriptions.forEach((fn) => fn(msg))
  }

  loadAuth() {
    const authData = localStorage.authData
    if (!authData) {
      return
    }
    try {
      const oAuth = JSON.parse(authData)
      this.access_token = oAuth.access_token
      this.refresh_token = oAuth.refresh_token
      const timestamp = Date.parse(oAuth.expires)
      if (!isNaN(timestamp)) {
        this.expires = new Date(timestamp)
      }
    } catch (e) {
      console.log(e)
      // JSON parsig failed 
    }
  }

  getToken() {
    return this.access_token
  }

  isAuthed() {
    return (
      !!this.access_token && this.expires > new Date()
    )
  }

  subscribe(fn) {
    this.subscriptions.push(fn)
    return () => {
       const i = this.subscriptions.indexOf(fn)
       if (i !== -1) {
         this.subscriptions.splice(i, 1)
       }
    }
  }

  signIn(oAuth) {
    var expires = new Date()
    expires.setSeconds(expires.getSeconds() + oAuth.expires_in)
    localStorage.authData = JSON.stringify({
      access_token: oAuth.access_token,
      refresh_token: oAuth.refresh_token,
      expires
    })
    this.access_token = oAuth.access_token
    this.refresh_token = oAuth.refresh_token
    this.expires = expires
    this.broadcast({ isAuthed: this.isAuthed() })
    return Promise.resolve()
  }

  signOut() {
    delete localStorage.authData
    this.access_token = null
    this.refresh_token = null
    this.expires = new Date()
    this.broadcast({ isAuthed: false })
    return Promise.resolve()
  }
}

export default AuthService
