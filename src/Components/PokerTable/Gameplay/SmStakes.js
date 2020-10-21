    // NPM
import React from 'react'
import {connect} from 'react-redux'

    // LOCAL
import {GoPrimitiveDot} from 'react-icons/go'

const Button = (props) => {
    return (
        <div id='dealer-btn' style={{color: 'silver'}} >
            <GoPrimitiveDot id='fancy-Btn' /> 
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Button)