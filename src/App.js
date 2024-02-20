import {Home,Signup,Signin, PostDetails} from './pages';
import Header from "./components/Header";
import {Routes,Route,Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { getUser } from './store/slices/user';
import { verifyUser } from './store/slices/isSigned';
import {useEffect} from 'react';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {jwtDecode} from 'jwt-decode';


function App() {


  const dispatch = useDispatch();

  useEffect(()=>{

    const userToken = window.localStorage.getItem('user');

    if(userToken){

      const user = jwtDecode(userToken);

      dispatch(getUser(user));
      dispatch(verifyUser(true));

    }
    
  },[])

  const API_KEY = "471421447530-kcg8pd2htkb0c7lfba3qdlk6q35dl389.apps.googleusercontent.com";


  return (

    <GoogleOAuthProvider clientId={API_KEY}>

    <Header />

    <Routes>

      <Route path="/" element={<Navigate to='/posts' />} />
      <Route path="posts" element={<Home />} />
      <Route path="posts/:postId" element={<PostDetails />} />
      <Route path="posts/search" element={<Home />} />
      <Route path='signin' element={<Signin />}/>
      <Route path='signup' element={<Signup />}/>



    </Routes>
    

    </GoogleOAuthProvider>

  );
}

export default App;
