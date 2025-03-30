import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import UserProfile from './Pages/UserProfile';
import UploadDocuments from './Pages/UploadDocuments';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/userProfile' element={<UserProfile/>}/>
          <Route path='/upload' element={<UploadDocuments/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}