import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3'
import logo from './logo.svg';
import './App.css';
// import GalleryFactory from "shared"
import Shared from "shared";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        console.log(results)
        this.setState({
          web3: results.web3
        })

        // Instantiate contract once web3 provided.
        this.instantiateContract()
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const Gallery = contract(Shared.contract)
    Gallery.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    // var ballotInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log(accounts)

        Gallery.deployed().then((instance) => {
          console.log(instance)
        //   // Get the value from the contract to prove it worked.
          // return ballotInstance.chairperson.call()
        })
        // .then((result) => {
        // //   // Update state with the result.
        //   console.log('this is the chairperson', result)
        // //   return this.setState({ storageValue: result.c[0] })
        // })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {Shared.SECRET_SHARED_CODE}
        </p>
      </div>
    );
  }
}

export default App;
