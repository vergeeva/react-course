import React from 'react';
import MyInput from "../UI/Input/MyInput";
import MySelect from "../UI/Select/MySelect";

const PostFilter = (props) => {
    return (
        <div>
            <MyInput
                value={props.filter.searchQuery}
                onChange={e => props.setFilter({...props.filter, searchQuery: e.target.value})}
                placeholder='Поиск...'
            />
            <MySelect
                value={props.filter.sortQuery}
                onChange={selectedSort => props.setFilter({...props.filter, sortQuery: selectedSort})}
                defaultValue = "Сортировка"
                options ={[
                    {value:'title', name:'По названию'},
                    {value: 'description', name: 'По описанию'}
                ]}
            />
        </div>
    );
};

export default PostFilter;