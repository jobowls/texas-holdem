import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {GiFireAce} from 'react-icons/gi'
import {setPlayer} from '../../ducks/playerReducer'
import {withRouter} from 'react-router-dom'
import './Welcome.scss'
import {setRules} from '../../ducks/rulesReducer'

const Auth = (props) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
        const {push} = props.history
        // user clicks 'login'
        // server call sending input data
        axios.post('/api/login', {email, username, password})
        // then stringing on fn()
        .then(player => {
            console.log(player.data, 'AUTH')
            console.log(player.headers.date)
            // once auth is verified, reduxState is updated HERE
            props.setPlayer(player.data)
            // props.setBankroll(player.data)
            
            if (player.statusText === 'Accepted') {
                console.log(player.statusText, '++')
                push('/dashboard')
            } else {
                console.log(player.statusText, '--')
                window.alert('Incorrect username or password')
            };
        }).catch(error => console.log(error))

        axios.get('/api/rules')
        .then(res => setRules(res.data))
        .catch(err => console.log(err))
    }

    const register = () => {
        const {push} = props.history

        axios.post('/api/register', {email, username, password})
        .then(player => {
            props.setPlayer(player.data)
            // props.setBankRoll(player.data)
            console.log(player.data)

            if (player.statusText === 'Accepted') {
                console.log(player.statusText, '++')
                push('/profile')
            } else {
                console.log(player.statusText, '--')
                push('/dashboard')
            }
        }).catch(error => console.log(error))
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
            {/* <form 
                className='form'
                onSubmit={login} >
                {error && <p> {error} </p>}
                <div className='auth-input-divider'   >
                    <p> Email </p>
                    <input
                        id='auth-input'
                        placeholder='email'
                        value={email}
                        onChange={(evt) => setEmail(evt.currentTarget.value)} />
                </div>
                <div className='auth-input-divider' >
                    <p> Username </p>
                    <input
                        id='auth-input'
                        placeholder='username'
                        value={username}
                        onChange={(evt) => setUsername(evt.currentTarget.value)} />
                </div>
                <div className='auth-input-divider' >
                    <p> Password </p>
                    <input
                        id='auth-input'
                        type='password'
                        placeholder='password'
                        autoComplete='new-password'
                        value={password}
                        onChange={(evt) => setPassword(evt.currentTarget.value)} />
                </div>
                <div className='submit-btns-container' >
                    <div id='auth-btn-parent' >
                        <p> Already have an account? </p>
                        <button
                            className='submit'
                            type='submit'
                            disabled={props.isLoading}
                            onClick={props.submit}> Login </button>
                    </div>
                    <div id='auth-btn-parent' >
                        <p> Create account </p>
                        <button
                            className='submit'
                            type='submit'
                            disabled={props.isLoading}
                            onClick={props.submit}> Register </button>
                    </div>
                </div>
            </form> */}
        </div>
    )
}

export default connect(null, {setPlayer, setRules})(withRouter(Auth))