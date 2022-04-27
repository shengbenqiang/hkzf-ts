import axios from "axios";
import {loginData, strObj} from "../untils/types";
import {getToken, removeToken} from "../untils/auth";

const http = axios.create({
    timeout: 5000,
    baseURL: "http://localhost:8080"
});

http.interceptors.request.use((config) => {
    if (config.url?.startsWith('/user') && !config.url?.startsWith('/user/login') && !config.url?.startsWith('/user/registered')) {
        // @ts-ignore
        config.headers.Authorization = getToken()
    }
    return config
})

http.interceptors.response.use((response) => {
    const { status } = response.data
    if (status === 400) {
        removeToken()
    }
    return response
}, function (error) {
    return Promise.reject(error)
})

const api =  {
    async getSwiper() {
        return await http.get("/home/swiper")
            .then((res) => {
                return res.data;
            })
    },

    async getRentGroup() {
        return await http.get('/home/groups', {
            params: {
                area: "AREA%7C88cff55c-aaa4-e2e0"
            }
        })
            .then((res) => {
                return res.data;
            })
    },

    async getNews() {
        return await http.get('/home/news', {
            params: {
                area: "AREA%7C88cff55c-aaa4-e2e0"
            }
        })
            .then((res) => {
                return res.data;
            })
    },

    async getLocateInfo(cityName: string) {
        return await http.get('/area/info', {
            params: {
                name: cityName,
            }
        })
            .then((res) => {
                return res.data;
            })
    },

    async getCityDate(level: number) {
        return await http.get('/area/city', {
            params: {
                level
            }
        })
            .then((res) => {
                return res.data;
            })
    },

    async getHotCity() {
        return await http.get('/area/hot')
            .then((res) => {
                return res.data;
            })
    },

    async getCityHouse(id: string) {
        return await http.get('/area/map', {
            params: {
                id
            }
        })
            .then((res) => {
                return res.data;
            })
    },

    async getNeighbourhood(id: string) {
        return await http.get('/houses', {
            params: {
                cityId: id
            }
        })
            .then((res) => {
                return res.data;
            })
    },

    async getCondition(id: string) {
        return await http.get('/houses/condition', {
            params: {
                id,
            }
        })
            .then((res) => {
                return res.data;
            })
    },

    async getHouseList(cityId: string, filters: strObj, start: number, end: number) {
        return await http.get('/houses', {
            params: {
                cityId,
                ...filters,
                start,
                end
            }
        })
            .then((res) => {
                return res.data;
            })
    },

    async getHouseInfo(houseId: string) {
        return await http.get(`/houses/${houseId}`)
            .then((res) => {
                return res.data;
            })
    },

    async userLogin(user: loginData) {
        return await http.post('/user/login', {
            username: user.account,
            password: user.password
        })
            .then((res) => {
                return res.data;
            })
    },

    async getUser() {
        return await http.get('/user')
            .then((res) => {
                return res.data;
            })
    },

    async logout() {
        return await http.post('/user/logout')
            .then((res) => {
                return res.data;
            })
    },

    async getFavoritesInfo(id: string) {
        return await http.get(`/user/favorites/${id}`)
            .then((res) => {
                return res.data;
            })
    },

    async cancelFavorites(id: string) {
        return await http.delete(`/user/favorites/${id}`)
            .then((res) => {
                return res.data;
            })
    },

    async addFavorites(id: string) {
        return await http.post(`/user/favorites/${id}`)
            .then((res) => {
                return res.data;
            })
    },

    async getFavoritesList() {
        return await http.get('/user/favorites')
            .then((res) => {
                return res.data;
            })
    },

    async getReleaseRent() {
        return await http.get('/user/houses')
            .then((res) => {
                return res.data;
            })
    },

    async getAreaList(name: string, id: string) {
        return await http.get('/area/community', {
            params: {
                name,
                id
            }
        })
            .then((res) => {
                return res.data;
            })
    }
}

export default api;
