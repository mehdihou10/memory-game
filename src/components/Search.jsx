import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {url} from '../api/api.url';
import {updatePosts} from '../store/slices/posts';
import {useNavigate} from 'react-router-dom';
 

const Search = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  

  const [searchQuery,setSearchQuery] = useState({search: '', tags: []})

  const searchPosts = (e)=>{

    e.preventDefault();
    updatePostsBySearch(searchQuery.search,searchQuery.tags.join(','))
    
  }

  const updatePostsBySearch = (search,tags)=>{

    axios.get(`${url}/api/posts/search?search=${search}&tags=${tags}`)
    .then((res)=>{

      dispatch(updatePosts(res.data))
      navigate(`/posts/search?search=${searchQuery.search}&tags=${searchQuery.tags.join(',')}`)
    })
  }


  return (
    <div>
      <form onSubmit={searchPosts}>
        <input onChange={(e)=>setSearchQuery({...searchQuery,search: e.target.value})} type="text" className="form-control" placeholder='Search memories' />
        <input onChange={(e)=>setSearchQuery({...searchQuery,tags: e.target.value.split(' ')})} type="text" className="form-control my-3" placeholder='Search Tags' />

        <input type="submit" value="Search" className="btn btn-info d-block mx-auto mb-5" />

      </form>
    </div>
  )
}

export default Search
