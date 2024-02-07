import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Post from './Post';


const Posts = () => {

  const posts = useSelector(state=>state.posts);

  return (
    <div className='row g-4'>
      

      {

        posts.length > 0 ?
        posts.map(post=><Post key={post._id} post={post} />)

        : <p>Nothing to show</p>
      }
      
    </div>
  )
}

export default Posts
