import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './Layouts/Main';
import Blog from './Pages/Blog/Blog';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import img from './assets/images/404.jpg'
import Products from './Pages/Home/Products';
import AdvertisedItem from './Pages/Home/AdvertisedItem';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <Signup></Signup>
        },
        {
          path: '/blog',
          element: <Blog></Blog>
        },
        {
          path: '/product/:id',
          element: <Products></Products>,
          loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
        },


      ]
    },

    {
      path: '*',
      element: <div><img className='h-[650px] w-full' src={img} alt="" /></div>
    },

  ])
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
