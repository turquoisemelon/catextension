import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from './Modal.js';

const bodyEl = document.getElementsByTagName('body')[0];
const modalWrapper = document.createElement("div");
modalWrapper.className = "_extension_modal_wrapper"
bodyEl.appendChild(modalWrapper);

const renderModalToDOM = (modal) => {
    const wrapper= document.getElementsByClassName("_extension_modal_wrapper")[0];
    ReactDOM.render(modal, wrapper);
    document.getElementsByClassName("_extension-modal")[0].style.display = "flex";
    return;
};

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

            renderModalToDOM(<Modal imgUrl={gifphyDataImageURL}/>);

            sendResponse({response: value});
        }, (error) => {
            sendResponse({
                error: error.toString()
            });
        });

        return true; // signal that it will respond asyncronously
    });