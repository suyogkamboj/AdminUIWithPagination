import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { EditEmployee } from './Components/EditEmployee';
import GeekTrust from './Components/GeekTrust';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GeekTrust />} />
        <Route path='/employees/:id' element={<EditEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
