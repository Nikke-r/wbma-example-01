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

const login = async (username, password) => {
  try {
    const loginCreds = {
      username: username,
      password: password,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginCreds),
    };

    const response = await fetch(apiUrl + 'login', fetchOptions);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const register = async (username, email, password) => {
  try {
    const registerCreds = {
      username: username,
      email: email,
      password: password,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerCreds),
    };

    const response = await fetch(apiUrl + 'users', fetchOptions);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export {getAllMedia, login, register};
