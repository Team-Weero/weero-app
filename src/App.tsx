import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Schedule';
import About from './pages/About';
import Contact from './pages/Contact';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-100 pb-16">
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <NavigationBar />
      </div>
    </HashRouter>
  );
}

export default App;