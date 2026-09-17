import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import CursorHearts from './components/CursorHearts';
import Home from './pages/Home';
import Historia from './pages/Historia';
import Fotos from './pages/Fotos';
import Cartas from './pages/Cartas';
import Recuerdos from './pages/Recuerdos';
import Fechas from './pages/Fechas';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <div className="app">
      <a href="#contenido" className="skip-link">{t('a11y.skip_to_content')}</a>
      <CursorHearts />
      <Navbar />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/fotos" element={<Fotos />} />
          <Route path="/cartas" element={<Cartas />} />
          <Route path="/recuerdos" element={<Recuerdos />} />
          <Route path="/fechas" element={<Fechas />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;