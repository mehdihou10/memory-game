import {Home,Signup,Signin} from './pages';
import Header from "./components/Header";
import {Routes,Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {fetchPosts} from './store/slices/posts';
import { getUser } from './store/slices/user';
import { verifyUser } from './store/slices/isSigned';
import {useEffect} from 'react';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {jwtDecode} from 'jwt-decode';


function App() {


  const dispatch = useDispatch();

  useEffect(()=>{

    dispatch(fetchPosts());

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

      <Route path="/" element={<Home />} />
      <Route path='signin' element={<Signin />}/>
      <Route path='signup' element={<Signup />}/>



    </Routes>
    

    </GoogleOAuthProvider>

  );
}

export default App;
