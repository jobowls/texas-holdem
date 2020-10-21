    // NPM
import React from 'react'
import {connect} from 'react-redux'

    // LOCAL
import {setPlayer} from '../../ducks/playerReducer'
import './Header.scss'

const Header = (props) => {
    return (
        <div className='header-master'>
            <div className='head-blocks' >
                <div className='leaderboard-container' >
                    <div className='leaderboard' >
                        <button
                            id='head-btn'
                            onClick={props.toggler}
                            > List of Poker Hands </button>
                    </div>
                </div>
            </div>
            <div className='head-blocks' >
                <h3 id='title-block' > Bankroll </h3>
                <p id='bankroll'> ${props.user.player.cash || '0.00'} </p>
            </div>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {setPlayer})(Header)