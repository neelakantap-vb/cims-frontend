import { Fragment } from 'react';

import './index.css';
import PageHeader from './components/PageHeader';
import ReadTable from './components/ReadTable';
import CreateForm from './components/ClientCreation-Form';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <PageHeader />
        <Routes>
          <Route path='/' exact element={<ReadTable/>}>
            
          </Route>
          <Route path='/create' exact element={<CreateForm/>}>
            
          </Route>
        </Routes>
    </Fragment>
  );
}

export default App;
