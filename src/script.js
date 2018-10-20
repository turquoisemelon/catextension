import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from './Modal.js';

const renderModalToDOM = (modal) => {
    const bodyEl = document.getElementsByTagName('body')[0];
    const modalWrapper = document.createElement("div");
    bodyEl.appendChild(modalWrapper);

    ReactDOM.render(modal, modalWrapper);
    return;
};

renderModalToDOM(<Modal/>);

const insertGifToDOM = (gifUrl) => {
    if (gifUrl) {
        const modalContentEl = document.getElementsByClassName('_extension-modal-content')[0];
        const imageEl = `<img src="${gifUrl}"/>`;
        modalContentEl.innerHTML = imageEl;
        document.getElementsByClassName('_extension-modal')[0].style.display = "flex";
    }
    return;
}

const processRequest = (data) => {
    if (data.action === 'getApiData') {
        return new Promise((resolve, reject) => {
            resolve(data.message);
        });
    } else {
        reject(new Error('bad request'));
    }

    return null;
}

// respond to data requests
chrome
    .runtime
    .onMessage
    .addListener((request, sender, sendResponse) => {
        const result = processRequest(request);

        if (!result) {
            return false; // no response
        }

        result.then((value) => {
            const gifphyData = JSON.parse(value);
            const gifphyDataImageURL = gifphyData.data
                ? gifphyData.data.image_url
                : null;

            insertGifToDOM(gifphyDataImageURL);

            sendResponse({response: value});
        }, (error) => {
            sendResponse({
                error: error.toString()
            });
        });

        return true; // signal that it will respond asyncronously
    });

// When the user clicks anywhere outside of the modal, close it
const extensionModal = document.getElementsByClassName('_extension-modal')[0];
window.onclick = function (event) {
    if (event.target == extensionModal) {
        extensionModal.style.display = "none";
    }
};