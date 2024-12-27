import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        imageURL:data.blog.image,
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(blog);
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs/"));
  };

  return (

     
    <div className='addblog'>
       
    { inputs && <div className='add'>

         {/* <img src= {inputs.imageURL}  alt="" />   */}
        <form className='addform' onSubmit={handlesubmit}>
           {/* <img src= {inputs.imageURL}  alt="" />  */}
           <h1>Edit Blog</h1>
           <img src= {inputs.imageURL}  alt="" /> 
           <h3 className='edittitle'>Title</h3>
           <input type="text" name="title" onChange={handleChange} value={inputs.title} />
           <h3 className='editdesc'>Description</h3>
           <input type="text" name="description" onChange={handleChange} value={inputs.description} />

           {/* <h3>ImageUrl</h3>
           <input type="text"  name="imageURL" onChange={handleChange} value={inputs.imageURL}/>
           <h3>image</h3> */}
           
           <button type='submit' className='editsubmit'> Submit </button>
        </form>
    </div>}
</div>
  )
}

export default BlogDetail;