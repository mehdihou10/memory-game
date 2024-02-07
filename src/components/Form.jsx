import {useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchPosts,addPostToPage } from '../store/slices/posts';
import { url } from '../api/api.url';
import axios from "axios";
import FileBase from 'react-file-base64';

const Form = () => {

  const dispatch = useDispatch();

  const post = useSelector(state=>state.post);
  const isUpdated = useSelector(state=>state.isUpdated);


  const [postData,setPost] = useState({
    creator: "", title: "", message: "",  tags: "", image: null
  })

  useEffect(()=>{

    setPost({...postData,id: post._id,
      creator: post.creator,
       title: post.title,
        message: post.message,
         tags: post.tags,
         image: null
        })

  },[post])



  
  const addPost = (e)=>{

    e.preventDefault();


    axios.post(`${url}/api/posts`,postData)
    .then((res)=>dispatch(addPostToPage(res.data)))


    

  }



  const updatePost = (e)=>{

    e.preventDefault();

   const updatedPost = {

    id: postData.id,
    creator: postData.creator,
    title: postData.title,
    message: postData.message,
    tags: postData.tags

   }

    if(postData.image){

      updatedPost.image = postData.image;
    }


    axios.put(`${url}/api/posts/${updatedPost.id}`,updatedPost)
    .then((data)=> dispatch(fetchPosts()))

    
  }


  const clearData = ()=>{

    setPost({creator: "", title: "", message: "",  tags: "", image: null})

  }


  return (
    <div className="p-5 border">

      <form onSubmit={isUpdated ? updatePost : addPost}>

        <input value={postData.creator} onChange={(e)=>setPost({...postData,creator: e.target.value})} type="text" className="form-control mb-2" placeholder="Creator" />
        <input value={postData.title} onChange={(e)=>setPost({...postData,title: e.target.value})} type="text" className="form-control mb-2" placeholder="Title" />
        <input value={postData.message} onChange={(e)=>setPost({...postData,message: e.target.value})} type="text" className="form-control mb-2" placeholder="Message" />
        <input value={postData.tags} onChange={(e)=>setPost({...postData,tags: e.target.value})} type="text" className="form-control mb-2" placeholder="Tags" />
        <FileBase type="file" mutiple={false} onDone={({base64})=>setPost({...postData,image: base64})} />
        
        <div className="d-flex justify-content-center gap-4 mt-4">

        {
          isUpdated ? <button type="submit" className='btn btn-info'>Update</button> 

          : <button type="submit" className='btn btn-success'>Submit</button>

        }

        </div>


      </form>

      <button id="clear" onClick={clearData} className='btn btn-danger d-block mt-3 mx-auto'>Clear</button>


    </div>
  )
}

export default Form
