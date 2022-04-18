import React, {useState, useEffect, useRef, LegacyRef} from "react";
import api from "../../server/api";
import { Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { List, AutoSizer } from "react-virtualized";
import NavHeader from "../../components/NavHeader";
import {axiosRes, listItem, cityItem, locateType, renderedType } from "../../untils/types";
import { formatCityData, getCurrentCity, formatCityIndex } from "../../untils/handleFun";
import "./CityList.css";

const CityList = () => {

    const navigate = useNavigate();

    const [ locates, setLocate ] = useState<listItem>({})
    const [ rightIndex, setRightIndex ] = useState<number>(0)
    const [ locateIndex, setLocateIndex ] = useState<string[]>([])

    const listRef = useRef<List>({} as List)

    const getCitys = () => {
       api.getCityDate(1).then((res: axiosRes) => {
          if (res.status === 200) {
              const { cityList, cityIndex } = formatCityData(res.body);
              api.getHotCity().then((resHot: axiosRes) => {
                  cityList['hot'] = resHot.body;
                  cityIndex.unshift('hot');
                  getCurrentCity().then((resCity) => {
                      cityList['#'] = [resCity as locateType]
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
                        <div onClick={() => handleChangeCity(letterCities)} key={letterCities.value} className={"city-name"}>{letterCities.label }</div>
                    ))
                }
            </div>
        )
    }

    const onRowsRendered = ({ startIndex }: renderedType) => {
        if (rightIndex !== startIndex) {
            setRightIndex(startIndex)
        }
    }

    const getRowHeight = ({ index }: { index: number }): number => {
        const letter = locateIndex[index]
        return locates[letter].length * 45 + 40
    }
    
    const renderCityIndex = () => {
        return locateIndex.map((itemIndex, index) => (
            <li
                className={"city-index-item"}
                key={itemIndex}
                onClick={() => {
                    listRef.current.scrollToRow(index)
                }}
            >
                <span className={index === rightIndex ? 'index-item-active' : ''}>{ itemIndex === 'hot' ? '热' :itemIndex.toLocaleUpperCase() }</span>
            </li>
        ))
    }

    const handleChangeCity = (cityInfo: locateType) => {
        const HOUSE_CITY: string[] = ['北京', '上海', '广州', '深圳']
        if (HOUSE_CITY.indexOf(cityInfo.label) > -1) {
            localStorage.setItem('hkzf_city', JSON.stringify({ label: cityInfo.label, value: cityInfo.value }))
            navigate('/home')
        } else {
            Toast.show('该城市暂无房源')
        }
    }

    useEffect(() => {
        getCitys()
    }, [])

    return (
        <div className={"city-list-con"}>
            <NavHeader title={"城市选择"} path={"/home"} isMargin={true} />
            {/* @ts-ignore */}
            <AutoSizer className={"city-list-auto-size-room"}>
                {
                    ({ height, width }) => (
                       // @ts-ignore
                        <List
                            ref={listRef as LegacyRef<List> | undefined}
                            width={width}
                            height={height}
                            scrollToAlignment={"start"}
                            rowCount={locateIndex.length}
                            rowHeight={getRowHeight}
                            rowRenderer={rowRenderer}
                            onRowsRendered={onRowsRendered}
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
