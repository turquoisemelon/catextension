import { getApiData } from './api_call.js';

const processRequest = (data) => {
    if (data.action === 'getApiData') {
        return new Promise(resolve => {
            resolve(getApiData());
        })
    } else {
        PromiseRejectionEvent(new Error('bad request'));
    }

    return null;
}

// respond to data requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const result = processRequest(request);
    console.log('result', result);

    if (!result) {
        console.log('no response')
        return false; // no response
    }

    result.then((value) => {
        sendResponse({ response: value });
    }, (error) => {
        sendResponse({ error: error.toString() });
    });

    return true; // signal that it will respond asyncronously
});