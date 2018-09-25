//@ts-check

import React, { Component } from "react";
import { fetchCryptoCurrencyData } from "../../apis/cryptoCurrencyAPI";
import { subscribeCryptoStream } from "../../services/socketClient";
import { DashboardWrapper } from "./styled";
import CryptoWidget from "./components/CryptoWidget";

class Dashboard extends Component {
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

  setPriceChangeFlags = value => {
    switch (value) {
      case "1":
        return { goUp: true, goDown: false };
      case "2":
        return { goUp: false, goDown: true };
      default:
        return { goUp: false, goDown: false };
    }
  };

  updateCoin = message => {
    // Update coin with recent data from CryptoCompare websocket API.

    message = message.split("~");
    console.log(message);
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

    let obj = message.reduce(function(result, item, index) {
      result[d[index]] = item;
      return result;
    }, {});

    let priceChangeMap = this.setPriceChangeFlags(obj.Flag);

    if (coins[obj.FromCurrency] && (obj.Flag === "1" || obj.Flag === "2"))
      coins[obj.FromCurrency] = { ...obj, ...priceChangeMap };

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
      <DashboardWrapper className="row">
        {Object.values(this.state.coins).map((coin, index) => (
          <div className="col-md-4 col-sm-6" key={index}>
            <CryptoWidget {...coin} />
          </div>
        ))}
      </DashboardWrapper>
    );
  }
}

export default Dashboard;
