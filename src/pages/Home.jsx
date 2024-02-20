import Posts from '../components/Posts';
import Form from '../components/Form';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import { useDispatch } from 'react-redux';
import {fetchPosts} from '../store/slices/posts';
import { useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { url } from '../api/api.url';
import {updatePosts} from '../store/slices/posts';



const Home = ()=>{

  const dispatch = useDispatch();

  const location = useLocation();

  const search = location.search;


  if(search !== ""){


    if(search.includes('page')){

      const page = +search.slice(search.indexOf('=') + 1)

      dispatch(fetchPosts(page));
    

    } else if(search.includes("search")){


      const searchQuery = search.slice(search.indexOf("=")+1, search.indexOf('&'))

      const tags = search.split("=")[2]

      axios.get(`${url}/api/posts/search?search=${searchQuery}&tags=${tags}`)
      .then((res)=>{

        dispatch(updatePosts(res.data));


      })


    }
  } else{

    dispatch(fetchPosts(1));
  }


 


    return (
        <>

        <div className='d-flex flex-column-reverse flex-lg-row mt-4 px-4 gap-4'>
    
          <div className='flex-grow-1'>
          <Posts />
          </div>
    
        <div className="second">

          <Search />

        <div className='form'>
          <Form />
          </div>

          <Pagination />

          
        </div>
          
    
        </div>
    
    
    </>
    )
}

export default Home;