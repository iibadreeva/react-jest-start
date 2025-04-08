import {useState} from "react";

import List from './List';
import Form from './Form';

const data = [
    {
        id: '1',
        title: 'Test',
    },
    {
        id: '2',
        title: 'Test 2',
    }
]

const Todo = () => {
    const [items, setItems] = useState(data);

    const deleteHandler = (id) => {
        setItems(items => items.filter(item => item.id !== id))
    }

    const createHandler = (value) => {
        const newItem = {
                id: Math.random().toString(36).substr(2),
                title: value,
            };
        setItems(items => [...items, newItem]);
    }

    return <div>
        <Form createHandler={value => createHandler(value)} />
        <List items={items} deleteHandler={deleteHandler} />
    </div>
}

export default Todo