import {useState,useRef} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import GoogleAuth from '../components/GoogleAuth';
import FileBase from 'react-file-base64';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/slices/user';
import { verifyUser } from '../store/slices/isSigned';
import { url } from '../api/api.url';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';


const Signup = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [userData,setUserData] = useState({

    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    image: null,

  });


  const passwordRef = useRef('');


  const register = (e)=>{

    e.preventDefault();

    if((userData.password === passwordRef.current.value) && (userData.password.trim() !== '' && passwordRef.current.value.trim() !== '')){

      
    const newUser = {

    firstName: userData.firstName,
    lastName: userData.lastName,
    userName: userData.userName,
    email: userData.email,
    password: userData.password,
    isEmail: true

    }

    if(userData.image){

      newUser.image = userData.image;

    }


    axios.post(`${url}/api/users/register`,newUser)
    .then((res)=>{

      const data = res.data;


      if(data.status === "success"){

        window.localStorage.setItem('user',data.token);

        const user = jwtDecode(data.token);
  
        dispatch(getUser(user))
        dispatch(verifyUser(true))

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

  } else{

    Swal.fire({
      icon: "error",
      title: "Password doesn't fit"
    })
  }

  }

  return (
    <div className='p-relative px-3'>

      <div className="auth-form">

      <form onSubmit={register}>
        

        <div className="full-name d-flex gap-3 mb-3">

        <input onChange={(e)=>setUserData({...userData,firstName: e.target.value})} type="text" className='form-control' placeholder='First Name' />
        <input onChange={(e)=>setUserData({...userData,lastName: e.target.value})} type="text" className='form-control' placeholder='Last Name' />

        </div>

        <input onChange={(e)=>setUserData({...userData,userName: e.target.value})} type="text" className='form-control mb-3' placeholder='Username' />

        <input onChange={(e)=>setUserData({...userData,email: e.target.value})} type="email" className='form-control mb-3' placeholder='Email' />

        <input ref={passwordRef} type="password" className='form-control mb-3' placeholder='Password' />

        <input onChange={(e)=>setUserData({...userData,password: e.target.value})} type="password" className='form-control mb-3' placeholder='Repeat Password' />

        <FileBase type="file" multipe={false} onDone={({base64})=>setUserData({...userData,image: base64})} />


        <input type="submit" value="Signup" className='btn btn-success d-block mx-auto my-3' />

        <p>If you have an account <Link to="/signin">signin</Link></p>

        <hr />


      </form>

        <GoogleAuth action="signup" />

      </div>
    </div>
  )
}

export default Signup
