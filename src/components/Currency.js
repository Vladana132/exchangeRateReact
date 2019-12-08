import React, { Component } from 'react';
import '../css/Currency.css'
import arrow from '../images/arrow.png'
import DatePickerForm from './DatePickerForm';
import Select from 'react-select';
import CurrencyService from '../service/currencyService';

class Currency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      items: [],
      baseCurrency: null,
      symbolCurrency: null,
      sameValues: false
    };
  }

  componentDidMount() {
    CurrencyService.getCurrencies().then(result => this.setState({
      isLoaded: true,
      items: result
    }));

  }

  handleBaseCurrencySelected = async (selected) => {
    await this.setState({ baseCurrency: selected });
    if(this.state.baseCurrency === this.state.symbolCurrency)
    {
      this.setState({sameValues: true})
    }
  }

  handleSymbolCurrencySelected = async (selected) => {
    await this.setState({ symbolCurrency: selected });
    if(this.state.baseCurrency === this.state.symbolCurrency)
    {
      this.setState({sameValues: true})
    }
  }
  render() {
    return (
      <div>
        <Select
          className="select-css"
          value={this.state.symbolCurrency}
          onChange={this.handleSymbolCurrencySelected}
          placeholder="Choose currency"
          options={this.state.items.map((option) => ({
            value: option,
            label: option
          }))}
        />
        <img className="image" src={arrow} alt=""></img>
        <Select
          className="select-css"
          value={this.state.baseCurrency}
          placeholder="Choose currency"
          onChange={this.handleBaseCurrencySelected}
          options={this.state.items.map((option) => ({
            value: option,
            label: option
          }))}
        />
        <DatePickerForm baseCurrency={this.state.baseCurrency} symbolCurrency={this.state.symbolCurrency} sameValues={this.state.sameValues} />
      </div>
    );
  }
}

export default Currency;