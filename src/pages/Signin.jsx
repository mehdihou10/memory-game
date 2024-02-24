import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import GoogleAuth from '../components/GoogleAuth';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { url } from '../api/api.url';
import { getUser } from '../store/slices/user';
import { verifyUser } from '../store/slices/isSigned';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';


const Signin = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [userData,setUserData] = useState({email: "", password: ""});

  const login = (e)=>{

    e.preventDefault();

    axios.post(`${url}/api/users/login`,userData)
    .then((res)=>{

      const data = res.data;

      if(data.status === "success"){

        window.localStorage.setItem('user',data.token);

        const user_data = jwtDecode(data.token);

        dispatch(getUser(user_data));
        dispatch(verifyUser(true));

        Swal.fire({
          position: "top-start",
          icon: "success",
          title: "Registered successfully!",
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(()=>navigate('/'),2000);
        

      } else{

        if(Array.isArray(data.message)){

          for(let err of data.message){
  
            Swal.fire({
              icon: "error",
              title: err.msg
            })
          }

        } else{

          Swal.fire({
            icon: "error",
            title: data.message
          })
        }


      }
    })
  }

  return (
    <div className='p-relative px-3'>
      

      <form onSubmit={login} className='auth-form'>
        


        <input onChange={(e)=>setUserData({...userData,email: e.target.value})} type="email" className='form-control mb-3' placeholder='Email' />

        <input onChange={(e)=>setUserData({...userData,password: e.target.value})} type="password" className='form-control mb-3' placeholder='Password' />


        <input type="submit" value="Signin" className='btn btn-success d-block mx-auto mb-3' />

        <p>If you don't have an account <Link to="/signup">signup</Link></p>


        <hr />

        <GoogleAuth action="signin" />

      </form>
    </div>
  )
}

export default Signin
