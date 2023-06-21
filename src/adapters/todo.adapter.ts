import { Todo, TodoUpdate } from "../types/endpointTypes";
import { Todo as MyTodo, Status, TodoUpdate as MyTodoUpdate} from "../types/todoTypes";


const addapterEndpointStatus = (status: string) => {
    switch (status) {
        case "PENDING":
            return Status.PENDING;
        case "STARTED":
            return Status.STARTED;
        case "DONE":
            return Status.DONE;
        case "PAUSED":
            return Status.PAUSED;
        case "ABORTED":
            return Status.ABORTED;
        default:
            throw new Error("Status not found");
    }
};

export const addapterEndpointTodo = (todo: Todo) => {
    const formattedTodo: MyTodo = {
        id: todo.id || "",
        title: todo.title,
        description: todo.description,
        status: addapterEndpointStatus(todo.status),
        createDate: todo.createDate ? new Date(todo.createDate) : null,
        doneDate: todo.doneDate ? new Date(todo.doneDate) : null,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
        tags: todo.tags,
    };
    return formattedTodo;
};

export const addapterMyTodo = (myTodo: MyTodo) => {
    const formattedTodo: Todo = {
        id: myTodo.id,
        title: myTodo.title,
        description: myTodo.description,
        status: myTodo.status,
        createDate: myTodo.createDate?.toJSON() || null,
        doneDate: myTodo.doneDate?.toJSON() || null,
        deadline: myTodo.deadline?.toJSON() || null,
        tags: myTodo.tags,
    };
    return formattedTodo;
};

export const adapterMyTodoUpdate = (myTodo: MyTodoUpdate) => {
    if (myTodo.id === null) {
        throw new Error("TodoUpdate needs the id");
    }
    const formattedTodo: TodoUpdate = {
        id: myTodo.id,
        title: myTodo.title,
        description: myTodo.description,
        status: myTodo.status,
        doneDate: myTodo.doneDate?.toJSON() || null,
        deadline: myTodo.deadline?.toJSON() || null,
    };
    return formattedTodo;
};