import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/indexPage.jsx'
import LoginPage  from './pages/loginPage.jsx'
import Layout from './pages/layout.jsx'
import RegisterPage from './pages/registerPage.jsx'
import axios from 'axios'
import { UserContextProvider } from './UserContext.jsx'
import AccountPage from './pages/account.jsx'


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/account/:subpage?" element={<AccountPage/>} />
          <Route path="/account/:subpage/:actions" element={<AccountPage/>} />
        </Route>
      </Routes>
    </UserContextProvider>
    
 
  )
}

export default App
