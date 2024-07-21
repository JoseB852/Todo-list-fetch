
import React, { useEffect, useState } from 'react'



export const Todolist = () => {

    const [inputValue, setInputValue] = useState("")
    const [todos, setTodos] = useState([])

    const getList = async () => {

        fetch('https://playground.4geeks.com/todo/users/Jose', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setTodos(data.todos))
            .catch((error) => console.log(error));
    };



    const post = async (obj) => {
        fetch("https://playground.4geeks.com/todo/todos/Jose", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },


        })

            .then((response) => response.json())
            .then((data) => setTodos(todos.concat(data)))
            .catch((error) => console.log(error));

    };

    const delet = async (id) => {
        fetch("https://playground.4geeks.com/todo/todos/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

            .then((resp) => {

                if (resp.ok)
                    setTodos(todos.filter((todo) => id !== todo.id))
            })
            .catch((error) => console.log(error));
    };



    useEffect(() => {
        getList();
    }, [])

    return (

        <div className='container'>

            <h1>Todo List <i className="fa-solid fa-check"></i></h1>
            <input type="text" onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        const obj = { label: inputValue, is_done: false }
                        post(obj);
                        setInputValue("");
                    }
                }}
                placeholder='what do you need to do' />
            <ul>


                {todos.map((item) =>
                    <li key={item.id}>
                        {item.label}
                        <i className="fa-solid fa-x" onClick={() => delet(item.id)}></i>
                    </li>)}
            </ul>

            <div className='tareas'>{todos.length}Tareas</div>
        </div>

    )
}
export default Todolist