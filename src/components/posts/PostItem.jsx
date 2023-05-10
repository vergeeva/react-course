import React from 'react';
import MyButton from "../UI/Button/MyButton";
import {useNavigate} from 'react-router-dom';

const PostItem = (props) => {
    const router = useNavigate()
    // console.log(router);
    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    <p>
                        {props.post.body}
                    </p>
                </div>
            </div>
            <div className="post__buttons">
                <MyButton
                    onClick={() => router(`/posts/${props.post.id}`)}>
                    Развернуть
                </MyButton>
                <MyButton
                    onClick={() => props.remove(props.post)}>
                    Удалить пост
                </MyButton>
            </div>
        </div>
    );
};

export default PostItem;