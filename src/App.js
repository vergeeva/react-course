import React, {useRef, useState} from "react";
import Counter from "./components/counter/Counter";
import "./styles/App.css"
// import PostItem from "./components/posts/PostItem";
import PostsList from "./components/posts/PostsList";
import MyButton from "./components/UI/Button/MyButton";
import MyInput from "./components/UI/Input/MyInput";
import PostForm from "./components/posts/PostForm";
import MySelect from "./components/UI/Select/MySelect";

function App() {
    const [posts, setPosts] = useState(
        [
            {id:1, title: 'JavaScript', description: ' А JavaScript - это язык программирования'},
            {id:2, title: 'Python', description: 'Python - это язык программирования'},
            {id:3, title: 'C#', description: 'Язык C# - это язык программирования'}
        ])
    // const [posts1, setPosts1] = useState(
    //     [
    //         {id:1, title: 'Python', body: 'Python - это язык программирования'},
    //         {id:2, title: 'Python', body: 'Python - это язык программирования'},
    //         {id:3, title: 'Python', body: 'Python - это язык программирования'}
    //     ])
    // const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')

    const [post, setPost] = useState({title: '', description: ''})

    // const bodyInputRef = useRef(); для взятия значения элемента
    const addNewPost = (e) => {
         e.preventDefault(); //чтобы страница не обновлялась
        setPosts([...posts, {...post, id:Date.now()}])
        setPost({title: '', description: ''})
    }
    const [selectedSort, setSelectedSort] = useState('')
    const createPost = (newPost) =>{
        setPosts([...posts, newPost])
    }
    const removePost = (postForRemove) => {
        setPosts((posts.filter(post => post.id !== postForRemove.id)))
    }
    const sortPosts = (sort) =>{
        setSelectedSort(sort);
        setPosts([...posts].sort((a,b)=> a[sort].localeCompare(b[sort])))
    }

  return (
    <div className="App">
        <div className="visually-hidden example1">
            <Counter/>
        </div>
        <div className=" visually-hidden example2">
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
                    value={post.description}
                    onChange={e => setPost({...post, description: e.target.value})}
                />
                {/*<input ref={bodyInputRef} type='text'/>*/}
                {/*Неуправляемый компонент*/}
                {/*<MyInput*/}
                {/*    ref={bodyInputRef}*/}
                {/*    type="text"*/}
                {/*    placeholder="Описание"*/}
                {/*/>*/}
                <MyButton onClick={addNewPost}>Создать пост</MyButton>
            </form>
            <PostsList posts={posts} title="Посты про JS"/>
            {/*<PostsList posts={posts1} title="Просты про Python"/>*/}
        </div>
        <div className='example 3'>
            <PostForm create={createPost}/>
            <hr style={{margin:'15px 0px'}}/>
            <div>
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue = "Сортировка"
                    options ={[
                        {value:'title', name:'По названию'},
                        {value: 'description', name: 'По описанию'}
                    ]}
                />
            </div>
            {
                posts.length !== 0 //Условная отрисовка
                    ? <PostsList remove={removePost} posts={posts} title="Посты про JS"/>
                    :
                    <div>
                        <h1
                            style={{textAlign:'center'}}>Список постов пуст!
                        </h1>
                    </div>
            }
        </div>

    </div>
  );
}

export default App;
