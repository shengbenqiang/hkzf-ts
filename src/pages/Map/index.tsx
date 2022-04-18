import React, { useEffect } from "react";
import NavHeader from "../../components/NavHeader";
import api from "../../server/api";
import "./Map.css";
import { labelType } from "../../untils/types";

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

    const createMap = () => {
        const locate = JSON.parse(localStorage.getItem('hkzf_city') as string)
        const map = new BMapGL.Map("container")
        const myGeo = new BMapGL.Geocoder()
        myGeo.getPoint(locate.label, (point) => {
            if (point) {
                map.centerAndZoom(point, 11)
                map.enableScrollWheelZoom()
                renderOverlays(locate.value, map)
                // api.getCityHouse(locate.value).then((res) => {
                //     if (res.status === 200) {
                //         res.body.forEach((itemCity: labelType) => {
                //             const label = new BMapGL.Label('', {
                //                 position: new BMapGL.Point(itemCity.coord.longitude, itemCity.coord.latitude),
                //                 offset: new BMapGL.Size(-35, -35)
                //             })
                //             label.setContent(`
                //                 <div class="map-label-con">
                //                     <p class="map-label-name">${ itemCity.label }</p>
                //                     <p>${ itemCity.count } 套</p>
                //                 </div>
                //             `)
                //             label.id = itemCity.value
                //             label.setStyle(labelStyle)
                //             label.addEventListener('click', () => {
                //                 map.centerAndZoom(new BMapGL.Point(itemCity.coord.longitude, itemCity.coord.latitude), 13)
                //                 map.clearOverlays()
                //             })
                //             map.addOverlay(label)
                //         })
                //     }
                // })
            }
        }, locate.label)
    }

    const renderOverlays = (id: string, map: BMapGL.Map) => {
        api.getCityHouse(id).then((res) => {
            if (res.status === 200) {
                res.body.forEach((itemLocate: labelType) => {
                    createOverlays(itemLocate, map)
                })
            }
        })
    }

    const createOverlays = (locateInfo: labelType, map: BMapGL.Map): { nextZoom: number, type: string } => {
        const zoom = map.getZoom()
        let nextZoom: number = 0
        let type: string = ""
        if (zoom >=10 && zoom < 12) {
            nextZoom = 13
            type = "circle"
        } else if (zoom >= 12 && zoom < 14) {
            nextZoom = 15
            type = "circle"
        } else if (zoom >= 14 && zoom < 16) {
            type = "rect"
        }

        return {
            nextZoom,
            type
        }
    }

    useEffect(() => {
        createMap()
    }, [])

    return (
        <div className={"map-con"}>
            <NavHeader title={"地图找房"} path={"/home"} isMargin={true}/>
            <div id={"container"}></div>
        </div>
    )
}

export default Map;