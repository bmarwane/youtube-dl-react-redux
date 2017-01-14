import React                from 'react';
import { render }           from 'react-dom';
import { Provider }         from 'react-redux';

import {initStore} from '../shared/store';
import {App} from '../shared/components/App';

const store = initStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
