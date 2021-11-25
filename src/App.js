import logo from './logo.svg';
import './App.css';
import CIMSTable from './Components/CIMSTable';
import MidPopUp from './Components/MidPopUp';

function App() {
  return (
    <div className="App">
      <CIMSTable />

      <MidPopUp message="Records have been updated Successfully!" />
    </div>
  );
}

export default App;
