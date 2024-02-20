import axios from 'axios'
import { url } from '../api/api.url';
import { useState,useEffect } from 'react';
import { FaChevronLeft,FaChevronRight } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {fetchPosts} from '../store/slices/posts';
import {changeActivePage} from '../store/slices/page.number';


const Pagination = () => {

    const dispatch = useDispatch();

    const posts = useSelector((state)=>state.posts);

    const [postsCount,setCount] = useState(0);

    useEffect(()=>{

        axios.get(`${url}/api/posts/count`)
        .then((res)=>setCount(res.data))

    },[posts])




    const pagesNum = Math.ceil(postsCount / 4);

    const pages = [];

    for(let i = 1; i <= pagesNum; i++){
        pages.push(i);
    }

    
  return (
    <div className='d-flex gap-2 my-5'>

        <div className="arrow arrow-left">
            <FaChevronLeft className='chevron' />
        </div>

        <div className="pages flex-grow-1 d-flex gap-2">
            {
                pages.map((page)=>{

                    const changePage = ()=>{
                        dispatch(fetchPosts(page))
                        dispatch(changeActivePage(page))
                    }

                    return (
                        <Link onClick={changePage} to={`/posts?page=${page}`} className={`page`} key={page}>{page}</Link>
                    )
                })
            }
        </div>


        <div className="arrow arrow-right">
            <FaChevronRight className='chevron' />
        </div>
      
    </div>
  )
}

export default Pagination
