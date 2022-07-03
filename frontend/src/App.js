//Dependancies
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Navigation/Header';
//Pages
import Landing_and_Registration from './pages/Landing_and_Registration';
import Login from './pages/Login';

function App() {
  return (
    <>
    <Router>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Landing_and_Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Router>
    </>
  );
}

export default App;
