import { HashRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Schedule from './pages/Schedule';
import Home from './pages/Main';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-100 pb-16">
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </div>
        <NavigationBar />
      </div>
    </HashRouter>
  );
}

export default App;