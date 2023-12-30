import './App.css';
import { useState } from 'react';
import { Header } from './Header.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage }        from './pages/HomePage.js';
import { LoginPage }       from './pages/LoginPage.js';
import { AuthorizePage }   from './pages/AuthorizePage.js'
import { AdminPage }       from './pages/AdminPage.js'
import { ProfilePage }     from './pages/ProfilePage.js'
import { MyCoffeesPage }   from './pages/MyCoffeesPage/MyCoffeesPage.js'

function App() {

  const [authorities, setAuthorities] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header setAuthorities={setAuthorities} authorities={authorities} />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/authorize" element={<AuthorizePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profile" element={<ProfilePage authorities={authorities} />} />
          <Route path="/my-coffees" element={<MyCoffeesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
