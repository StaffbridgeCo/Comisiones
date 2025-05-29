// frontend/src/App.tsx
import './index.css';
import './App.css';
import 'animate.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Login';
import RegisterForm from './Registro';
import Dashboard from './Dashboard';
import Home from './Home';
import CargarExcelPage from './CargarExcelPage';
import PrintableView from './PrintableView';

function App() {
  return (
    <Router basename="/EmpresaLogistica"> {/* Añadir basename aquí */}
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/cargar-excel" element={<CargarExcelPage />} />
        <Route path="/printable-view" element={<PrintableView />} />
      </Routes>
    </Router>
  );
}

export default App;
