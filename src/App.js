import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency,setFromCurrency]=React.useState('RUS') 
  const [toCurrency,setToCurrency]=React.useState('USD') 
const [rates, setRates] = React.useState({});

React.useEffect(()=>{
  fetch('https://www.cbr-xml-daily.ru/latest.js')
  .then((res)=>res.json())
  .then((json)=>{
    setRates(json.rates);
    console.log(json.rates);
  })
  .catch((err)=>{
    console.warn(err);
    alert("Don't get info")
  });
},[]);

  return (
    <div className="App">
      <Block value={0} currency={fromCurrency} onChangeCurrency={setFromCurrency} />
      <Block value={0} currency={toCurrency} onChangeCurrency={setToCurrency} />
     
    </div>
  );
}

export default App;