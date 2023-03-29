import './App.css';
import Charts from './components/Charts';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Charts />
      </div>
    </DndProvider>
  );
}

export default App;
