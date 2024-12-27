import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'


export default function Blog({ title, description, userName, imageURL, isUser, id }) {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/myblogs/${id}`)
  }

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };

  console.log(title, isUser)
  return (
    <div className='blogformat'>
      <div className='card'>
        <div className='avtar'>
          <div className='left'>
            <h1 className='profile'>{userName ? userName.charAt(0) : ""}</h1>
            <h2 className='uname'>{userName}</h2>
          </div>
          <div className='right'>
            {isUser && <div className='edit'>
            <button onClick={handleEdit}  className='editbutton'><img   src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" alt="" /></button>
              <button onClick={handleDelete} className='deletebutton'><img  src="https://cdn-icons-png.flaticon.com/512/484/484611.png" alt="" /></button>

            </div>}
          </div>
        </div>
        <hr />
        <h2 className='blogtitle'>{title}</h2>
        {/* <img src="https://tse3.mm.bing.net/th?id=OIP.ZmR9c4tJ-4ERclMj-Ni3VQHaEg&pid=Api&P=0" alt="" /> */}
        <img className='blogimage' src={imageURL} alt="" />

        <h3 className='blogdesc'>{description}</h3>


      </div>
    </div>
  )
}
