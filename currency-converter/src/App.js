import { useEffect, useReducer, useState } from "react";


const currencyList  = [
  { key: "AED", value: "AED" },
  { key: "ARS", value: "ARS" },
  { key: "AUD", value: "AUD" },
  { key: "BDT", value: "BDT" },
  { key: "BGN", value: "BGN" },
  { key: "BRL", value: "BRL" },
  { key: "BSD", value: "BSD" },
  { key: "CAD", value: "CAD" },
  { key: "CHF", value: "CHF" },
  { key: "CLP", value: "CLP" },
  { key: "CNY", value: "CNY" },
  { key: "COP", value: "COP" },
  { key: "CZK", value: "CZK" },
  { key: "DKK", value: "DKK" },
  { key: "DOP", value: "DOP" },
  { key: "EGP", value: "EGP" },
  { key: "EUR", value: "EUR" },
  { key: "FJD", value: "FJD" },
  { key: "GBP", value: "GBP" },
  { key: "GTQ", value: "GTQ" },
  { key: "HKD", value: "HKD" },
  { key: "HRK", value: "HRK" },
  { key: "HUF", value: "HUF" },
  { key: "IDR", value: "IDR" },
  { key: "ILS", value: "ILS" },
  { key: "INR", value: "INR" },
  { key: "ISK", value: "ISK" },
  { key: "JPY", value: "JPY" },
  { key: "KRW", value: "KRW" },
  { key: "KZT", value: "KZT" },
  { key: "MXN", value: "MXN" },
  { key: "MYR", value: "MYR" },
  { key: "NOK", value: "NOK" },
  { key: "NZD", value: "NZD" },
  { key: "PAB", value: "PAB" },
  { key: "PEN", value: "PEN" },
  { key: "PHP", value: "PHP" },
  { key: "PKR", value: "PKR" },
  { key: "PLN", value: "PLN" },
  { key: "PYG", value: "PYG" },
  { key: "RON", value: "RON" },
  { key: "RUB", value: "RUB" },
  { key: "SAR", value: "SAR" },
  { key: "SEK", value: "SEK" },
  { key: "SGD", value: "SGD" },
  { key: "THB", value: "THB" },
  { key: "TRY", value: "TRY" },
  { key: "TWD", value: "TWD" },
  { key: "UAH", value: "UAH" },
  { key: "USD", value: "USD" },
  { key: "UYU", value: "UYU" },
  { key: "VND", value: "VND" },
  { key: "ZAR", value: "ZAR" }
];
const KEY = "cur_live_HMThy0mr4A3QVHbJMCnOHbMJE6RKMNkFMXoNNdAj";

export default function App() {
  const [fromCurrency, setFormCurrency] = useState("AED");
  const [toCurrency, setToCurrency] = useState("");
  const [alterCurrencyList, setAlterCurrencyList] = useState([]);
  const [currentRate, setCurrentRate] = useState(0);
  const [curFromCurrecyRate, setCurFromCurrencyRate] = useState(0);
  const [curToCurrecyRate, setCurToCurrencyRate] = useState(0);
  const [originalAmount, setOriginalAmount] = useState("");
  const [calculatedValue, setCalculatedValue] = useState(0);



  useEffect(function(){
    setAlterCurrencyList(currencyList.filter(currency => currency.value !== fromCurrency));
  }, [fromCurrency]);

  useEffect(function(){
    setCalculatedValue(Number(currentRate) * originalAmount);
  }, [originalAmount])

  function handleExcangeCurrencyName(){
    const tempCur = toCurrency;
    const tempCurRate = curToCurrecyRate;

    setToCurrency(fromCurrency);
    setFormCurrency(tempCur);
    setCurToCurrencyRate(curFromCurrecyRate);
    setCurFromCurrencyRate(tempCurRate);

    const excangeRateCalculation = Number(curFromCurrecyRate) / Number(curToCurrecyRate);
    setCurrentRate(excangeRateCalculation.toFixed(2));
    setCalculatedValue(Number(currentRate) * originalAmount);

  }

  async function getCurrencyRate(){
    
    if(toCurrency === ""){
      alert("Something Wrong");
      return;
    } 
    
    const res = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${KEY}&currencies=${fromCurrency}%2CUSD%2C${toCurrency}`);
    const data = await res.json();
    const excangeRateCalculation = Number(data.data[fromCurrency].value) / Number(data.data[toCurrency].value);
    setCurrentRate(excangeRateCalculation.toFixed(2));
    setCurFromCurrencyRate(Number(data.data[fromCurrency].value));
    setCurToCurrencyRate(Number(data.data[toCurrency].value));
  }

  return (
    <>
      {/* <h1>Test</h1> */}
      <p className="convert">
          Convert :
          <input type="number" id="original-currency-amount" placeholder="0" value={originalAmount} onChange={(e)=>setOriginalAmount(e.target.value)} />
      </p> 

        <CurrencyDropdown currencyStatus = {fromCurrency} setCurrency={setFormCurrency} currencyDataSource={currencyList} />
        <Button styleClassid={"exchange"} onHandleCurName={handleExcangeCurrencyName}><i className="fas fa-exchange-alt"></i></Button>
        <CurrencyDropdown currencyStatus = {toCurrency} setCurrency={setToCurrency} currencyDataSource={alterCurrencyList}/>

      <p className="exchange">
          Exchange Rate:
          <input type="text" id="exchange-rate" value={currentRate} readOnly />
      </p>

      <Button styleClassid={"exchange_button"} onHandleCurName={getCurrencyRate}>Exchange my money now!</Button>

      <p>
          <span id="from">{fromCurrency}</span> converted to <span id="to">{toCurrency}</span> you converted value is <span id="to">{calculatedValue}</span>
      </p>

    </>
  );
}

function Button({children, styleClassid, onHandleCurName}){
  return (
    <button  id={styleClassid} onClick={onHandleCurName}>{children}</button>
  );
}

function CurrencyDropdown({currencyStatus, setCurrency, currencyDataSource}){
  return (
    <>
      <select id="to_currency" value={currencyStatus} onChange={(e)=>setCurrency(e.target.value)}>
        {currencyDataSource.map((currency) => (
          <option key={currency.key} value={currency.value}>
            {currency.key}
          </option>
        ))}
      </select>
    </>
  );
}

