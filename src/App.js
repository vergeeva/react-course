import React, {useMemo, useRef, useState} from "react";
import Counter from "./components/counter/Counter";
import "./styles/App.css"
// import PostItem from "./components/posts/PostItem";
import PostsList from "./components/posts/PostsList";
import MyButton from "./components/UI/Button/MyButton";
import MyInput from "./components/UI/Input/MyInput";
import PostForm from "./components/posts/PostForm";
import MySelect from "./components/UI/Select/MySelect";
import PostFilter from "./components/posts/PostFilter";
import MyModal from "./components/UI/ModalWindows/MyModal";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {usePosts} from "./components/hooks/usePosts";

function App() {
    const [posts, setPosts] = useState(
        [
            {id:1, title: 'JavaScript', description: 'JavaScript - это язык программирования'},
            {id:2, title: 'Python', description: 'Б Python - это язык программирования'},
            {id:3, title: 'AC#', description: 'Язык C# - это язык программирования'}
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
    // const [selectedSort, setSelectedSort] = useState('')
    // const [searchQuery, setSearchQuery] = useState('')

    const [filter, setFilter] = useState({sortQuery: '', searchQuery: ''})

    const sortedAndSearchedPosts = usePosts(posts,filter.sortQuery, filter.searchQuery)

    const createPost = (newPost) =>{
        setPosts([...posts, newPost])
        setModalVisible(false)
    }
    const removePost = (postForRemove) => {
        setPosts((posts.filter(post => post.id !== postForRemove.id)))
    }

    // const sortPosts = (sort) =>{
    //     setSelectedSort(sort);
    // }
    const [modalVisible, setModalVisible] = useState(false);
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
            <MyButton style={{marginTop: '30px'}} onClick={() => setModalVisible(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modalVisible} setVisible={setModalVisible}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin:'15px 0px'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <PostsList posts={sortedAndSearchedPosts} remove={removePost} title='Посты про ЯП'/>
        </div>
    </div>
  );
}

export default App;
