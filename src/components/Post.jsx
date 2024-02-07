import { useState } from 'react';
import { url } from '../api/api.url';
import axios from "axios";
import { BiSolidLike } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import moment from 'moment';
import { useDispatch,useSelector } from 'react-redux';
import {fetchPosts} from "../store/slices/posts";
import {updatePost} from "../store/slices/update.post";
import {changeUpdateStatus} from "../store/slices/isUpdated";
import Swal from 'sweetalert2';


const Post = (props) => {

    const dispatch = useDispatch();

    const isUpdated = useSelector(state=>state.isUpdated);

    const {post} = props;

    let [likeCount,setCount] = useState(+post.likeCount);


    const [toggle,setToggle] = useState(false);

    const changePost = ()=>{

        dispatch(updatePost(post));
        dispatch(changeUpdateStatus());

        if(isUpdated){

            dispatch(updatePost({creator: "", title: "", message: "",  tags: "", image: ""}))
        }

        setToggle((prev)=>!prev)

    }

    const deletePost = ()=>{
        
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true
        })
        .then((data)=>{

            if(data.isConfirmed){

                axios.delete(`${url}/api/posts/${post._id}`)
                .then((res)=>dispatch(fetchPosts()))

            }
        })
        
    }

    const addLikeCount = ()=>{

        setCount(++likeCount);

        const obj = {likeCount: likeCount};

        axios.put(`${url}/api/posts/${post._id}`,obj);
    }



  return (


    <div className="col-12 col-sm-6 col-xl-4">

    <div className="card position-relative">

        <div className="update" onClick={changePost} >

            {
                toggle ? <IoMdClose />
                :<GrUpdate />
            }

        </div>

        <div className="image position-relative">
        <img src={post.image} className="card-img-top" alt="image" />

        </div>

        <div className="creation">
            <h4>{post.creator}</h4>
            <h5>{moment(post.createdAt).fromNow()}</h5>

        </div>


        <div className="card-body">

            <div className="tags d-flex gap-1">
                {
                    post.tags.split(',').map((tag,index)=>(
                        <div key={index} className="tag text-secondary">#{tag}</div>
                    ))
                }
            </div>

            <h3>{post.title}</h3>

            <p>{post.message}</p>

            <div className="btns d-flex justify-content-between align-items-center position-absolute">

                <div className="like text-info-emphasis cursor-pointer" onClick={addLikeCount}>
                <BiSolidLike /> Like {likeCount}
                
                </div>

                <div onClick={deletePost} className="delete cursor-pointer text-info-emphasis">
                    <FaTrash /> delete
                </div>

            </div>
        </div>
    </div>


        </div>

  )
}

export default Post
