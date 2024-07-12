import {observer} from "mobx-react-lite";
import TunaInput from "../components/ui/formControllers/TunaInput";
import {useReducer} from "react";
import {Navigate} from "react-router-dom"
import {userSession} from "../models/users/userSession";
import routesPaths from "./routes/routesPaths";
import "./loginPage.scss";
import TunaButton from "../components/ui/formControllers/tunaButton";
import {ApiError} from "../api";

interface LoginForm {
    userName: string,
    userNameInvalid: boolean,
    userNameFocused: boolean,
    password: string,
    passwordInvalid: boolean,
    passwordFocused: boolean,
}

enum LoginFormActionType {
    'name',
    'password',
    'nameValidity',
    'passwordValidity',
    'setFocus'
}

class LoginFormAction {
    type: LoginFormActionType | undefined = undefined;
    value: string = '';
    validState: boolean = true;
    focusedField: 'userName' | 'password' | undefined;

    constructor(type: LoginFormActionType) {
        this.type = type;
    }

    static setName(value: string): LoginFormAction {
        const action = new LoginFormAction(LoginFormActionType.name);
        action.value = value;
        return action;
    }

    static setPassword(value: string): LoginFormAction {
        const action = new LoginFormAction(LoginFormActionType.password);
        action.value = value;
        return action;
    }

    static setNameValidity(validState: boolean): LoginFormAction {
        const action = new LoginFormAction(LoginFormActionType.nameValidity);
        action.validState = validState;
        return action;
    }

    static setPasswordValidity(validState: boolean) {
        const action = new LoginFormAction(LoginFormActionType.passwordValidity);
        action.validState = validState;
        return action;
    }

    static setFocusedField(field: 'userName' | 'password') {
        const action = new LoginFormAction(LoginFormActionType.setFocus);
        action.focusedField = field;
        return action;
    }
}

function loginFormReducer(state: LoginForm, action: LoginFormAction): LoginForm {
    switch (action.type) {
        case LoginFormActionType.name:
            return {...state, userName: action.value};
        case LoginFormActionType.password:
            return {...state, password: action.value};
        case LoginFormActionType.nameValidity:
            return {...state, userNameInvalid: action.validState};
        case LoginFormActionType.passwordValidity:
            return {...state, passwordInvalid: action.validState};
        case LoginFormActionType.setFocus:
            return {
                ...state,
                userNameFocused: action.focusedField === 'userName',
                passwordFocused: action.focusedField === 'password'
            }
        default:
            throw new Error(`Invalid action type dispatched: ${action.type}`);
    }
}

const loginFormInitialState: LoginForm = {
    userName: '',
    userNameInvalid: false,
    userNameFocused: true,
    password: '',
    passwordInvalid: false,
    passwordFocused: false
};

const LoginPage = observer(() => {
    const [state, dispatch] = useReducer(loginFormReducer, loginFormInitialState);

    function validateUsername(): boolean {
        const userNameInvalid = state.userName.length < 3;
        dispatch(LoginFormAction.setNameValidity(userNameInvalid));
        if (userNameInvalid) {
            dispatch(LoginFormAction.setFocusedField('userName'));
        }
        return !userNameInvalid;
    }

    function validatePassword(): boolean {
        const passwordInvalid = state.password.length === 0;
        dispatch(LoginFormAction.setPasswordValidity(passwordInvalid));
        if (passwordInvalid) {
            dispatch(LoginFormAction.setFocusedField('password'));
        }
        return !passwordInvalid;
    }

    async function submit() {
        const formValid = validateUsername() && validatePassword();
        if (!formValid) {
            return;
        }
        try {
            await userSession.auth(state.userName, state.password);
        } catch (error: any) {
            if (error instanceof ApiError) {
                if (error.status === 400) {
                    dispatch(LoginFormAction.setPasswordValidity(true));
                    return;
                }
            }
            console.error(error);
        }
    }

    function keyPressed({code}: { code: string | undefined }) {
        if (code?.toLowerCase() === 'enter') {
            submit();
        }
    }

    if (userSession.authenticated) {
        return (<Navigate to={routesPaths.home}/>);
    }

    return (
        <div className="page login-page">
            <h1 className="txt-header--1">Login/Register</h1>
            <p>Just enter your username<br/>and password<br/>or come up with a new one</p>
            <div className="login-page__row">
                <label className="login-page__row-label" htmlFor="userName">Username:</label>
                <TunaInput value={state.userName}
                           onChange={e => dispatch(LoginFormAction.setName(e.target.value))}
                           onKeyDown={keyPressed}
                           invalid={state.userNameInvalid}
                           id="userName"
                           inputFocused={state.userNameFocused}
                           tid="userName"/>
            </div>
            <div className="login-page__row">
                <label className="login-page__row-label" htmlFor="password">Password:</label>
                <TunaInput type="password"
                           value={state.password}
                           onChange={e => dispatch(LoginFormAction.setPassword(e.target.value))}
                           onKeyDown={keyPressed}
                           invalid={state.passwordInvalid}
                           id="password"
                           inputFocused={state.passwordFocused}
                           tid="password"/>
            </div>
            <div className="login-page__btn-row login-page__btn-row--centred">
                <TunaButton type="button" onClick={submit} tid='submitLoginForm'>Login / Register</TunaButton>
            </div>
        </div>
    );
});

export default LoginPage;
