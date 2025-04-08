import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import App from './App.jsx';
import Todo from './pages/Todo/Todo';
import { ThemeProvider } from './providers/themeProvider';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
        <Router>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route path="/todo" element={<Todo />} />
            </Routes>
        </Router>
    </ThemeProvider>
  </React.StrictMode>,
);
