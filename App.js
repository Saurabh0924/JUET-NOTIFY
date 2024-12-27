import './App.css';
import React, { useEffect } from 'react';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import UserBlog from './components/UserBlog';
import BlogDetail from './components/BlogDetail';
import AddBlog from './components/AddBlog';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';
import Welcome from './components/Welcome';
// import Header2 from './components/Header2';




function App() {
  const dispatch = useDispatch();

  const isloggedIn = useSelector(state=>state.isloggedIn)
  console.log(isloggedIn)
  useEffect(()=>{
    if(localStorage.getItem("userId")){
    dispatch(authActions.login());
  }
},[dispatch]);
  return (
    <React.Fragment>
      <header>
          <Header/>          
      </header> 
      <main>
        <Routes>
             <Route exact path="/" element={<Welcome/>}/>
           { !isloggedIn ? <Route exact path="/auth" element={<Auth/>}/> :
           <>
           <Route exact path="/blogs" element={<Blogs/>}/>
           <Route exact path="/myblogs" element={<UserBlog/>}/>
           <Route exact path="/myblogs/:id" element={<BlogDetail/>}/>
           <Route exact path="/blogs/add" element={<AddBlog/>}/>
           </>
            }

            
        </Routes>
      </main>   
    </React.Fragment>
  );
}

export default App;
