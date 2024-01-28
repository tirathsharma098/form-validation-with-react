import React, { useState } from 'react';
import Registration from './components/Registration';
import "./App.css";
import AddressDetail from './components/AddressDetail';
import AllUser from './components/AllUser';
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
const App = () => {
  const [isAtAddress, setIsAtAddress] = useState(false);
  return (
      <>
      <ToastContainer autoClose={2000} />
      {!isAtAddress && <Registration setIsAtAddress={setIsAtAddress}/>}
      {isAtAddress && <AddressDetail setIsAtAddress={setIsAtAddress}/>}
      <AllUser/>
      </>
  );
}

export default App;
