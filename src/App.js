import React, { Component } from 'react';
import './App.css';
import Guestlist from './Components/GuestList.js';

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

  getTotalInvite = () => this.state.guests.length;
  // getConfirmedGuests = () =>
  // getUnconfirmedGuests = () =>

  render() {
    return (
      <div className="App">
      <header>
        <h1>RSVP</h1>
        <p>A Treehouse App</p>
        <form onSubmit={this.newGuestSubmitHandler}>
            <input 
            type="text" 
            onChange={this.handleNameInput}
            value={this.state.pendingGuest}
            placeholder="Invite Someone"/>
            <button type="submit" name="submit" value="submit" >Submit</button>
        </form>
      </header>
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
        <table className="counter">
          <tbody>
            <tr>
              <td>Attending:</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Unconfirmed:</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
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
