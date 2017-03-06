
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import 'admin-lte/plugins/select2/select2.min.css';
import 'admin-lte/dist/css/AdminLTE.min.css';
import 'admin-lte/dist/css/skins/skin-black.min.css';
import 'admin-lte/bootstrap/js/bootstrap.min';
import 'admin-lte/dist/js/app.min';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { history, store } from './lib/config';
import routes from './lib/routes';
import './styles/main.scss';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
);