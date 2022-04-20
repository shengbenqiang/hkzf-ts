import axios from "axios";

const http = axios.create({
    timeout: 5000,
    baseURL: "http://localhost:8080"
});

http.interceptors.request.use((config) => {
    return config
})

http.interceptors.response.use((response) => {
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
    }
}

export default api;
