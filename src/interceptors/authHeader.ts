import { Auth } from "../types/authTypes";


export default function authHeader(): { Authorization: string } {
    const data = localStorage.getItem("auth");
    if (!data) {
        return { Authorization: '' }; // for Spring Boot back-end
        // return { 'x-access-token': null }; // for Node Express back-end
    }

    const parsedData = JSON.parse(data);
    const auth: Auth = {
        accessToken: parsedData['accessToken'],
        tokenType: parsedData['tokenType'],
    };
    return { Authorization: `${auth.tokenType} ${auth.accessToken}` }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
}
