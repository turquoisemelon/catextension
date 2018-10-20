import React, {Component} from 'react';
import './App.css';
import { getApiData } from './api_call.js';

class App extends Component {
    constructor() {
        super();

        this.state = {
            isApiData: !!window
                .localStorage
                .getItem('API_DATA')
        }
    }

    persistApiData(getApiDataFunc) {
        getApiDataFunc('cat').then((response) => {
            const stringifiedJSONResponse = JSON.stringify(response)
            window
                .localStorage
                .setItem('API_DATA', stringifiedJSONResponse);
            this.setState({isApiData: true})
        });
    }

    sendRequest(request) {
        this.persistApiData(getApiData);
        chrome
            .tabs
            .query({
                active: true,
                currentWindow: true
            }, (tabs) => {
                chrome
                    .tabs
                    .sendMessage(tabs[0].id, {
                        action: 'getApiData',
                        message: request
                    }, (response) => {
                        console.log('Response received from content script');
                    });
            });
        return;
    }

    componentDidMount() {
        this.persistApiData(getApiData);
    };

    render() {
        const transferableData = this.state.isApiData
            ? window
                .localStorage
                .getItem('API_DATA')
            : 'no data available';

        return (
            <div className="App">
                <button className="App-button" onClick={() => this.sendRequest(transferableData)}>Catify me</button>
            </div>
        );
    }
}

export default App;
