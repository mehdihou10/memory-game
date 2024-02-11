import React from 'react'
import {GoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/slices/user';
import { verifyUser } from '../store/slices/isSigned';
import {jwtDecode} from "jwt-decode";
import {url} from '../api/api.url';
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom';


const GoogleAuth = ({action}) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  
  const signUser = (token)=>{
    
    const decode = jwtDecode(token);


    const user = {

      firstName: decode.given_name,
      lastName: decode.family_name,
      userName: decode.name,
      email: decode.email,
      image: decode.picture

    }
    


      if(action === "signup"){

        axios.post(`${url}/api/users/register`,user)
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

            Swal.fire({
              icon: "error",
              title: data.message,
            });
          }

        })

      }

      else if(action === "signin"){

        axios.post(`${url}/api/users/login`,{email: user.email})
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

            Swal.fire({
              icon: "error",
              title: data.message,
            });


          }


        })
      }

    }


  return (
    <div className='mx-auto google-auth'>
      <GoogleLogin

      onSuccess={(res)=> signUser(res.credential)}

      onError={(err)=>console.log(err)}
      
      />


    </div>
  )
}

export default GoogleAuth
