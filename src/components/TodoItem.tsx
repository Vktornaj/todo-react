import { Status, Todo } from "../types/todoTypes";
import userService from "../services/user.service";
import { TodoUpdate } from "../types/todoTypes";
import { adapterMyTodoUpdate, addapterEndpointTodo } from "../adapters/todo.adapter";
import { useState } from "react";


type TodoItemProps = { todo: Todo };

const TodoItem = ({ todo }: TodoItemProps) => {

    const [myTodo, setMyTodo] = useState<Todo | null>(todo);

    if (myTodo == null) {
        return(<></>);
    }

    const { id, title, status, createDate, doneDate, deadline, description, tags } = myTodo;

    if (id == null) {
        throw new Error("id can't be null in this context");
    }
    
    const handleRemove = (id: string) => {
        userService.deleteTodo(id)
            .then(_ => setMyTodo(null))
            .catch(err => console.error("Error removing todo: ", err));
    };

    const handleSetTodoStatus = (id: string, status: Status) => {
        const todo: TodoUpdate = {
            id,
            title: null,
            description: null,
            status,
            doneDate: null,
            deadline: null
        };
        userService.putTodo(adapterMyTodoUpdate(todo))
            .then(todo => setMyTodo(addapterEndpointTodo(todo)))
            .catch(_ => {
                console.error(`Error on set ${status} todo`);
            });
    };

    const handleInputDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value);
        const todo: TodoUpdate = {
            id,
            title: null,
            description: null,
            status: null,
            doneDate: null,
            deadline: date
        };
        userService.putTodo(adapterMyTodoUpdate(todo))
            .then(todo => setMyTodo(addapterEndpointTodo(todo)))
            .catch(_ => console.error(`Error on set deadline todo`) );
    };

    if (id == null) {
        throw new Error("id can't be null in this context");
    }
    return (
        <li className="todo-item">
            <div className="header">
                <span style={{ textDecoration: status === Status.DONE ? 'line-through' : 'none' }}>
                    {title}
                </span>
                <span>{status}</span>
                <div>
                    <button onClick={() => handleSetTodoStatus(id, Status.STARTED)}>Start</button>
                    <button onClick={() => handleSetTodoStatus(id, Status.PAUSED)}>Pause</button>
                    <button onClick={() => handleSetTodoStatus(id, Status.ABORTED)}>Abort</button>
                    <button onClick={() => handleSetTodoStatus(id, Status.DONE)}>Terminate</button>
                    <button onClick={() => handleRemove(id)}>Remove</button>
                </div>
            </div>
            <div className="body">
                <div className="data">
                    <p>{description}</p>
                    <div>
                        <div className="date-section">
                            <span>Create Date:</span>
                            <span className="date">
                                {createDate ?
                                    `${createDate.getUTCDate()}/${createDate.getUTCMonth()}/${createDate.getUTCFullYear()}`
                                    : "None"
                                }
                            </span>
                        </div>
                        <div className="date-section">
                            <span>Terminate Date:</span>
                            <span className="date">
                                {doneDate ?
                                    `${doneDate.getUTCDate()}/${doneDate.getUTCMonth()}/${doneDate.getUTCFullYear()}`
                                    : "None"
                                }
                            </span>
                        </div>
                        <div className="date-section">
                            <span>Deadline:</span>
                            <div>
                                <span className="date">
                                    {deadline ?
                                        `${deadline.getUTCDate()}/${deadline.getUTCMonth()}/${deadline.getUTCFullYear()}`
                                        : "None"
                                    }
                                </span>
                                <input onChange={handleInputDate} type="date" name="deadline" id="deadline" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tags">
                    {tags && tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </li>
    );
};

export default TodoItem;