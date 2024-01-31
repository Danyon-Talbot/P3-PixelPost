import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";;


import App from './App.jsx'
import Editor from './pages/Editor.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';

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
        path: '/editor',
        element: <Editor />,
      }, {
        path: '/profile',
        element: <Profile />,
      }, {
        path: '/profile/:username',
        element: <Profile />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
