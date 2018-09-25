//@ts-check

import io from 'socket.io-client';


let CRYPTOCOMPARE_API = "https://streamer.cryptocompare.com/";


export const subscribeCryptoStream = (coins,callback) => {
    // Subscribe to CryptoCompare websocket API.

    let subs = [];
    let cryptoIO = io.connect(CRYPTOCOMPARE_API);

    Object.keys(coins).map((key) => {
      return subs.push("5~CCCAGG~"+ key +"~USD");
    });

    cryptoIO.emit("SubAdd", { "subs": subs });

    cryptoIO.on("m", (message) => {
        //console.log("updating ....",message)
        callback(message);
    });
  };

