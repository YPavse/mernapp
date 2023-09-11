import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function Login() {
  const [credentials, setcredentials] =useState({email:"",password:""})

  let navigate =useNavigate()
  const handleSubmit = async (e) => {
     e.preventDefault();
     console.log()
     try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: credentials.email,
    password: credentials.password,
  })
});

if (response.status !== 200) {
  // Handle non-200 status code (e.g., display an error message)
  console.error(`HTTP error! Status: ${response.status}`);
  // You can also handle specific status codes (e.g., 400 for validation errors)
  if (response.status === 400) {
    const errorData = await response.json();
    console.error("Validation errors:", errorData.errors);
  }
} else {
  const json = await response.json();
  console.log(json);

  if (!json.success) {
    alert("Enter Your Valid Credentials");
  }
  if (json.success) {
    navigate("/");
  }
  
}

     } catch (error) {
       console.error("Fetch error:", error);
     }
   
  
   };
   
 
  const onChange = (event) => {
     const { name, value } = event.target;
     setcredentials({ ...credentials, [name]: value });
   }
   
 
  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp "name='email' value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1 "name='password' value={credentials.password} onChange={onChange}/>
  </div>
  <button type="submit" className="m-3 btn btn-success ">Submit</button>
  <Link  to="/createuser" className='m-3 btn btn-danger'>I AM New User</Link> 
</form>
</div>
    </>
  )
}
