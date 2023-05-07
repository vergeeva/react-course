import {useMemo} from "react";

export const useSortedPosts = (posts, methodSort) => {
    const sortedPosts = useMemo(() => {
        if (methodSort)
        {
            return [...posts].sort((a,b)=> a[methodSort].localeCompare(b[methodSort]));
        }
        return posts;

    }, [methodSort, posts])
    return sortedPosts
}

export const usePosts = (posts, methodSort, searchQuery) => {
    const sortedPosts = useSortedPosts(posts, methodSort);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, sortedPosts])
    return sortedAndSearchedPosts;
}