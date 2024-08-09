const axios = require("axios");
var http = require('http');
const fetch = require('node-fetch');

export const getBookmarks = async (bid) => {
  try {
    const response = await axios.get('https://ts-research.onrender.com/api/bookmarks/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'web',
        'bid': bid
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
};

export const removeBookmark = async (bid, doi) => {
  try {
    const response = await axios.delete('https://ts-research.onrender.com/api/bookmarks/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'web',
        'bid': bid,
        'paperId': doi
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    throw error;
  }
};

export const getBID = async (email) => {
  try {
    const response = await axios.get('https://ts-research.onrender.com/api/bookmarks/bid/get/', {
      headers: {
        'Content-Type': 'application/json',
        'email': email
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting bid:', error);
    return error.response.data;
  }
};

export const getAuth = async (email, name, orcidId, key) => {
  try {
    console.log('In the api')
    console.log(email, name, orcidId, key)
    const response = await axios.post('https://ts-research.onrender.com/api/auth/login', {
      email: email,
      name: name,
      orcid: orcidId,
      key: key
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    return error.response.data;
  }
};
