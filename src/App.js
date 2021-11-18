import './App.css';
import CollapsibleSidebar from './components/Collapsible-Sidebar'
import CreateForm from './components/ClientCreation-Form';
import { BrowserRouter as Router , Route ,Routes } from 'react-router-dom';
import Header from './components/Header';
import PageHeader from './components/PageHeader';
import CIMSTable from './components/ReadTable';

function App() {
  return (    
    <div>
        <>
          <Header/>
          <CollapsibleSidebar/>    
        </>
        
        <Router>
          <Routes>
          <Route exact path='/' element={
                                          <>
                                            <PageHeader />
                                            <CIMSTable/>
                                          </>} >
          </Route>

          <Route path='/createclient' element={<>
                                            <PageHeader />
                                            <CreateForm/>
                                          </>} >
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
