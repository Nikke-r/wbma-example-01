import {useState, useEffect} from 'react';
const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const getAllMedia = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchUrl = async () => {
    try {
      const response = await fetch(apiUrl + 'media/all');
      const json = await response.json();

      const result = await Promise.all(json.files.map(async (item) => {
        const response = await fetch(apiUrl + 'media/' + item.file_id);
        return await response.json();
      }));
      setData(result);
      setLoading(false);
    } catch (error) {
      console.log('Error: ' + error.message);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return [data, loading];
};

const fetchGET = async (endpoint = '', params = '', token = '') => {
  const fetchOptions = {
    headers: {
      'x-access-token': token,
    },
  };
  const response = await fetch(apiUrl + endpoint + '/' + params,
      fetchOptions);
  if (!response.ok) {
    throw new Error('fetchGET error: ' + response.status);
  }
  return await response.json();
};

const fetchPOST = async (endpoint = '', data = {}, token = '') => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(apiUrl + endpoint, fetchOptions);
  const json = await response.json();
  console.log(json);
  if (response.status === 400 || response.status === 401) {
    const message = Object.values(json).join();
    throw new Error(message);
  } else if (response.status > 299) {
    throw new Error('fetchPOST error: ' + response.status);
  }
  return json;
};

const fetchPUT = async (endpoint = '', data = {}, token = '') => {
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(apiUrl + endpoint, fetchOptions);
  const json = await response.json();
  return json;
};

const fetchDEL = async (endpoint = '', data = {}, token = '') => {
  try {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(apiUrl + endpoint, fetchOptions);
    const json = response.json();
    return json;
  } catch (error) {
    console.log(error.message);
  }
};

export {getAllMedia, fetchGET, fetchPOST, fetchPUT, fetchDEL};
