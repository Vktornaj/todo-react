import { Status, Todo } from "../types/todoTypes";


type TodoItemProps = {
    todo: Todo,
    handleSetTodoStatus: (id: string, status: Status) => void,
    onRemove: (id: string) => void,
};

const TodoItem = ({ todo, handleSetTodoStatus, onRemove }: TodoItemProps) => {
    const { id, title, status, createDate, doneDate, deadline, description, tags } = todo;
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
                    <button onClick={() => onRemove(id)}>Remove</button>
                </div>
            </div>
            <div className="body">
                <div className="data">
                    <p>{description}</p>
                    <div>
                        <span>
                            Create date:
                            {createDate ?
                                createDate.getDate() + "/" + createDate.getMonth()
                                : "None"
                            }
                        </span>
                        <span>
                            Terminate Date:
                            {doneDate ?
                                doneDate.getDate() + "/" + doneDate.getMonth()
                                : "None"
                            }
                        </span>
                        <span>
                            Deadline:
                            {deadline ?
                                deadline.getDate() + "/" + deadline.getMonth()
                                : "None"
                            }
                        </span>
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