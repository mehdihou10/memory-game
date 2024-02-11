import Posts from '../components/Posts';
import Form from '../components/Form';



const Home = ()=>{

  


    return (
        <>

        <div className='d-flex flex-column-reverse flex-lg-row mt-4 px-4 gap-4'>
    
          <div className='flex-grow-1'>
          <Posts />
          </div>
    
          <div className='form'>
          <Form />
          </div>
    
        </div>
    
    
    </>
    )
}

export default Home;