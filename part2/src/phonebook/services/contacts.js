import axios from 'axios';
const baseURL = 'http://localhost:3001/persons';

const getAllContacts = () => {
    return axios(baseURL)
        .then(res => res.data);
}

const createContact = newObj => {
    return axios.post(baseURL, newObj)
        .then(res => res.data);
}

const deleteContact = id => {
    return axios.delete(`${baseURL}/${id}`)
        .then(res => res.data);
}

export default { getAllContacts, createContact, deleteContact, }
