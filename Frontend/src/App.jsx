import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import UserProfile from './Pages/receiver/UserProfile';
import UploadDocuments from './Pages/issuer/UploadDocuments';
import VerifiedDocuments from './Pages/receiver/VerifiedDocument';
import Dashboard from './Components/Dashboard';
import IssuerDashboard from './Pages/issuer/IssuerDashboard';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/issuer/userProfile' element={<UserProfile/>}/>
          <Route path='/receiver/userProfile' element={<UserProfile/>}/>
          <Route path='/issuer/upload' element={<UploadDocuments/>}/>
          <Route path='/receiver/dashboard' element={<Dashboard/>}/>
          <Route path='/issuer/dashboard' element={<IssuerDashboard/>}/>
          <Route path='/receiver/verified' element={<VerifiedDocuments/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}