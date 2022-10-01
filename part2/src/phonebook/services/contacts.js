import axios from 'axios';
const baseURL = '/api/contacts';

const getAllContacts = () => {
    return axios
        .get(baseURL)
        .then(res => res.data);
}

const createContact = newObj => {
    return axios
        .post(baseURL, newObj)
        .then(res => res.data);
}

const deleteContact = id => {
    return axios
        .delete(`${baseURL}/${id}`)
        .then(res => res.data);
}

const replaceContact = (id, newObject) => {
    return axios
        .put(`${baseURL}/${id}`, newObject)
        .then(res => res.data);
}

export default { getAllContacts, createContact, deleteContact, replaceContact }
