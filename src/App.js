import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header'
import Guestlist from './Components/GuestList.js';
import Counter from './Components/Counter'

class App extends Component {

  state = {
    
    isFiltered: false,
    pendingGuest: "",
    guests: [
      {
        name: 'Treasure',
        isConfirmed: false,
        isEditing: false,
      },
      {
        name: 'Daniel',
        isConfirmed: false,
        isEditing: false,
      },
      {
        name: 'Lorrane',
        isConfirmed: false,
        isEditing: false,
      },
    ]
  }

  toggleGuestPropertyAt = (property, indexToChange) => {
    this.setState({
      guests: this.state.guests.map((guest,index)=>{
        if(index === indexToChange){
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });
  }

  toggleConfirmationAt = index =>{
    this.toggleGuestPropertyAt("isConfirmed", index)
  }

  toggleEditingAt = index =>{
    this.toggleGuestPropertyAt("isEditing", index)
  }

  removeGuestAt = index => {
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index + 1)
      ]
    })
  }

  setNameAt = (name, indexToChange) => {
    this.setState({
      guests: this.state.guests.map((guest,index)=>{
        if(index === indexToChange){
          return {
            ...guest,
            name
          };
        }
        return guest;
      })
    });
  }

  toggleFilter =  () => {
    this.setState({ isFiltered: !this.state.isFiltered  })
  }

  handleNameInput = e => {
    this.setState({pendingGuest: e.target.value})
  }

  newGuestSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuest: ''
    })
  }

  getTotalInvited = () => this.state.guests.length;

  getConfirmedGuests = () => {
    return this.state.guests.reduce(
      (total, guest) => guest.isConfirmed ? total+=1 : total, 0)
    }
  // getUnconfirmedGuests = () =>

  render() {
    
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getConfirmedGuests();
    console.log(numberAttending)
    const numberUnconfirmed = totalInvited - numberAttending;

    return (
      <div className="App">
      <Header 
      newGuestSubmitHandler={this.newGuestSubmitHandler}
      pendingGuest={this.state.pendingGuest}
      handleNameInput={this.handleNameInput}/>
      <div className="main">
        <div>
          <h2>Invitees</h2>
          <label>
            <input
             type="checkbox" 
             onChange={this.toggleFilter} 
             checked={this.state.isFiltered}
            /> Hide those who haven't responded
          </label>
        </div>
        <Counter totalInvited={totalInvited} numberAttending={numberAttending} numberUnconfirmed={numberUnconfirmed}></Counter>
        <Guestlist guests= {this.state.guests} 
        toggleConfirmationAt={this.toggleConfirmationAt}
        toggleEditingAt={this.toggleEditingAt}
        setNameAt={this.setNameAt}
        isFiltered={this.state.isFiltered}
        onRemove={this.removeGuestAt}
        pendingGuest = {this.state.pendingGuest}
        />
      </div>
    </div>
    );
  }
}

export default App;
