
import './App.css'
import  Navbar  from './components/Navbar.jsx'
import routes from './routesconfig.js'; 
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <div  >
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </Suspense>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};
export default App
