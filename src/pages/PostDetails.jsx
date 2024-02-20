import {useState,useEffect} from 'react'
import {useParams,useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import {url} from '../api/api.url';
import moment from 'moment';
import {useSelector} from 'react-redux';


const PostDetails = () => {

  const isSigned = useSelector(state=>state.isSigned);
  const user = useSelector(state=>state.user);


  const {postId} = useParams();
  const navigate = useNavigate();


  const [post,setPost] = useState({});
  const [postsRec,setPosts] = useState([]);
  const [comments,setComments] = useState([]);
  const [comment,setComment] = useState('');
  const [updatedComment,setUpdatedComment] = useState('');
  const [confirmed,setConfirmed] = useState(false);


  useEffect(()=>{

    getPost();

  },[postId])


  useEffect(()=>{

    axios.post(`${url}/api/posts/categories/${post.category}`,{postId: postId})
    .then((res)=>{

      const data = res.data;

      if(data.status === "success"){

        setPosts(data.posts);
        
      }

    })

  },[post])

  const addComment = ()=>{

    const newComments = Array.from(comments);

    newComments.push({user,text: comment});

    setComments(newComments);

    modifyComments(newComments);

    
  }

  const updateComment = (current,ind)=>{

    setConfirmed(true);

  current.classList.add('d-none');

  document.querySelectorAll('.confirm')[ind].classList.remove('d-none');

  const input = document.querySelectorAll('.comment input')[ind];

  setUpdatedComment(input.value)
  input.classList.remove('pe-none');
  input.focus();
    
  }

  const confirmUpdateComment = (current,ind,comment)=>{

    setConfirmed(false);
    
    current.classList.add('d-none');

  document.querySelectorAll('.update')[ind].classList.remove('d-none');


  document.querySelectorAll('.comment input')[ind].classList.add('pe-none');

  const newComments = comments;

  for(let com of newComments){

    if(com === comment){

      com.text = updatedComment;

    }

  }


  setComments(newComments);

  modifyComments(newComments);

    
  }

  const deleteComment = (comment,ind)=>{

    const newComments = [];

    for(let com of comments){

      if(com !== comment){

        newComments.push(com);
  
      }
    }

    setComments(newComments)

    modifyComments(newComments);

    

    // document.querySelectorAll('.comment')[ind].remove();
    
  }


  //get post 
  const getPost = ()=>{

    axios.get(`${url}/api/posts/${postId}`)
    .then((res)=>{

      const data = res.data;

      if(data.status === "success"){

        setPost(data.post);
        setComments(data.post.comments)

      } else{

        navigate('/');
      }
      
    })
  }

  //update comments
  const modifyComments = (newComments)=>{

    axios.put(`${url}/api/posts/${postId}`,{comments: newComments})
  }


  return (
    <div>
      
      <div className="post-data d-lg-flex gap-5">

        <div className="text">
          <h1>{post.title}</h1>

          <div className="tags d-flex gap-2">
            {post.tags &&
              post.tags.split(',').map(tag=><span className='text-secondary' key={tag}>#{tag}</span>)
            }
          </div>

          <p className="message">{post.message}</p>

          <p className="creation">{moment(post.createdAt).fromNow()}</p>

          <h3>comments:</h3>

          <div className="comments">
            {

              comments.length != 0 ?

              comments.map((comment,index)=>(

                <div key={index} className="comment d-flex align-items-center gap-2">

                  <img src={comment.user.image} alt="profile" />

                  {
                    confirmed ?
                    <input onChange={(e)=>setUpdatedComment(e.target.value)} className='border-0 pe-none flex-grow-1 bg-secondary text-white mb-3 p-3' defaultValue={comment.text} />
                    
                    :
                    <input className='border-0 pe-none flex-grow-1 bg-secondary text-white mb-3 p-3' value={comment.text} />
                  }

                  
                  <div className={`${user.username !== comment.user.username && 'd-none'} btns d-flex gap-2`}>

                  
                    <button onClick={(e)=>updateComment(e.target,index)}
                     className='update btn btn-info'>Update</button>

                    <button onClick={(e)=>confirmUpdateComment(e.target,index,comment)}
                     className='confirm d-none btn btn-success'>Confirm</button>

                  
                  <button onClick={()=>deleteComment(comment,index)} className='btn btn-danger'>Delete</button>
                 </div>
                 
                </div>
                
              ))
              
              :<p>Nothing to show</p>
            }
          </div>

          { isSigned &&

            <div className="add-comment d-lg-flex mb-5 gap-3">

              <div className="d-flex gap-3 mb-3">

              <img src={user.image} alt="profile" />
            <input onChange={(e)=>setComment(e.target.value)} type="text" className="form-control" placeholder='add-coment' />

              </div>


              <button onClick={addComment} className='btn btn-success'>add</button>

          </div>

          }
        </div>

        <div className="image">
          <img loading='lazy' src={post.image} alt="image" />
        </div>

      </div>

      <h1 className='mt-4 p-5'>You might like:</h1>
        <hr />

      <div className="recommended-posts p-5 d-lg-flex gap-3">
       

        {
          postsRec.map(post=>(

            <div key={post._id} className="post-cat">
              <h3>{post.title}</h3>

              <h5>{post.owner}</h5>

              <p>{post.message}</p>

              <Link to={`/posts/${post._id}`}>
                <img src={post.image} alt="image" />
              </Link>

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default PostDetails
