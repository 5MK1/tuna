import {observer} from "mobx-react-lite";
import TunaInput from "../components/ui/formControllers/TunaInput";
import {useReducer} from "react";

interface LoginForm {
    userName: string,
    userNameInvalid: boolean,
    password: string,
    passwordInvalid: boolean
}

enum LoginFormActionType {
    'name',
    'password',
    'nameValidity',
    'passwordValidity',
}

class LoginFormAction {
    type: LoginFormActionType | undefined = undefined;
    value: string = '';
    validState: boolean = true;

    static setName(value: string) {
        return {type: LoginFormActionType.name, value, validState: true};
    }

    static setPassword(value: string) {
        return {type: LoginFormActionType.password, value, validState: true};
    }

    static setNameValidity(validState: boolean) {
        return {type: LoginFormActionType.nameValidity, validState, value: ''};
    }

    static setPasswordValidity(validState: boolean) {
        return {type: LoginFormActionType.passwordValidity, validState, value: ''};
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
        default:
            throw new Error(`Invalid action type dispatched: ${action.type}`);
    }
}

const loginFormInitialState: LoginForm = {
    userName: '',
    userNameInvalid: false,
    password: '',
    passwordInvalid: false
};

const LoginPage = observer(() => {
    const [state, dispatch] = useReducer(loginFormReducer, loginFormInitialState);

    function validateUsername(): boolean {
        const userNameInvalid = state.userName.length < 3;
        dispatch(LoginFormAction.setNameValidity(userNameInvalid));
        return !userNameInvalid;
    }

    function validatePassword(): boolean {
        const passwordInvalid = state.password.length === 0;
        dispatch(LoginFormAction.setPasswordValidity(passwordInvalid));
        return !passwordInvalid;
    }

    function submit() {
        const formValid = validateUsername() && validatePassword();
        if (!formValid) {
            return;
        }

        console.log(state.userName, state.password);
    }

    function keyPressed({code}: { code: string }) {
        if (code.toLowerCase() === 'enter') {
            submit();
        }
    }

    return (
        <div className="app-root">
            <div className="login-page">
                <div className="login-page__row">
                    <label className="login-page__row-label">Username:</label>
                    <TunaInput value={state.userName}
                               onChange={e => dispatch(LoginFormAction.setName(e.target.value))}
                               onKeyDown={keyPressed}
                               invalid={state.userNameInvalid}/>
                </div>
                <div className="login-page__row">
                    <label className="login-page__row-label">Password:</label>
                    <TunaInput type="password"
                               value={state.password}
                               onChange={e => dispatch(LoginFormAction.setPassword(e.target.value))}
                               onKeyDown={keyPressed}
                               invalid={state.passwordInvalid}/>
                </div>
                <div className="login-page__btn-row">
                    <button type="button"
                            onClick={submit}>Login / Register
                    </button>
                </div>
            </div>
        </div>
    );
});

export default LoginPage;
