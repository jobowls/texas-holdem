import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Poker from './Components/PokerTable/Gameplay/Poker'
import Dashboard from './Components/Dash/Dashboard'
import Welcome from './Components/Home/Welcome'
import Main from './Components/Home/Main'

export default (
    <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Welcome} />
        <Route path='/game' component={Poker} />
        <Route path='/dashboard' component={Dashboard} />
    </Switch>
)