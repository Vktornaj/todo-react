import { adapterEndpointTodo, adapterMyTodo, adapterMyTodoUpdate } from '../adapters/todo.adapter';
import { adapterEndpointUser } from '../adapters/user.adapter';
import authHeader from '../interceptors/authHeader';
import { UserEndpoint, TodoEndpoint } from '../types/endpointTypes';
import { Todo, TodoUpdate } from '../types/todoTypes';


const API_URL = 'http://127.0.0.1:8000';

const api = async <T>(url: string, requestInit: RequestInit): Promise<T> => {
    const response = await fetch(url, requestInit);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await (response.json() as Promise<T>);
}

class UserService {
    async getUserInfo() {
        let res =  api<UserEndpoint>(
            API_URL + '/api/user/info', { headers: authHeader(), method: 'GET' }
        );
        return adapterEndpointUser(await res);
    }

    async getTodos(from: number, to: number) {
        let res = api<Array<TodoEndpoint>>(
            API_URL + `/api/todos/${from}/${to}`, { headers: authHeader(), method: 'GET' }
        );
        let r = (await res).map(async todo => adapterEndpointTodo(todo));
        return Promise.all(r);
    }

    async deleteTodo(id: string) {
        let res = api<TodoEndpoint>(
            API_URL + `/api/todo/${id}/`, { headers: authHeader(), method: 'DELETE' }
        );
        return adapterEndpointTodo(await res);
    }
    
    async putTodo(todo: TodoUpdate) {
        let _todo = adapterMyTodoUpdate(todo);
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", authHeader().Authorization);
        let res = api<TodoEndpoint>(
            API_URL + `/api/todo`,
            { headers, method: 'PUT', body: JSON.stringify(_todo) }
        );
        return adapterEndpointTodo(await res);
    }
    
    async putTodoTag(id: string, tag: string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", authHeader().Authorization);
        let res = api<TodoEndpoint>(
            API_URL + `/api/todo/${id}/tag/${tag}`,
            { headers, method: 'PUT', body: JSON.stringify({ tag }) }
        );
        return adapterEndpointTodo(await res);
    }
   
    async deleteTodoTag(id: string, tag: string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", authHeader().Authorization);
        let res = api<TodoEndpoint>(
            API_URL + `/api/todo/${id}/tag/${tag}`,
            { headers, method: 'DELETE', body: JSON.stringify({ tag }) }
        );
        return adapterEndpointTodo(await res);
    }
    
    async postTodo(todo: Todo) {
        let _todo = adapterMyTodo(todo);
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", authHeader().Authorization);
        let res = api<TodoEndpoint>(
            API_URL + `/api/todo`, 
            { headers, method: 'POST', body: JSON.stringify(_todo) }
        );
        return adapterEndpointTodo(await res);
    }
}

export default new UserService();