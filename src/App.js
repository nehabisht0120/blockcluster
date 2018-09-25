//@ts-check

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { fetchCryptoCurrencyData } from "./apis/CryptoCurrency";
import { subscribeCryptoStream } from "./services/socketClient";

class App extends Component {
  state = {
    coins: []
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let response = await fetchCryptoCurrencyData();
    this.setState({ coins: response });
    subscribeCryptoStream(this.state.coins, this.updateCoin);
  }

  updateCoin = message => {
    // Update coin with recent data from CryptoCompare websocket API.

    message = message.split("~");
    let coins = Object.assign({}, this.state.coins);
    let d = [
      "SubscriptionId",
      "ExchangeName",
      "FromCurrency",
      "ToCurrency",
      "Flag",
      "Price",
      "LastUpdate",
      "LastVolume",
      "LastVolumeTo",
      "LastTradeId",
      "Volume24h",
      "Volume24hTo",
      "LastMarket"
    ];

    let obj = message.reduce(function(result, item, index, array) {
      result[d[index]] = item; 
      return result;
    }, {});

    if (coins[obj.FromCurrency]) coins[obj.FromCurrency].price_usd = obj.Price;

    this.setState({ coins: coins });

    //Reset the Indications
    
    setTimeout(() => {
      coins = Object.assign({}, this.state.coins);
      if (coins[obj.FromCurrency]) {
        coins[obj.FromCurrency].goUp = false;
        coins[obj.FromCurrency].goDown = false;
        this.setState({ coins: coins });
      }
    }, 500);
  };

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            {Object.keys(this.state.coins).map((key, index) => {
              let coin = this.state.coins[key];
              return (
                <div key={index} className="col-4 col-sm-3 col-xl-2 p-0">
                  <p className="text-white m-0">{coin.symbol}</p>
                  <p className="text-white m-0">{coin.price_usd}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
