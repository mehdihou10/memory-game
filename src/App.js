import Posts from './components/Posts';
import Form from './components/Form';
import {useDispatch} from 'react-redux';
import {fetchPosts} from './store/slices/posts';
import {useEffect} from 'react';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{

    dispatch(fetchPosts());
    
  },[])


  return (
    <div className='d-flex flex-column-reverse flex-lg-row mt-4 px-4 gap-4'>

      <div className='flex-grow-1'>
      <Posts />
      </div>

      <div className='form'>
      <Form />
      </div>

    </div>
  );
}

export default App;
