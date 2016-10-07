import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router'

import App from './components/App'

import './index.css'

ReactDOM.render(
  <Router>
    {({ location, router }) => (
      <App location={location} router={router} />
    )}
  </Router>,
  document.getElementById('root')
)
