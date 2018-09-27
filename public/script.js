const processRequest = (data) => {
    if (data.action === 'getApiData') {
        return new Promise((resolve, reject) => {
            resolve();
        });
    } else {
        reject(new Error('bad request'));
    }

    return null;
}

// respond to data requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const result = processRequest(request);

    if (!result) {
        return false; // no response
    }

    result.then((value) => {
        sendResponse({ response: value });
    }, (error) => {
        sendResponse({ error: error.toString() });
    });

    return true; // signal that it will respond asyncronously
});