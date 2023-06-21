import { useLayoutEffect, useState } from "react";
import { useRef } from 'react';

import { Status, Todo } from "../types/todoTypes";
import TodoItem from "./TodoItem";
import userService from "../services/user.service";
import { addapterEndpointTodo, addapterMyTodo } from "../adapters/user";


const Todos = () => {

    const [myTodos, setMyTodos] = useState<Array<Todo>>([]);
    const titleInputRef = useRef<HTMLInputElement>(null);

    const updateTodos = () => {
        userService.getTodos(0, 10)
            .then((res) => {
                const todos = res.map(addapterEndpointTodo);
                setMyTodos(todos);
            })
            .catch(_ => {
                console.error("Error get todos");
            });
    };

    useLayoutEffect(updateTodos, []);

    const handleSetTodoStatus = (id: string, status: Status) => {
        userService.putTodoStatus(id, status)
            .then(_ => updateTodos())
            .catch(_ => {
                console.error(`Error on set ${status} todo`);
            });
    };

    const handleRemove = (id: string) => {
        userService.deleteTodo(id)
            .then(_ => updateTodos())
            .catch(_ => console.error("Error removing todo"));
    };

    const addTodo = (title: string) => {
        const todo: Todo = {
            id: null,
            title: title,
            description: "",
            status: Status.PENDING,
            createDate: null,
            doneDate: null,
            deadline: null,
            tags: []
        };
        console.log(addapterMyTodo(todo));
        userService.postTodo(addapterMyTodo(todo))
            .then(
                (_) => {
                    updateTodos();
                    if (!titleInputRef.current) {
                        return
                    }
                    titleInputRef.current.value = "";
                }
            )
            .catch(
                (err) => console.log("err:", err)
            );
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (!titleInputRef.current) {
                return
            }
            addTodo(titleInputRef.current.value);
        }
    };
   
    const handleClick = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!titleInputRef.current) {
            return
        }
        addTodo(titleInputRef.current.value);
    };

    return(
        <div className="container">
            <h2>Todos</h2>
            <div className="add-todo">
                <span className="label">Add Todo</span>
                <input ref={titleInputRef} className="input" type="text" onKeyUp={handleKeyUp}/>
                <button className="button" onClick={handleClick} >Add</button>
            </div>
            <ul className="todo-list">
                {myTodos.map(todo => (
                    <TodoItem 
                        key={todo.id} 
                        todo={todo} 
                        handleSetTodoStatus={handleSetTodoStatus} 
                        onRemove={handleRemove}
                    />
                ))}
            </ul>
        </div>
    )
};

export default Todos;