export const getApiData = () => {
    const giphyApiKey = process.env.giphyApiKey;
    const giphyTag = 'cat';
    const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}&tag=${giphyTag}`;
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', apiUrl, true);
      xhr.setRequestHeader('Authorization', `Bearer ${giphyApiKey}`);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const resp = JSON.parse(xhr.response);
          console.log('resp', resp)
          resolve(resp);
        } else {
          const error = new Error(xhr.statusText);
          reject(error);
        }
      };
      xhr.send();
    });
}