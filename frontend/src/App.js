//Dependancies
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Navigation/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Pages
import LandingAndRegistration from './pages/LandingAndRegistration';
import Login from './pages/LoginPage';
import ShoppingListsPage from './pages/ShoppingListsPage';
import ReceiptListPage from './pages/ReceiptListPage';
import ProductsPage from './pages/ProductsPage';
//Components
import SingleShoppinngList from './components/ShoppingLists/SingleShoppingList/SingleShoppingList';
import SingleReceiptList from './components/ReceiptLists/SingleRecieptList/SingleReceiptList';
import Footer from './components/Footer/Footer';
import BackToTopButton from './components/BackToTopButton/BackToTopButton';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//CSS
import './App.css';

function App() {
  return (
    <>
      <Router>
        <div className="page-container">
          <div className="content-wrap">
            <div id='back_to_top'/>
            <Header />
            <Routes>
              {/*Landing/home page & sign up*/}
              <Route path="/" element={<LandingAndRegistration />} />

              {/*Login*/}
              <Route path="/login" element={<Login />} />

              {/*To get all Shopping List*/}
              <Route path="/shopping_lists" element={<ShoppingListsPage />} />

              {/*To get a Shopping List*/}
              <Route path="/shopping_lists/:id" element={<SingleShoppinngList />} />

              {/*To Delete Product from Shopping List*/}
              <Route path="/shopping_lists/:id/product/:id" element={<SingleShoppinngList />} />

              {/*To get all Receipt List*/}
              <Route path="/receipt_lists" element={<ReceiptListPage />} />

              {/*To get a Receipt List*/}
              <Route path="/receipt_lists/:id" element={<SingleReceiptList />} />
              
              {/*To Delete Product from Receipt List*/}
              <Route path="/receipt_lists/:id/product/:id" element={<SingleReceiptList />} />

              {/*Products Stats Page*/}
              <Route path="/products" element={<ProductsPage />} />
            </Routes>
          </div>
            <BackToTopButton />
            <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
