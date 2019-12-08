import React, { Component } from 'react';
import '../css/CurrencyExchange.css';
import Currency from '../components/Currency';

class CurrencyExchange extends Component {
    render() {
        return (
            <div className="Posts">
                <section>
                    <Currency />
                </section>
            </div>
        );
    }
}

export default CurrencyExchange;