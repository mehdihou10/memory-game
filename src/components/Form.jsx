import {useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchPosts } from '../store/slices/posts';
import { url } from '../api/api.url';
import axios from "axios";
import FileBase from 'react-file-base64';
import {jwtDecode} from 'jwt-decode';


const Form = () => {

  const dispatch = useDispatch();

  const post = useSelector(state=>state.post);
  const isUpdated = useSelector(state=>state.isUpdated);
  const isSigned = useSelector(state=>state.isSigned);
  const pageNumber = useSelector(state=>state.pageNum)


  const [postData,setPost] = useState({
    title: "", message: "",  tags: "",category: "", image: null
  })

  useEffect(()=>{

    setPost({...postData,id: post._id,
       title: post.title,
        message: post.message,
         tags: post.tags,
         category: post.category,
         image: null
        })

  },[post])



  
  const addPost = (e)=>{

    e.preventDefault();

    //get current user

  const token = window.localStorage.getItem('user');

  const user = jwtDecode(token);

    postData.creator = user.username;


    axios.post(`${url}/api/posts`,postData)
    .then((res)=>dispatch(fetchPosts(pageNumber)))


    

  }



  const updatePost = (e)=>{

    e.preventDefault();

   const updatedPost = {

    id: postData.id,
    title: postData.title,
    message: postData.message,
    tags: postData.tags,
    category: postData.category

   }

    if(postData.image){

      updatedPost.image = postData.image;
    }


    axios.put(`${url}/api/posts/${updatedPost.id}`,updatedPost)
    .then((data)=> dispatch(fetchPosts(pageNumber)))

    
  }


  const clearData = ()=>{

    setPost({title: "", message: "",  tags: "",category: "", image: null})

  }


  return (

  <>
  {
  isSigned ?
    <div className="p-5 border">

      <form onSubmit={isUpdated ? updatePost : addPost}>

        <input value={postData.title} onChange={(e)=>setPost({...postData,title: e.target.value})} type="text" className="form-control mb-2" placeholder="Title" />
        <input value={postData.message} onChange={(e)=>setPost({...postData,message: e.target.value})} type="text" className="form-control mb-2" placeholder="Message" />
        <input value={postData.tags} onChange={(e)=>setPost({...postData,tags: e.target.value})} type="text" className="form-control mb-2" placeholder="Tags" />
        <select className='form-select mb-3' onChange={(e)=>setPost({...postData,category: e.target.value})}>

          <option value="tourism">tourism</option>
          <option value="sport">sport</option>
          <option value="food">food</option>
          <option value="website">website</option>
          <option value="nature">nature</option>


        </select>
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

    :<p>You must sigin</p>
  }


  </>

  )
}

export default Form
