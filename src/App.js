import React from 'react';
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Main from './layout/pages/Main';
import Messages from './layout/Message';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

function App() {
  return (
    <div className="App">
      <Messages/>
      <Header title='Controle Educacional'/>
      <Main/>
      <Footer title='Prefeitura de Blumenau' website='https://www.blumenau.sc.gov.br/' />      
    </div>
  );
}

export default App;
