import axios from "axios";

class FactsApiService {
  constructor() {
    this.apiUrl = "http://localhost:8000/api/facts";
  }

  getFacts() {
    return axios.get(this.apiUrl);
  }

  createFact(data) {
    return axios.post(this.apiUrl, data);
  }
}

export default new FactsApiService();
