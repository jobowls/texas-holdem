  // NPM
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import routes from './routes'

  // LOCAL
import Welcome from './Components/Home/Welcome'
import Poker from './Components/PokerTable/Gameplay/Poker'
import './App.scss'


const App = (props) => {
  return (
    <div className="App">
      {
        props.location.pathname === '/' 
          ? <div> {routes} </div>
          : props.location.pathname === '/login' 
          ? <div> <Welcome  /> </div>
          // : props.location.pathname === '/game' && !props.user.player.username 
          // ? <div> <Welcome  /> </div>
          : props.location.pathname === '/game' && props.user.player.username 
          ? <div> <Poker /> </div>
          : props.location.pathname === '/game' 
          ? <div> <Poker  /> </div>
          : <div className='main-app' > {routes} </div>
      }
    </div>
  )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(withRouter(App))