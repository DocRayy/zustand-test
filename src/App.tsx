import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import HomePage from './routes/home';
import SetterPage from './routes/setter';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/set" element={<SetterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
