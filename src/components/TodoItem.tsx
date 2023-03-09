import { Status, Todo } from "../types/todoTypes";

type TodoItemProps = {
    todo: Todo,
    onToggle: (id: string) => void,
    onRemove: (id: string) => void,
    onAbort: (id: string) => void,
    onPause: (id: string) => void,
    onStart: (id: string) => void,
};

const TodoItem = ({ todo, onToggle, onRemove, onStart, onPause, onAbort }: TodoItemProps) => {
    const { id, title, status, createDate, doneDate, deadline, description, tags } = todo;
    return (
        <li className="todo-item">
            <div className="header">
                <span
                    style={{ textDecoration: status === Status.FINISHED ? 'line-through' : 'none' }}
                    onClick={() => onToggle(id)}
                    >
                    {title}
                </span>
                <span>{status}</span>
                <div>
                    <button onClick={() => onStart(id)}>Start</button>
                    <button onClick={() => onPause(id)}>Pause</button>
                    <button onClick={() => onAbort(id)}>Abort</button>
                    <button onClick={() => onToggle(id)}>Toggle</button>
                    <button onClick={() => onRemove(id)}>Remove</button>
                </div>
            </div>
            <div className="body">
                <div className="data">
                    <p>{description}</p>
                    <div>
                        <span>
                            Create date:
                            {createDate.getDate() + "/" + createDate.getMonth()}
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