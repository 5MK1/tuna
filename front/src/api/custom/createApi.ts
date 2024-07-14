import {Api} from "../Api";

export function createApi(): Api {
    return new Api({BASE: 'https://localhost:5050', CREDENTIALS: 'include', WITH_CREDENTIALS: true});
}