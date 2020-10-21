    // NPM
import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {GiFireAce} from 'react-icons/gi'

    // LOCAL
import {setPlayer} from '../../ducks/playerReducer'
import {setRules} from '../../ducks/rulesReducer'
import './Welcome.scss'

const Auth = (props) => {
    const {push} = props.history

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {    
        axios.post('/api/login', {email, username, password})        
            .then(player => {            
                props.setPlayer(player.data)
                console.log(player.data)
                
                if (player.statusText === 'Accepted') {
                    console.log(player.statusText, '++')
                    push('/dashboard')
                } else {
                    console.log(player.statusText, '--')
                    window.alert('Incorrect username or password')
                }
            })
            .catch(error => console.log(error))

        axios.get('/api/rules')
            .then(res => setRules(res.data))
            .catch(err => console.log(err))
    }

    const register = () => {        
        axios.post('/api/register', {email, username, password})
            .then(player => {
                props.setPlayer(player.data)
                console.log(player.data)
                
                if (player.statusText === 'Accepted') {
                    console.log(player.statusText, '++')
                    push('/profile')
                } else {
                    console.log(player.statusText, '--')
                    push('/dashboard')
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='auth-body' >
            <header className='auth-header'>
                <GiFireAce id='logo' />
                <div id='auth-title'>
                    <h1 id='title' > Lighthouse </h1>
                    <h2> poker lounge </h2>
                </div>
            </header>
            <div className='auth-input-parent'>
                <div className='auth-input-divider' >
                    <p> Email </p>
                    <input
                        id='auth-input'
                        placeholder='email'
                        value={email}
                        onChange={(evt) => setEmail(evt.target.value)} />
                </div>
                <div className='auth-input-divider' >
                    <p> Username </p>
                    <input
                        id='auth-input'
                        placeholder='username'
                        value={username}
                        onChange={(evt) => setUsername(evt.target.value)} />
                </div>
                <div className='auth-input-divider' >
                    <p> Password </p>
                    <input
                        id='auth-input'
                        placeholder='password'
                        value={password}
                        type='password'
                        onChange={(evt) => setPassword(evt.target.value)} />
                </div>
            </div>
            <div className='submit-btns-container' >
                <div id='auth-btn-parent' >
                    <p> Already have an account? </p>
                    <button
                        className='submit'
                        onClick={login}> Login </button>
                </div>
                <div id='auth-btn-parent' >
                    <p> Create account </p>
                    <button
                        className='submit'
                        onClick={register}> Register </button>
                </div>
            </div>            
        </div>
    )
}

export default connect(null, {setPlayer, setRules})(withRouter(Auth))