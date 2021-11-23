import { Fragment } from 'react';

import './index.css';
import PageHeader from './components/PageHeader';
import ContactDetails from './components/ContactDetails';
import ReadTable from './components/ReadTable';
import CreateForm from './components/ClientCreation-Form';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <PageHeader />
      {/* <BrowserRouter> */}
        <Routes>
          <Route path='/' exact element={<ReadTable/>}>
            
          </Route>
          <Route path='/cdetails' exact element={<ContactDetails/>}>
            
          </Route>
          <Route path='/create' exact element={<CreateForm/>}>
            
          </Route>
        </Routes>
      {/* </BrowserRouter> */}
    </Fragment>
  );
}

export default App;
