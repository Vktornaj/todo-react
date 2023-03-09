import { Status, Todo } from "./types/todoTypes";
import { User } from "./types/userTypes";


export const myUser: User = {
    username: "vktornaj",
    firstName: "Victor Eduardo",
    lastName: "Garcia Najera",
}

export const myTodos: Array<Todo> = [
    {
        id: "0",
        title: "Code frontend",
        description: "Write a Todo APP on React JS",
        status: Status.STARTED,
        createDate: new Date(),
        doneDate: null,
        deadline: null,
        tags: ["frontend", "react", "todo"]
    },
    {
        id: "1",
        title: "Code backend",
        description: "Write a Todo API on Rust",
        status: Status.PENDING,
        createDate: new Date(),
        doneDate: null,
        deadline: null,
        tags: ["backend", "rust", "todo"]
    }
]