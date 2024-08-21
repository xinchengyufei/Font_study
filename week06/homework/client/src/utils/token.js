// token相关的增删改查

const TOKENKEY = "Tokenkey"
export const setToken = (value) => {
    localStorage.setItem(TOKENKEY, value)
}

export const getToken = () => {
    return localStorage.getItem(TOKENKEY)
}

export const removeToken = () => {
    return localStorage.removeItem(TOKENKEY)
}