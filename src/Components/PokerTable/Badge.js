import React from 'react'
import chips from '../../assets/badges/chips.png'
import pair from '../../assets/badges/pair.png'
import icon from '../../assets/badges/badge-icon.png'
import './Badge.scss'
import {connect} from 'react-redux'

const Badge = (props) => {
  return (
    <div className='badge-master' >
      <div>
        <p> Badges for </p>
        <h3> {`${props.user.player.username}`} </h3>
      </div>
      <img className='icons' src={chips} alt=''  />
      <img className='icons' src={pair} alt=''  />
      <img className='icons' src={icon} alt=''  />
    </div>
  )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Badge)