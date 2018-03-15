import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Shared from "shared";
import 'babel-preset-react-native-web3/globals';
import Web3 from 'web3';
// require('crypto'); // rn app breaks if this line is not present.


// import contract from 'truffle-contract'

export default class App extends React.Component {
  
  constructor(){
    super();
		// Initialize web3 and set the provider to the testRPC.
		// set the provider you want from Web3.providers

    const web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
    this.web3 = new Web3(web3Provider);
  }

  componentDidMount(){
    // const contract = require('truffle-contract')
    // const Gallery = contract(Shared.contract)
    // Gallery.setProvider(this.state.web3.currentProvider)

    this.web3.eth.getAccounts((error, accounts) => {
      console.log(accounts)
      // Gallery.deployed().then((instance) => {
      //   console.log(instance)
      // //   // Get the value from the contract to prove it worked.
      //   // return ballotInstance.chairperson.call()
      // })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{Shared.SECRET_SHARED_CODE}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
