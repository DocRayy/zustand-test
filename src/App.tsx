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
        <Route path="/set">
          <Route index element={<SetterPage />} />
          <Route path=":id" element={<SetterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
