import { myTodos } from "../fakeData";
import TodoItem from "./TodoItem";


const handleToggle = (id: string) => {
    console.log(id);
}

const handleRemove = (id: string) => {
    console.log(id);
}

const handlePause = (id: string) => {
    console.log(id);
}

const handleAbort = (id: string) => {
    console.log(id);
}

const handleStart = (id: string) => {
    console.log(id);
}

const Todos = () => {
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
                        onToggle={handleToggle} 
                        onRemove={handleRemove}
                        onPause={handlePause}
                        onAbort={handleAbort}
                        onStart={handleStart}
                    />
                ))}
            </ul>
        </div>
    )
};

export default Todos;