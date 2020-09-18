import React from 'react'
import {withRouter} from 'react-router-dom'
import './SubHeader.scss'
import {GoArrowRight} from 'react-icons/go'

const SubHeader = (props) => {
    const {push} = props.history

    const enterLounge = () => {
        push('/login')
    }
    
    return (
        <div className='sub-head-master' >
            <div id='nav-links' >
                <button
                    className='sub-btns'
                    > Home </button>
                <button
                    className='sub-btns'
                    > Download </button>
                <button
                    className='sub-btns'
                    > Special Offers </button>
                <button
                    className='sub-btns'
                    > How to Play </button>
                <button
                    className='sub-btns'
                    > Mobile </button>
                <button
                    className='sub-btns'
                    > Support </button>
                <button
                    className='sub-btns'
                    > About </button>
            </div>
            <div id='launch-link' >
                <button 
                    id='poker-btn'
                    className='sub-btns'
                    onClick={enterLounge} 
                    > Play Poker </button>
                <GoArrowRight id='goArrow' />
            </div>
        </div>
    )
}

export default withRouter(SubHeader)