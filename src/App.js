import './App.css';
import ApiCall from './components/ApiCall';
import Counter from './components/Counter';

function App() {
  return (
    <div className="App">
      <Counter/>
      <ApiCall url={"https://jsonplaceholder.typicode.com/users"}/>
    </div>
  );
}

export default App;
