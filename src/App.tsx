import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import HomePage from './routes/home';
import SetterPage from './routes/setter';
import SetterDetailPage from './routes/setter/setterdetail';
import SetterListPage from './routes/setter/setterlistpage';
import { SETTER_PATH } from './routes/setter/constants';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path={SETTER_PATH} element={<SetterPage />}>
          <Route index element={<SetterListPage />} />
          <Route path="new" element={<SetterDetailPage />} />
          <Route path=":id" element={<SetterDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
