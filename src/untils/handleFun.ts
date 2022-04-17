import { locateType, cityAbout, listItem } from "./types";
import api from "../server/api";

export const formatCityData = (list: locateType[]): cityAbout => {

    const cityList: listItem = {}

    list.forEach((itemCity) => {
        const first = itemCity.short.slice(0, 1)
        if (cityList[first]) {
            cityList[first].push(itemCity)
        } else {
            cityList[first] = [itemCity]
        }
    })

    const cityIndex = Object.keys(cityList).sort()

    return {
        cityList,
        cityIndex
    }
}

export const getCurrentCity = () => {
    const localCity = JSON.parse(localStorage.getItem('hkzf_city') as string)
    if (!localCity) {
        return new Promise((resolve, reject) => {
            const curCity = new BMapGL.LocalCity()
            curCity.get((res) => {
                try {
                    api.getLocateInfo(res.name).then((result) => {
                        if (result.status === 200) {
                            console.log("保存数据");
                            localStorage.setItem('hkzf_city', JSON.stringify(result.body))
                            resolve(result.body)
                        }
                    })
                } catch (e) {
                    reject(e)
                }
            })
        })
    }

    return Promise.resolve(localCity)
}

export const formatCityIndex = (letter: string): string => {
    switch (letter) {
        case '#':
            return '当前定位'
        case 'hot':
            return '热门城市'
        default:
            return letter.toLocaleUpperCase()
    }
}