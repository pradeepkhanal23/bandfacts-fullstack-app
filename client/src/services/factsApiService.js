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

  deleteFact(id) {
    const username = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "";

    //in order to delete the fact from the server we need to attach the username in the body of the request, which is added as data object and username property
    return axios.delete(`${this.apiUrl}/${id}`, {
      data: {
        username,
      },
    });
  }
}

export default new FactsApiService();
