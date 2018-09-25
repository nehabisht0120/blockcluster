//@ts-check

import styled from "styled-components";
import { CRYPTO_CNST } from "../../utilities/constants/currency.cnst";

export const DashboardWrapper = styled.div`
  margin: 2em;
`;

export const WidgetWrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  height: 10em;
  padding: 2em;
  margin: 1em;
`;

const baseLabel = styled.label`
  text-align: center;
  display: block;
`;

export const CurrencyLabel = baseLabel.extend`
  font-size: 25px;
  color: ${props => CRYPTO_CNST[props.type].color};
`;

export const DollarValue = baseLabel.extend`
  color: #0052cc;
  display: inline-block;
`;

export const PriceIndicator = styled.span`
color: ${props => props.type === "success" ? "#7ed321" : "#cc3654"}

`
