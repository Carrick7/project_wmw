//Dependancies
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Navigation/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Pages
import Landing_and_Registration from './pages/Landing_and_Registration';
import Login from './pages/Login_page';
import Shopping_Lists_page from './pages/Shopping_Lists_page';
import Receipt_List_page from './pages/Receipt_List_page';
import Products_page from './pages/Products_page';
//Components
import SingleShoppinngList from './components/ShoppingLists/SingleShoppingList/SingleShoppingList';
import SingleReceiptList from './components/ReceiptLists/SingleRecieptList/SingleReceiptList';
import Footer from './components/Footer/Footer';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <div className="page-container">
          <div className="content-wrap">
            <Header />
            <Routes>
              {/*Landing/home page & sign up*/}
              <Route path="/" element={<Landing_and_Registration />} />

              {/*Login*/}
              <Route path="/login" element={<Login />} />

              {/*To get all Shopping List*/}
              <Route path="/shopping_lists" element={<Shopping_Lists_page />} />

              {/*To get a Shopping List*/}
              <Route path="/shopping_lists/:id" element={<SingleShoppinngList />} />

              {/*To Delete Product from Shopping List*/}
              <Route path="/shopping_lists/:id/product/:id" element={<SingleShoppinngList />} />

              {/*To get all Receipt List*/}
              <Route path="/receipt_lists" element={<Receipt_List_page />} />

              {/*To get a Receipt List*/}
              <Route path="/receipt_lists/:id" element={<SingleReceiptList />} />
              
              {/*To Delete Product from Receipt List*/}
              <Route path="/receipt_lists/:id/product/:id" element={<SingleReceiptList />} />

              {/*Products Stats Page*/}
              <Route path="/products" element={<Products_page />} />
            </Routes>
          </div>
            <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
