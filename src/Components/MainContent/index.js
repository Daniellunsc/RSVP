import React from 'react';
import PropTypes from 'prop-types'
import Counter from './Counter'
import Guestlist from './GuestList'
import ConfirmedFilter from './ConfirmedFilter'

const MainComponent = props =>
    <div className="main">
    <ConfirmedFilter
        toggleFilter={props.toggleFilter}
        isFiltered={props.isFiltered}/>

    <Counter 
        numberAttending={props.numberAttending}
        numberUnconfirmed={props.numberUnconfirmed}
        totalInvited={props.totalInvited}/>

    <Guestlist 
        guests= {props.guests} 
        toggleConfirmationAt={props.toggleConfirmationAt}
        toggleEditingAt={props.toggleEditingAt}
        setNameAt={props.setNameAt}
        isFiltered={props.GuestisFiltered}
        onRemove={props.onRemove}
        pendingGuest = {props.pendingGuest}/>
    </div>

MainComponent.propTypes = {

    //ConfirmedFilter
    toggleFilter : PropTypes.func.isRequired,
    isFiltered: PropTypes.bool.isRequired,
    //Counter
    numberAttending: PropTypes.number,
    numberUnconfirmed: PropTypes.number,
    totalInvited: PropTypes.number,
    //GuestList
    guests: PropTypes.array.isRequired,
    toggleConfirmationAt: PropTypes.func.isRequired,
    toggleEditingAt: PropTypes.func.isRequired,
    setNameAt: PropTypes.func.isRequired,
    GuestisFiltered: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired,
    pendingGuest: PropTypes.string.isRequired
}

export default MainComponent
