import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import ReactQueryPage from './ReactQueryPage';
function App() {
  return (
    <div className="App">
      <nav style={{background:"beige", padding:"20px"}}>
        <Link to="/" style={{marginRight:"10px"}}>
          Homepage
        </Link>
        <Link to="/react-query">React Query</Link>
      </nav>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/react-query' element={<ReactQueryPage/>}/>
      </Routes > 
    </div>
  );
}

export default App;
