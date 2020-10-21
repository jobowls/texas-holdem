    // NPM
import React from 'react'
import {connect} from 'react-redux'

    // LOCAL
import ScoreHamilton from './ScoreHamilton'
import ScoreBurr from './ScoreBurr'
import ScoreJefferson from './ScoreJefferson'
import './ActionFeed.scss'

const ActionFeed = (props) => {
    const {players} = props.game.poker
    
    return (
        <div className='Feed-Master' >
            {
                players[1].isFolding 
                ? <> </>
                : <ScoreHamilton  />
            }
            {
                players[2].isFolding 
                ? <> </>
                : <ScoreBurr  />
            }
            {
                players[3].isFolding 
                ? <> </>
                : <ScoreJefferson  />
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(ActionFeed)