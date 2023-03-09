import { Auth } from "../types/authTypes";


type AuthAction = 
    | { type: 'login', payload: { accessToken: string, tokenType: string } }
    | { type: 'logout' }

export const authReducer = (state: Auth | null, action: AuthAction): Auth | null => {

    switch (action.type) {
        case 'login':
            return {
                tokenType: action.payload.tokenType,
                accessToken: action.payload.accessToken,
            };
        case 'logout':
            return null;
        default:
            return state;
    }
};
