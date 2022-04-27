const TOKEN = 'hkzf_city'

const getCity = () => JSON.parse(localStorage.getItem(TOKEN) as  string) || {}

const setCity = (value: string) => localStorage.setItem(TOKEN, value)

export {
    getCity,
    setCity
}