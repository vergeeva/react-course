import React from 'react';
import PostItem from "./PostItem";

const PostsList = (props) => {
    return (
        <div>
            <h1 style={{textAlign:"center"}}>
                {props.title}
            </h1>
            {props.posts.map((post, index) =>
                <PostItem remove={props.remove} number={index + 1} post={post} key={post.id}/>
            )}
        </div>
    );
};

export default PostsList;    