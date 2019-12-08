import API_URL from '../service/apiUrl'

const CurrencyService = {
    getCurrencies() {
        return fetch(`${API_URL}/currencies`).then(res => res.json());
    }
};

export default CurrencyService;