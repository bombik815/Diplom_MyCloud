import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Container } from 'react-bootstrap'
import FilesList from './components/FilesList';
import AddFile from './components/AddFile';
import DetailFile from './components/DetailFile';
import EditFile from './components/EditFile';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Header />
        <main className="py-3">
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />

            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />

            <Route path='files/' element={<FilesList />} />
            <Route path='/add-file' element={<AddFile />} />
            <Route path='/detail/:id' element={<DetailFile />} />
            <Route path='/update/:id' element={<EditFile />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
