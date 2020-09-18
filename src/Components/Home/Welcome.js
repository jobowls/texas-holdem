import React from 'react'
import Auth from './Auth'
import './Welcome.scss'

const Welcome = (props) => {
    return (
        <div className='Auth-container' >
            <Auth className='auth-master' />
        </div>
    )
}

export default Welcome