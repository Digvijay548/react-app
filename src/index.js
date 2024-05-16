import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import About from './Pages/About';
import reportWebVitals from './reportWebVitals';
import PersonalPage from './Pages/PersonalPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ComapnyPage from './Pages/CompanyPage';
import Login from './Pages/Login';
import NewUser from './Pages/NewUser';
import ForgotPassword from './Pages/ForgotPassword';
import Github,{githubInfoLoader} from './Pages/Github';

// Step 1: Create the Context
 export const UserContext = createContext();

// Step 2: Provide the Context
const App = () => {
  const [user, setUser] = useState("null"); // Example: state to hold user data
  const [IsUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget-password' element={<ForgotPassword />} />
        <Route path='/new-user' element={<NewUser />} />
        <Route path='/about' element={<About />} />
        <Route path='about/ComapnyPage' element={<ComapnyPage />} /> {/* Corrected typo */}
        <Route path='about/PersonalPage' element={<PersonalPage />} /> {/* Corrected typo */}
        <Route path='contact' element={<Contact />} />
        <Route path='contact' element={<Contact />} />
        <Route loader={githubInfoLoader} path='github' element={<Github />}/>
       
      </Route>
    )
  );

  return (
    // Step 2: Provide the Context
    <UserContext.Provider value={{ user, setUser ,IsUserLoggedIn,setIsUserLoggedIn}}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </UserContext.Provider>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
reportWebVitals();

export default App;
