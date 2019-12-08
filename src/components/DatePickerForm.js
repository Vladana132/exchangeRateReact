import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Information from "../components/Information"
import "react-datepicker/dist/react-datepicker.css"
import "../css/DatePickerForm.css"
import Response from './Response';
import moment from 'moment'
import API_URL from '../service/apiUrl'

class DatePickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: null,
      symbolCurrency: null,
      startDate: "",
      dateList: [],
      isReturned: false,
      noElements: true,
      history: [],
      message: ""
    }

  }
  componentWillReceiveProps({ baseCurrency, symbolCurrency }) {
    this.setState({ baseCurrency: baseCurrency, symbolCurrency: symbolCurrency });
  }

  handleChange = date => {
    this.state.dateList.push(moment(date).format('DD.MM.YYYY.'))
    this.setState({
      startDate: date,
      dateList: this.state.dateList,
      showMessage: false
    });
  };

  giveData() {
    this.setState({ dateList: [] })
    if ((this.state.baseCurrency === null || this.state.symbolCurrency === null) || (this.state.baseCurrency.value === this.state.symbolCurrency.value)) {
      this.setState({ message: "Please choose different currencies" })
      window.location.reload(false);
    }
    else if (this.state.dateList.length < 2) {

      this.setState({ message: "Please choose more than one date" })
      window.location.reload(false);
    }
    else {
      fetch(`${API_URL}/historical?dateList=` + this.state.dateList + `&baseCurrency=` + this.state.baseCurrency.value + `&symbol=` + this.state.symbolCurrency.value)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isReturned: true,
              history: result
            });
          },
          (error) => {
            this.setState({
              isReturned: false,
              error
            });
          }
        )
    }
  }
  render() {

    return (
      <div>
        <div className="datepicker">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            placeholderText="Choose date"
            dateFormat="dd.MM.yyyy."
            maxDate={(new Date())}
            showYearDropdown
            dateFormatCalendar="MMMM"
            yearDropdownItemNumber={15}
            scrollableYearDropdown
          />
          <Information
            dates={this.state.dateList}
          />
        </div>
        <p>{this.state.message}</p>
        <div>
          <button className="button" onClick={this.giveData.bind(this)}>Send</button>
        </div>
        <div className="Response">
          {this.state.isReturned &&
            <Response data={this.state.history} />}
        </div>
      </div>
    );
  }
}

export default DatePickerForm;