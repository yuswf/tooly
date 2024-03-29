import {useState} from 'react';
import Image from 'next/image';
import {useDispatch, useSelector} from 'react-redux';
import Skeleton from 'react-loading-skeleton';

function ToDoListComponent() {
    const dispatch = useDispatch();
    const {data: {id, username, avatar}} = useSelector(state => state.user);

    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
    // const [showModal, setShowModal] = useState(false);

    const addTodo = () => {
        if (todo === '') return;
        if (todos.length > 0 && todos.map(todo => todo.name).includes(todo)) return;
        if (todo.length > 65) return;

        const newTodo = {
            name: todo,
            completed: false
        }

        setTodos([newTodo, ...todos]);
        localStorage.setItem('todos', JSON.stringify([newTodo, ...todos]));
        setTodo('');
    }

    /*
    const openModal = (todo) => {
        dispatch(SetTodo(todo));
        setShowModal(true);
    }
    */

    const completeTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    
    const deleteTodo = i => {
        setTodos(todos.filter((todo, index) => index !== i));
        if (JSON.parse(localStorage.getItem('todos')).length === 1) return localStorage.removeItem('todos');
        localStorage.setItem('todos', JSON.stringify(todos.filter((todo, index) => index !== i)));
    }

    return (
        <div className="ml-auto mr-auto bg-[#1f2024] w-8/12 max-sm:w-80 rounded">
            <div className="flex justify-between items-center p-6">
                <h1 className="text-white font-bold text-xl">To-Do List</h1>
                
                <div className="flex items-center">
                    <h1 className="text-white font-bold text-xl mr-2">{username}</h1>
                    {avatar ? <Image width={32} height={32} className="h-8 w-8 rounded-full" src={process.env.avatarBase + `/${id}/${avatar}`} alt="avatar"/> : <Skeleton circle={true} width={32} height={32} />}
                </div>
            </div>

            <div className="flex gap-3 justify-between items-center p-8">
                <input maxLength={65} minLength={1} value={todo} onKeyDown={(e) => e.key === 'Enter' ? addTodo() : ''} onChange={(e) => setTodo(e.target.value)} type="text" className="outline-none bg-[#2f3035] text-white w-10/12 rounded p-2" placeholder="Add a new task..."/>
                <button type="submit" onClick={addTodo} disabled={todo === ''} className="disabled:bg-opacity-30 disabled:cursor-not-allowed transition-all bg-green-700 bg-opacity-75 text-white w-2/12 max-sm:w-16 rounded p-2">Add</button>
            </div>

            <div className="flex todos-d flex-col gap-3 justify-between items-center p-8">
                {todos.length > 0 ? todos.map((todo, index) => (
                    <div key={index} className="flex gap-3 justify-between items-center w-full">
                        {/*<span className="lg:hidden cursor-pointer text-xs font-bold text-gray-400 text-opacity-75">View</span>*/}
                        <h2 onClick={() => completeTodo(index)} className={`${todo.completed ? 'line-through text-green-400' : 'text-white'} transition-all cursor-pointer truncate font-bold text-base`}>{todo.name}</h2>
                        <button onClick={() => deleteTodo(index)} className="bg-red-800 bg-opacity-75 text-white w-2/12 max-sm:w-16 rounded p-2">Delete</button>
                    </div>
                )) : <h1 className="text-white font-bold text-xl mb-10">No tasks yet!</h1>}
            </div>
        </div>
    )
}

export default ToDoListComponent;
