import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import './Dashboard.scss'
import {GiFireAce} from 'react-icons/gi'
import {setPlayer, setImage} from '../../ducks/playerReducer'
import axios from 'axios'

const Dashboard = (props) => {
    const {push} = props.history

    const [profile_pic, setPic] = useState('')
    const [toggle, setToggle] = useState(false)
    const [setUrl] = useState('')

    useEffect(() => {
        setPic(props.user.player.profile_pic)
    }, [props.user.player.profile_pic])

    const goBtn = ({value}) => {
        push(`/${value}`)
    }

    const toDash = () => {
        push('/dashboard')
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const updatePic = () => {
        const {account_id} = props.user.player

        axios.put(`/api/picture/${account_id}`, {profile_pic})
            .then(res => props.setImage(res.data))
            .catch(err => console.log(err))
        
            handleToggle()
    }

    const logout = () => {
        axios.get('/api/logout')
            .then(player => {
                props.setPlayer(player.data)
                push('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='Dashboard-master' >
            <div id='dash-header' >
                <div className='dash-banner' >
                        <div className='main-logo-container' >
                    <div className='main-logo' >
                            <GiFireAce 
                                id='h-logo'
                                onClick={toDash}  />
                            <h1 id='lighthouse'> Lighthouse </h1>
                            <p id='lighthouse' > Poker Lounge </p> 
                        </div>
                    </div>
                    <div className='btn-container' >
                    <button
                        id='dash-btn'
                        onChange={(evt) => setUrl(evt.target.value)}
                        value='game'
                        onClick={(evt) => goBtn(evt.target)} 
                        > Play Poker </button>
                    <button
                        id='dash-btn'
                        onClick={logout}
                        > Exit Lounge </button>                    
                    </div>       
                </div>
                <div id='dash-stats' >
                {
                        toggle === false ?
                        <div id='img-container' >
                            <h3> {props.user.player.username} </h3>
                            <img
                                id='profile-pic'
                                src={props.user.player.profile_pic}
                                alt=''
                                // onMouseOver={displayTip}
                                onClick={handleToggle}  />
                            <p> ${props.user.player.cash} </p>
                        </div>
                        :
                        <div>
                            <input 
                                id='pic-input'
                                placeholder='paste img url'
                                value={profile_pic}
                                onChange={(evt) => setPic(evt.target.value)} />
                            <button
                                id='save-btn'
                                onClick={updatePic} 
                                > Save </button>
                            <button
                                id='save-btn'
                                onClick={handleToggle} 
                                > Cancel </button>
                        </div>
                    }
                    {/* <h1> {props.user.player.username} </h1> */}
                    <h3> Rank: {props.user.player.rank} </h3>
                    <h3> W/L %: {props.user.player.win_loss} </h3>
                </div>
                {/* <div className='btn-container' >
                    <button
                        id='dash-btn'
                        onChange={(evt) => setUrl(evt.target.value)}
                        value='game'
                        onClick={(evt) => goBtn(evt.target)} 
                        > Play Poker </button>
                    <button
                        id='dash-btn'
                        onClick={logout}
                        > Exit Lounge </button>                    
                </div>                 */}
            </div>
            <div className='dash-container' >
                
            </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    setImage, 
    setPlayer
})(withRouter(Dashboard))