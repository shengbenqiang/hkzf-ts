const TOKEN: string = "hkzf_token"

const getToken = () => localStorage.getItem(TOKEN)

const setToken = (token: string) => localStorage.setItem(TOKEN, token)

const removeToken = () => localStorage.removeItem(TOKEN)

const isAuth = () => !!getToken()

export {
    isAuth,
    getToken,
    setToken,
    removeToken
}