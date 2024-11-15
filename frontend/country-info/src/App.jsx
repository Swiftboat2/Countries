import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import CountryInfo from './components/CountryInfo'

function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/countries/:countryCode" element={<CountryInfo />}  />
    </Routes>
    </Router>
  );
}

export default App;