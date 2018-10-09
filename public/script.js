const modalContent = `
    <div class="_extension-modal" style="display: none;position: fixed;z-index: 999; left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgba(0,0,0,0.4);justify-content:center;align-items:center;">
        <div class="_extension-modal-content" style="width: 100%;display: flex;align-items: center;justify-content: center;">
        </div>
    </div>`;
const bodyEl = document.getElementsByTagName('body')[0];
bodyEl.insertAdjacentHTML('afterbegin', modalContent);

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
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const result = processRequest(request);

    if (!result) {
        return false; // no response
    }

    result.then((value) => {
        const gifphyData = JSON.parse(value);
        const gifphyDataImageURL = gifphyData.data ? gifphyData.data.image_url : null;

        if (gifphyDataImageURL) {
            const modalContentEl = document.getElementsByClassName('_extension-modal-content')[0];
            const imageEl = `<img src="${gifphyDataImageURL}"/>`;
            modalContentEl.innerHTML= imageEl;
            document.getElementsByClassName('_extension-modal')[0].style.display = "flex";
        }

        sendResponse({ response: value });
    }, (error) => {
        sendResponse({ error: error.toString() });
    });

    return true; // signal that it will respond asyncronously
});

// When the user clicks anywhere outside of the modal, close it
const extensionModal = document.getElementsByClassName('_extension-modal')[0];
window.onclick = function (event) {
    if (event.target == extensionModal) {
        extensionModal.style.display = "none";
    }
}