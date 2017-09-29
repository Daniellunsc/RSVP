import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header'
import MainComponent from './Components/MainContent'
class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [],
  }

  lastGuestId = 0;

  newGuestId = () => {
    const id = this.lastGuestId;
    this.lastGuestId +=1;
    return id;
  }

  toggleGuestPropertyAt = (property, id) => {
    this.setState({
      guests: this.state.guests.map(guest=>{
        if(id === guest.id){
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });
  }

  toggleConfirmationAt = id =>
    this.toggleGuestPropertyAt("isConfirmed", id)

  toggleEditingAt = id =>
    this.toggleGuestPropertyAt("isEditing", id)

  removeGuestAt = id => 
    this.setState({
      guests: this.state.guests.filter(guest=> id !== guest.id)
    })

  setNameAt = (name, id) => 
    this.setState({
      guests: this.state.guests.map(guest=>{
        if(id === guest.id){
          return {
            ...guest,
            name
          };
        }
        return guest;
      })
    });
  

  toggleFilter =  () => {
    this.setState({ isFiltered: !this.state.isFiltered  })
  }

  handleNameInput = e => {
    this.setState({pendingGuest: e.target.value})
  }

  newGuestSubmitHandler = (e) => {
    e.preventDefault();
    const id = this.newGuestId();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
          id
        },
        ...this.state.guests
      ],
      pendingGuest: '',
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
      <MainComponent 
        toggleFilter={this.toggleFilter}
        isFiltered={this.state.isFiltered}
        numberAttending={numberAttending}
        numberUnconfirmed={numberUnconfirmed}
        totalInvited={totalInvited}
        guests= {this.state.guests} 
        toggleConfirmationAt={this.toggleConfirmationAt}
        toggleEditingAt={this.toggleEditingAt}
        setNameAt={this.setNameAt}
        GuestisFiltered={this.state.isFiltered}
        onRemove={this.removeGuestAt}
        pendingGuest = {this.state.pendingGuest}
        />
    </div>
    );
  }
}

export default App;
