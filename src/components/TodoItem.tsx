import { Status, Todo } from "../types/todoTypes";
import userService from "../services/user.service";
import { TodoUpdate } from "../types/todoTypes";
import { adapterMyTodoUpdate, addapterEndpointTodo } from "../adapters/todo.adapter";
import { useRef, useState } from "react";


type TodoItemProps = { todo: Todo };

const TodoItem = ({ todo }: TodoItemProps) => {

    const [myTodo, setMyTodo] = useState<Todo | null>(todo);
    const addTagInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null);

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

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as Status;
        handleSetTodoStatus(id, status);
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if(addTagInputRef.current === null || addTagInputRef.current.value === "") {
                return;
            }
            const tag = addTagInputRef.current.value;
            userService.putTodoTag(id, tag)
                .then(todo => {
                    addTagInputRef.current!.value = "";
                    setMyTodo(addapterEndpointTodo(todo));
                })
                .catch(err => {
                    addTagInputRef.current!.value = "";
                    console.error("Error adding tag: ", err);
                });
        }
    };

    const handleRemoveTag = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const tag = e.currentTarget.textContent;
        if (tag === null) {
            return;
        }
        userService.deleteTodoTag(id, tag)
            .then(todo => setMyTodo(addapterEndpointTodo(todo)))
            .catch(err => console.error("Error removing tag: ", err));
    };

    const handleUpdateDescription = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if(descriptionInputRef.current === null || descriptionInputRef.current.value === "") {
                return;
            }
            const description = descriptionInputRef.current.value;
            const todo: TodoUpdate = {
                id,
                title: null,
                description,
                status: null,
                doneDate: null,
                deadline: null
            };
            userService.putTodo(adapterMyTodoUpdate(todo))
                .then(todo => setMyTodo(addapterEndpointTodo(todo)))
                .catch(err => console.error("Error updating description: ", err));
        }
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
                <label htmlFor="status">Status</label>
                <select 
                    name="status" 
                    id="status" 
                    onChange={handleOnChange}
                    defaultValue={status}
                >
                    <option value={Status.PENDING}>Pending</option>
                    <option value={Status.STARTED}>Started</option>
                    <option value={Status.PAUSED}>Paused</option>
                    <option value={Status.ABORTED}>Aborted</option>
                    <option value={Status.DONE}>Done</option>
                </select>
                <button onClick={() => handleRemove(id)}>Remove</button>
            </div>
            <div className="body">
                <div className="data">
                    <input ref={descriptionInputRef} onKeyUp={handleUpdateDescription} type="text" name="description" id="description" defaultValue={description} />
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
                        <span onClick={handleRemoveTag} key={tag} className="tag">{tag}</span>
                    ))}
                    <input ref={addTagInputRef} onKeyUp={handleAddTag} type="text" name="addeTag" id="addTag" />    
                </div>
            </div>
        </li>
    );
};

export default TodoItem;