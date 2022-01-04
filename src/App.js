import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/*
import GroupPage from './components/GroupPage'
import Register from "./components/Register";
import Login from "./components/Login";
*/
import Navigation from './components/Navigation';
import Homepage from './components/Homepage';
import Landingpage from './components/Landingpage';
/*
import PageNotFound from './components/PageNotFound'
import ProfilePage from './components/ProfilePage'
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
*/
import './css/simple-loader.css';
import './css/main.css'; // tailwind

function App() {
  return (
    <Router>
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-8xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <Navigation />
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <Routes>
                <Route element={<Landingpage />} path="/" />
                <Route element={<Homepage />} path="/welcome" />
              </Routes>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt=""
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
