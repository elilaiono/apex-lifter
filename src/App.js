import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { db } from './config/firebase'
import { getDocs, collection } from 'firebase/firestore';

import Header from './components/Header';
import Home from './components/Home';
import Workouts from './components/Workouts';
import Progress from './components/Progress';
import Profile from './components/Profile';
import Login from './components/Login'
import Register from './components/Register';
import Footer from './components/Footer';
import SignUp from './components/SignUp';


const App = () => {
  const [userList, setUserList] = useState([]);

  const userCollectionRef = collection(db, "users")

  useEffect(() => {
    const getUserList = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id}))
        // console.log(filteredData)
        setUserList(filteredData)
      } catch (error) {
        console.error(error)
      }
    };

    getUserList();
  }, []);

  return (
    <div >
      <Header />

      <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="workouts" element={<Workouts />} />
          <Route exact path="progress" element={<Progress />} />
          <Route exact path="profile" element={<Profile />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="register" element={<Register />} />
          <Route exact path="signup" element={<SignUp  />} />
        </Routes>

      <Footer />  
    </div>
  );
}

export default App;