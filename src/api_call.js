export const getApiData = () => {
    const giphyApiKey = process.env.API_KEY;
    const giphyTag = 'cat';
    const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}&tag=${giphyTag}`;
    return fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${giphyApiKey}`
      }
    }).then(response => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    }).then(json => {
      return json;
    }).catch(ex => {
      console.log('parsing failed', ex)
    });
};
