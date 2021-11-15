import './App.css';
import CollapsibleSidebar from './components/Collapsible-Sidebar'
import CreateForm from './components/ClientCreation-Form';

function App() {
  return (
    <div>
      {true&&<CollapsibleSidebar/>}
      <CreateForm/>
    </div>
  );
}

export default App;
