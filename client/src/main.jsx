import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";;


import App from './App.jsx'
import Editor from './components/CanvasComponents/Editor';
import Login from './components/LoginComponents/Login';
import Signup from './components/SignUpCompontents/Signup';
import Profile from './components/ProfileComponents/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Editor />
      }, {
        path: '/login',
        element: <Login />,
      }, {
        path: '/signup',
        element: <Signup />,
      }, {
        path: 'editor',
        element: <Editor />,
      }, {
        path: 'profile',
        element: <Profile />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
