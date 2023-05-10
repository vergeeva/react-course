import React, {useState} from 'react';
import MyInput from "../UI/Input/MyInput";
import MyButton from "../UI/Button/MyButton";
import PostsList from "./PostsList";

const PostForm = (props) => {
    const [post, setPost] = useState({title: '', body: ''})
    const addNewPost = (e) => {
        e.preventDefault(); //чтобы страница не обновлялась
        const newPost = {
            ...post, id:Date.now()
        }
        props.create(newPost)
        setPost({title: '', body: ''})
    }
    return (
        <form>
            {/*Управляемый компонент*/}
            <MyInput
                type="text"
                placeholder="Название поста"
                value={post.title}
                onChange={e => setPost( {...post, title: e.target.value})}
            />
            <MyInput
                type="text"
                placeholder="Описание"
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
            />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;