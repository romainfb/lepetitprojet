import './App.css';
import DashboardPage from './pages/DashboardPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShareDataPage from './pages/ShareDataPage';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<DashboardPage />} />

        <Route path="/share/:numberSensor" element={<ShareDataPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
