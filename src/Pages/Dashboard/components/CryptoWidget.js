//@ts-check

import React from "react";
import {
  WidgetWrapper,
  CurrencyLabel,
  DollarValue,
  PriceIndicator
} from "../styled";
import { CRYPTO_CNST } from "../../../utilities/constants/currency.cnst";

const CryptoWidget = ({ FromCurrency, Price, goUp, goDown, LastUpdate }) => {
  return (
    <WidgetWrapper>
      {!FromCurrency && <label>....Loading</label>}
      {FromCurrency && (
        <React.Fragment>
          <CurrencyLabel type={FromCurrency}>
            {CRYPTO_CNST[FromCurrency].label}
          </CurrencyLabel>
          <div className="text-center">
            <DollarValue>
              $ {Number(Price).toFixed(2)} per {FromCurrency.toLowerCase()}
            </DollarValue>
            {(goUp || goDown) && (
              <PriceIndicator
                type={goUp ? "success" : ""}
                className={`${
                  goUp ? "glyphicon glyphicon-arrow-up" : "glyphicon glyphicon-arrow-down"
                }`}
              />
            )}
          </div>
        </React.Fragment>
      )}
    </WidgetWrapper>
  );
};

export default CryptoWidget;
