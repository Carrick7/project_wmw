//Dependancies
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Navigation/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Pages
import Landing_and_Registration from './pages/Landing_and_Registration';
import Login from './pages/Login_page';
import Shopping_Lists_page from './pages/Shopping_Lists_page';
import SingleShoppinngList from './components/ShoppingLists/UpdateShoppingList/SingleShoppinngList';
function App() {
  return (
    <>
    <Router>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Landing_and_Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shopping_lists" element={<Shopping_Lists_page />} />
          <Route path="/shopping_lists/:id" element={<SingleShoppinngList />} />
          <Route path="/shopping_lists/:id/product/:id" element={<SingleShoppinngList />} />
        </Routes>
      </Container>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
