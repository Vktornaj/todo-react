import { useLayoutEffect, useState } from "react";
import { useRef } from 'react';

import { Status, Todo } from "../types/todoTypes";
import TodoItem from "./TodoItem";
import userService from "../services/user.service";
import styles from "./todos.module.css";


const Todos = () => {

    const [myTodos, setMyTodos] = useState<Array<Todo>>([]);
    const titleInputRef = useRef<HTMLInputElement>(null);

    const updateTodos = () => {
        userService.getTodos(0, 10)
            .then(todo => {
                setMyTodos(todo);
            })
            .catch(err => {
                console.error("Error get todos: ", err);
            });
    };

    useLayoutEffect(updateTodos, []);

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
        userService.postTodo(todo)
            .then(
                _ => {
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
            <div className={styles.add_todo}>
                <span className={styles.label}>Add Todo</span>
                <input ref={titleInputRef} className={styles.input} type="text" onKeyUp={handleKeyUp}/>
                <button className={styles.label} onClick={handleClick} >Add</button>
            </div>
            <ul className={styles.todo_list}>
                {myTodos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    )
};

export default Todos;