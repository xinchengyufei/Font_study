import { INCREMENT, DECREMENT, UPDATENAME } from "./actionsTypes"

export const incremen = (payload) => {
    return {
        type : INCREMENT,
        payload,
    }
}

export const decremen = (payload) => {
    return {
        type : DECREMENT,
        payload,
    }
}

export const updatename = (payload) => {
    return {
        type : UPDATENAME,
        payload,
    }
}