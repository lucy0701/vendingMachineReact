import React from 'react';

import ViewModel from './viewModel/ViewModel';
import Model from './model/Model';
import View from './view/View';
import './App.css';

function App() {
  const model = new Model();
  const viewModel = new ViewModel(model);

  return <View viewModel={viewModel} />;
}

export default App;
