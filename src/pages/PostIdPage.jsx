import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostById, isLoading, error] = useFetching( async () => {
        const response = await PostService.getPostById(params.id);
        setPost(response.data);
    })
    const [fetchComment, isCommentLoading, commentError] = useFetching( async () => {
        const response = await PostService.getCommentsById(params.id);
        setComments(response.data);
    })
    useEffect(() => {
        fetchPostById();
        fetchComment();
    }, [])
    return (
        <div>
            <h1>
                Вы открыли страницу поста c ID = {params.id}
            </h1>
            {
                isLoading
                ? <Loader/>
                : <div>
                        {post.id}.
                        {post.title}
                </div>
            }
            <h1>Комментарии к посту</h1>
            {
                isCommentLoading
                    ? <Loader/>
                    : <div>
                        {
                            comments.map(comm =>
                                <div key={comm.id} style={{marginTop:15}}>
                                    <h5>{comm.email}</h5>
                                    <p>{comm.body}</p>
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    );
};

export default PostIdPage;