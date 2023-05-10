import React, {useEffect, useState} from "react";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/Button/MyButton";
import Counter from "../components/counter/Counter";
import MyInput from "../components/UI/Input/MyInput";
import PostsList from "../components/posts/PostsList";
import MyModal from "../components/UI/ModalWindows/MyModal";
import PostForm from "../components/posts/PostForm";
import Pagination from "../components/UI/Pagination/Pagination";
import PostFilter from "../components/posts/PostFilter";
import Loader from "../components/UI/Loader/Loader";


function Posts() {
    const [posts, setPosts] = useState(
        [
            {id:1, title: 'JavaScript', body: 'JavaScript - это язык программирования'},
            {id:2, title: 'Python', body: 'Б Python - это язык программирования'},
            {id:3, title: 'AC#', body: 'Язык C# - это язык программирования'}
        ])
    // const [posts1, setPosts1] = useState(
    //     [
    //         {id:1, title: 'Python', body: 'Python - это язык программирования'},
    //         {id:2, title: 'Python', body: 'Python - это язык программирования'},
    //         {id:3, title: 'Python', body: 'Python - это язык программирования'}
    //     ])
    // const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')
    const [post, setPost] = useState({title: '', body: ''})
    // const bodyInputRef = useRef(); для взятия значения элемента
    const addNewPost = (e) => {
        e.preventDefault(); //чтобы страница не обновлялась
        setPosts([...posts, {...post, id:Date.now()}])
        setPost({title: '', body: ''})
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
    const [modalVisible, setModalVisible] = useState(false);
    // const [isPostsLoading, setIsPostsLoading] = useState(false);

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })


    // async function fetchPosts() {
    //     setIsPostsLoading(true);
    //     const posts = await PostService.getAll();
    //     setPosts(posts);
    //     setIsPostsLoading(false);
    // }
    useEffect(() => {
        fetchPosts();
    },[page]);

    // const sortPosts = (sort) =>{
    //     setSelectedSort(sort);
    // }
    const changePage = (page) => {
        setPage(page);
    }
    return (
        <div className="App">
            {/*<MyButton onClick={fetchPosts}> GET POSTS </MyButton>*/}
            {/*<div className="visually-hidden example1">*/}
            {/*    <Counter/>*/}
            {/*</div>*/}
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
                {
                    postError &&
                    <h1>Произошла ошибка {postError}</h1>
                }
                {isPostsLoading
                    ? <div style={{display:"flex", justifyContent: "center", marginTop: "50px"}}><Loader/></div>
                    : <PostsList posts={sortedAndSearchedPosts} remove={removePost} title='Различные посты'/>

                }
                <Pagination page={page}
                            changePage={changePage}
                            totalPages={totalPages}
                />
            </div>
        </div>
    );
}

export default Posts;
