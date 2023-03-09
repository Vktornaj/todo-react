import { useLayoutEffect, useState } from "react";

import { Status, Todo } from "../types/todoTypes";
import TodoItem from "./TodoItem";
import userService from "../services/user.service";
import { addapterEndpointTodo, addapterMyTodo } from "../adapters/user";


const Todos = () => {

    const [myTodos, setMyTodos] = useState<Array<Todo>>([]);

    const updateTodos = () => {
        userService.getTodos()
            .then((res) => {
                const todos = res.map(addapterEndpointTodo);
                setMyTodos(todos);
            })
            .catch(_ => {
                console.error("Error get todos");
            });
    }

    useLayoutEffect(updateTodos, []);

    const handleSetTodoStatus = (id: string, status: Status) => {
        userService.putTodoStatus(id, status)
            .then(_ => updateTodos())
            .catch(_ => {
                console.error(`Error on set ${status} todo`);
            });
    }

    const handleRemove = (id: string) => {
        userService.deleteTodo(id)
            .then(_ => updateTodos())
            .catch(_ => console.error("Error removing todo"));
    }

    return(
        <div className="container">
            <h2>Todos</h2>
            <div className="add-todo">
                <span className="label">Add Todo</span>
                <input className="input" type="text"/>
                <button className="button" >Add</button>
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