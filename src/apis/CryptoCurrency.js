//@ts-check
import cryptoAxios from "../configs/axios/cryptoAxios.config";

let COINMARKET_API = "https://api.coinmarketcap.com/v2/ticker/";

export function fetchCryptoCurrencyData() {
  return cryptoAxios.get(OTHER_API).then(data => data);
}

let OTHER_API =  "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD"