import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import UserProfile from './Pages/UserProfile';
import UploadDocuments from './Pages/UploadDocuments';
import Dashboard from './Pages/Dashboard';
import VerifiedDocuments from './Components/VerifiedDocument';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/userProfile' element={<UserProfile/>}/>
          <Route path='/upload' element={<UploadDocuments/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/check' element={<VerifiedDocuments/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}