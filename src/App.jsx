import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main, Login, Home, About } from './components';

const router = createBrowserRouter(
  [
    { path: "/", element: <Main /> },
    { path: "/login", element: <Login /> },
    { path: "/home", element: <Home /> },
    { path: "/about", element: <About /> },
  ],
  {
    future: {
        v7_startTransition: true, 
        v7_relativeSplatPath: true, 
        v7_fetcherPersist: true, 
        v7_normalizeFormMethod: true, 
        v7_partialHydration: true, 
        v7_skipActionErrorRevalidation: true
      },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
