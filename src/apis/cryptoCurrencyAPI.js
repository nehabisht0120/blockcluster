//@ts-check
import cryptoAxios from "../configs/axios/cryptoAxios.config";

let COINMARKET_API = "https://api.coinmarketcap.com/v2/ticker/";

//preferred this as it had already filtered data

let OTHER_API = "https://min-api.cryptocompare.com/data/pricemulti";

export function fetchCryptoCurrencyData() {
  return cryptoAxios
    .get(OTHER_API, { params: { fsyms: "BTC,ETH,XRP", tsyms: "USD" } })
    .then(data => data);
}
