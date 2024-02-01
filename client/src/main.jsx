import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";;


import App from './App.jsx'
import Editor from './pages/Editor.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import RequireAuth from './utils/privateRoutes.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />
      }, {
        path: '/login',
        element: <Login />,
      }, {
        path: '/signup',
        element: <Signup />,
      }, 
      {
        path: '/editor',
        element: <Editor />,
      }, {
        path: '/editor/:username',
        element: <RequireAuth>
          <Editor />
          </RequireAuth>,
      }, {
        path: '/profile',
        element: <Profile />,
      }, {
        path: '/profile/:username',
        element: <RequireAuth>
          <Profile />
          </RequireAuth>,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
