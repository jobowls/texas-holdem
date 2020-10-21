  // NPM
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker'

  // LOCAL
import store from './ducks/store'
import App from './App'
import './index.css'

ReactDOM.render(
  <HashRouter>
    <Provider store={store} >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </HashRouter>, document.getElementById('root')
)
// serviceWorker.register()
serviceWorker.unregister()