import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import About from './Pages/About';
import PersonalPage from './Pages/PersonalPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ComapnyPage from './Pages/CompanyPage';
import Login from './Pages/Login';
import NewUser from './Pages/NewUser';
import ForgotPassword from './Pages/ForgotPassword';
import Github, { githubInfoLoader } from './Pages/Github';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import FileUpload from './Pages/FileUpload.js';
import AllPost from './Pages/AllPost.js';

// Step 1: Create the Context
export const UserContext = createContext();

// Step 2: Provide the Context
const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        
        <Route path='' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget-password' element={<ForgotPassword />} />
        <Route path='/new-user' element={<NewUser />} />
        <Route path='/about' element={<About />} />
        <Route path='about/ComapnyPage' element={<ComapnyPage />} /> {/*Corrected typo*/}
        <Route path='about/PersonalPage' element={<PersonalPage />} /> {/*Corrected typo*/}
        <Route path='contact' element={<Contact />} />
        <Route path='contact' element={<Contact />} />
        <Route loader={githubInfoLoader} path='github' element={<Github />} />
        <Route  path='/FileUpload' element={<FileUpload />} />
        <Route path='/AllPost' element={<AllPost />} />

      </Route>
    )
  );

  return (
    // Step 2: Provide the Context
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>

  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
