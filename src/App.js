import './App.css';
import TodoItem from './components/Todo';

function App() {
  return (
    <div>
      <h1 className='text-7xl font-bold flex justify-center text-white pt-50'>Todo App</h1>
      <div className='flex justify-center pt-10'>
        <TodoItem></TodoItem>
      </div>
      
    </div>
  );
}

export default App;
