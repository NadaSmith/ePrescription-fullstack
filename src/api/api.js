import Axios from 'axios';


// Set the base URL for your API requests
const api = Axios.create({
  baseURL: 'http://localhost:3000/api/', 
});

export default api;
