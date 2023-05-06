import React from 'react';
import MyButton from "../UI/Button/MyButton";

const PostItem = (props) => {

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.number}. {props.post.title}</strong>
                <div>
                    <p>
                        {props.post.description}
                    </p>
                </div>
            </div>
            <div className="post__buttons">
                <MyButton
                    onClick={() => props.remove(props.post)}>
                    Удалить пост
                </MyButton>
            </div>
        </div>
    );
};

export default PostItem;