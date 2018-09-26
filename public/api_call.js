export const getApiData = () => {
    const giphyApiKey = process.env.giphyApiKey;
    const giphyTag = 'cat';
    const apiUrl = `http://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}&tag=${giphyTag}`;
    fetch(apiUrl, {
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
      console.log('json', json)
    }).catch(ex => {
      console.log('parsing failed', ex)
    });
}