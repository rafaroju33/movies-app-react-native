import axios from "axios";

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '', //Here use you own API Key of this API https://www.themoviedb.org/movie
        lenguage: 'es-ES'
    }
});

export default movieDB;