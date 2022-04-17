import React, { useState, useEffect } from "react";
import api from "../../server/api";
import { NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { List, AutoSizer } from "react-virtualized";
import {axiosRes, listItem, cityItem } from "../../untils/types";
import { formatCityData, getCurrentCity, formatCityIndex } from "../../untils/handleFun";
import "./CityList.css";

const CityList = () => {

    const navigate = useNavigate();

    const [ locates, setLocate ] = useState<listItem>({})
    const [ rightIndex, setRightIndex ] = useState<number>(0)
    const [ locateIndex, setLocateIndex ] = useState<string[]>([])

    const handleOnBack = () => {
        navigate("/home")
    }

    const getCitys = () => {
      api.getCityDate(1).then((res: axiosRes) => {
          if (res.status === 200) {
              const { cityList, cityIndex } = formatCityData(res.body);
              api.getHotCity().then((resHot: axiosRes) => {
                  cityList['hot'] = resHot.body;
                  cityIndex.unshift('hot');
                  getCurrentCity().then((resCity) => {
                      cityList['#'] = [resCity]
                      cityIndex.unshift('#')
                      setLocate(cityList)
                      setLocateIndex(cityIndex)
                  })
              })
          }
      })
    }

    const rowRenderer = ({key, index, style}: cityItem) => {

        const letter = locateIndex[index]

        return (
            <div key={key} style={style} className={"city-item"}>
                <div className={"city-title"}>{ formatCityIndex(letter) }</div>
                {
                    locates[letter].map((letterCities) => (
                        <div key={letterCities.value} className={"city-name"}>{letterCities.label }</div>
                    ))
                }
            </div>
        )
    }

    const getRowHeight = ({ index }: { index: number }): number => {
        const letter = locateIndex[index]
        return locates[letter].length * 45 + 40
    }
    
    const renderCityIndex = () => {
        return locateIndex.map((itemIndex, index) => (
            <li className={"city-index-item"} key={itemIndex}>
                <span className={index === rightIndex ? 'index-item-active' : ''}>{ itemIndex === 'hot' ? '热' :itemIndex.toLocaleUpperCase() }</span>
            </li>
        ))
    }

    useEffect(() => {
        getCitys()
    }, [])

    return (
        <div className={"city-list-con"}>
            {/* @ts-ignore */}
            <NavBar className={"city-list-nav-bar"} onBack={handleOnBack}>城市选择</NavBar>
            {/* @ts-ignore */}
            <AutoSizer className={"city-list-auto-size-room"}>
                {
                    ({ height, width }) => (
                       // @ts-ignore
                        <List
                            width={width}
                            height={height}
                            rowCount={locateIndex.length}
                            rowHeight={getRowHeight}
                            rowRenderer={rowRenderer}
                        />
                    )
                }
            </AutoSizer>
            <ul className={"city-index"}>
                { renderCityIndex() }
            </ul>
        </div>
    )
}

export default CityList;
