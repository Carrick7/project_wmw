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
import UpdateShoppingList from './components/ShoppingLists/UpdateShoppingList/UpdateShoppingList';
import Test from './components/ShoppingLists/UpdateShoppingList/Test';

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
          <Route path="/shopping_lists/:id" element={<Test />} />
        </Routes>
      </Container>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
