import React, { useEffect } from "react";
import "./Map.css";

const Map = () => {

    const createMap = () => {
        // const map = new BMap.Map("container")
        // const point = new BMap.Point(116.404, 39.915)
        console.log(document.getElementById("container"))
        // map.centerAndZoom(point, 15)
    }

    useEffect(() => {
        createMap()
    }, [])

    return (
        <div className={"map-con"}>
            <div id={"container"}></div>
        </div>
    )
}

export default Map;