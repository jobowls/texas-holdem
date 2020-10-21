    // NPM
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

const TheSlot = (props) => {
    const [state, setState] = useState('')
    const [rules, setRules] = useState([])

    useEffect(() => {
        getRules()
    }, [props.cash.status.showAll])

    const getRules = () => {
        axios.get('/api/rules')
            .then(res => setRules(res.data))
            .catch(err => console.log(err))
    }
    
    return (
        <div className='Slot-Master' >
            
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(TheSlot)