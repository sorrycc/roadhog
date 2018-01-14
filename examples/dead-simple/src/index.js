import React from 'react';
import dva from 'dva';
import App from './App';

const app = dva();
app.model(require('./model').default);
app.router(() => <App />);
app.start(document.getElementById('root'));
