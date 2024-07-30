import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import ReactQueryPage from './ReactQueryPage';
import ReactQueryPage2 from './ReactQueryPage2';
function App() {
  return (
    <div className="App">
      <nav style={{background:"beige", padding:"20px"}}>
        <Link to="/" style={{marginRight:"10px"}}>
          Homepage
        </Link>
        <Link to="/react-query">React Query</Link>
        <Link to="/react-query2">React Query2</Link>
      </nav>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/react-query' element={<ReactQueryPage/>}/>
        <Route path='/react-query2' element={<ReactQueryPage2/>}/>
      </Routes > 
    </div>
  );
}

export default App;
