import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import { fetchUsers } from './store/userSlice.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchPosts } from './store/postSlice.js';

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
