import React, { useState, useEffect } from "react";
import NavHeader from "../../components/NavHeader";
import api from "../../server/api";
import "./Map.css";
import { labelType, roomType } from "../../untils/types";
import HouseItem from "../../components/HouseItem";
import { Toast } from "antd-mobile";

const labelStyle = {
    cursor: "pointer",
    border: "2px solid rgb(255, 0, 0)",
    padding: '0',
    whiteSpace: 'nowrap',
    fontSize: '1.2rem',
    color: 'rgb(255, 255, 255)',
    textAlign: "center",
}
const Map = () => {

    const [ neighbourhood, setNeighbourhood ] = useState<roomType[]>([])

    const createMap = () => {
        const locate = JSON.parse(localStorage.getItem('hkzf_city') as string)
        const map = new BMapGL.Map("container")
        const myGeo = new BMapGL.Geocoder()
        myGeo.getPoint(locate.label, (point) => {
            if (point) {
                map.centerAndZoom(point, 11)
                // 开启鼠标滚动地图缩放
                // map.enableScrollWheelZoom()
                renderOverlays(locate.value, map)
            }
        }, locate.label)
        map.addEventListener("movestart", () => {
            setNeighbourhood([])
        })
    }

    const renderOverlays = (id: string, map: BMapGL.Map) => {
        const toastOne = Toast.show({
            icon: 'loading',
            content: '加载中…',
            duration: 0
        })
        const { nextZoom, type } = getTypeAndZoom(map)
        api.getCityHouse(id).then((res) => {
            if (res.status === 200) {
                toastOne.close()
                res.body.forEach((itemLocate: labelType) => {
                    createOverlays(itemLocate, map, type, nextZoom)
                })
            }
        })
    }

    const getTypeAndZoom = (map: BMapGL.Map): { nextZoom: number, type: string } => {
        const zoom = map.getZoom()
        let nextZoom: number = 0
        let type: string = ""
        if (zoom >=10 && zoom < 12) {
            nextZoom = 13
            type = "circle"
        } else if (zoom >= 12 && zoom < 13) {
            nextZoom = 15
            type = "circle"
        } else if (zoom >= 13 && zoom < 16) {
            type = "rect"
        }

        return {
            nextZoom,
            type
        }
    }

    const createOverlays = (locate: labelType, map: BMapGL.Map, type: string, zoom: number) => {
        const areaPoint: BMapGL.Point = new BMapGL.Point(locate.coord.longitude, locate.coord.latitude)
        if (type === "circle") {
            createCircle(areaPoint, locate.label, locate.count, locate.value, zoom, map)
        } else {
            createRect(areaPoint, locate.label, locate.count, locate.value, map)
        }
    }

    const createCircle = (point: BMapGL.Point, areaName: string, count: number, key: string, zoom: number, map: BMapGL.Map) => {
        const label = new BMapGL.Label('', {
            position: point,
            offset: new BMapGL.Size(-35, -35)
        })
        label.setContent(`
            <div class="map-label-con">
                <p class="map-label-name">${ areaName }</p>
                <p>${ count } 套</p>
            </div>
        `)
        label.id = key
        label.setStyle(labelStyle)
        label.addEventListener('click', () => {
            renderOverlays(label.id, map)
            map.centerAndZoom(point, zoom)
            map.clearOverlays()
        })
        map.addOverlay(label)
    }

    const createRect = (point: BMapGL.Point, areaName: string, count: number, key: string, map: BMapGL.Map) => {
        const label = new BMapGL.Label('', {
            position: point,
            offset: new BMapGL.Size(-50, -28)
        })
        label.setContent(`
            <div class="map-label-rect-con">
                <span class="map-label-rect-name">${ areaName }</span>
                <span class="map-label-rect-number">${ count } 套</span>
                <i class="map-label-rect-arrow"></i>
            </div>
        `)
        label.id = key
        label.setStyle(labelStyle)
        label.addEventListener('click', (e) => {
            const target = e.domEvent.changedTouches[0]
            map.panBy(window.innerWidth / 2 - target.clientX, (window.innerHeight - 400) / 2 - target.clientY)
            getHouseList(label.id);
        })
        map.addOverlay(label)
    }

    const getHouseList = (id: string) => {
        const toastTwo = Toast.show({
            icon: 'loading',
            content: '加载中…',
            duration: 0
        })
        api.getNeighbourhood(id).then((res) => {
            toastTwo.close()
            if (res.status === 200) {
                setNeighbourhood(res.body.list)
            }
        })
    }

    useEffect(() => {
        createMap()
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={"map-con"}>
            <NavHeader title={"地图找房"} isMargin={true}/>
            <div id={"container"}></div>
            <div className={`map-house-list-con ${ neighbourhood.length > 0 ? 'map-house-list-hidden' : '' }`}>
                <div className={"map-house-list-header-con"}>
                    <span>房屋列表</span>
                    <span>更多房源</span>
                </div>
                <div className={"map-house-list-room"}>
                    {
                        neighbourhood.map((itemHouse) => (
                            <HouseItem
                                key={itemHouse.houseCode}
                                houseCode={itemHouse.houseCode}
                                desc={itemHouse.desc}
                                houseImg={itemHouse.houseImg}
                                price={itemHouse.price}
                                tags={itemHouse.tags}
                                title={itemHouse.title}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Map;