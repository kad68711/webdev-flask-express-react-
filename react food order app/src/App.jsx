import Cart from './components/Cart.jsx';
import CheckOut from './components/CheckOut.jsx';
import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/userProgressContext.jsx';

function App() {
  return (
    <UserProgressContextProvider>
    <CartContextProvider>
      <Header />
      <Meals />
      <Cart/>
      <CheckOut/>
    </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;