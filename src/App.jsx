import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CursorHearts from './components/CursorHearts';
import Home from './pages/Home';
import Historia from './pages/Historia';
import Fotos from './pages/Fotos';
import Cartas from './pages/Cartas';
import Recuerdos from './pages/Recuerdos';
import Fechas from './pages/Fechas';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <div className="app">
      <CursorHearts />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/fotos" element={<Fotos />} />
          <Route path="/cartas" element={<Cartas />} />
          <Route path="/recuerdos" element={<Recuerdos />} />
          <Route path="/fechas" element={<Fechas />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;