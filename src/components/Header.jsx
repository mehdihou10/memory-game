import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { MdMemory } from "react-icons/md";
import { useSelector,useDispatch } from 'react-redux';
import {getUser} from "../store/slices/user";
import {verifyUser} from "../store/slices/isSigned";
import Swal from "sweetalert2";
import {url} from '../api/api.url';


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state=>state.user);
  const isSigned = useSelector(state=>state.isSigned);


  const logout = ()=>{
    
    Swal.fire({
      icon: "warning",
      title: "Are you sure?"

    }).then((res)=>{

      if(res.isConfirmed){

        window.localStorage.removeItem('user');
        dispatch(verifyUser(false));
        dispatch(getUser({}))
        navigate('/');
      }
    })

  }



  return (
    <div className='border-bottom text-white py-2 mb-5'>
      
      <div className="container d-flex justify-content-between align-items-center">

      <Link to="/" className="text-black fs-1"><MdMemory /></Link>


      <div className="d-flex align-items-center gap-2">

        {
          isSigned &&

          <div className="user text-center gap-2 text-black">

          <img className='user-image' src={user.image} alt="user" />
          <h3 className='fs-6'>{user.username}</h3>
  
        </div>
        }
     

        <div className="btn">

          {
            isSigned ? <button onClick={logout} className='btn btn-danger'>Logout</button>

            : <Link to="/signin" className='btn btn-info'>Signin</Link>
          }

        
        

        </div>


      </div>


      </div>
    </div>
  )
}

export default Header
