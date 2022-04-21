import React, { useState, useEffect } from "react";
import SIcon from "../../components/SIcon";
import SearchHeader from "../../components/SearchHeader";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/SelfSelect/Filter";
import HouseItem from "../../components/HouseItem";
import { strObj, roomType, cityItem } from "../../untils/types";
import { List, AutoSizer, WindowScroller, InfiniteLoader } from "react-virtualized";
import api from "../../server/api";
import "./HomeList.css";

const HouseList = () => {

    const navigate = useNavigate()
    const [ houseList, setHouseList ] = useState<roomType[]>([])
    const [ houseCount, setHouseCount ] = useState<number>(0)
    const [ filters, setFilters ] = useState<strObj>({})

    const handleBack = () => {
        navigate(-1)
    }
    
    const onFilter = (filters: strObj) => {
        searchHouseList(filters)
    }

    const searchHouseList = (filters: strObj) => {
        setFilters(filters)
        const cityId: string = JSON.parse(localStorage.getItem('cityId') as string)
        api.getHouseList(cityId, filters, 1, 20).then((res) => {
            if (res.status === 200) {
                setHouseList(res.body.list)
                setHouseCount(res.body.count)
            }
        })
    }
    
    const rowRenderer = ({ index, key, style }: cityItem) => {
        const itemHouse: roomType = houseList[index]
        if (!itemHouse) {
            return <div key={key} style={style}>
                <p className={"house-list-item-null"}></p>
            </div>
        }
        return (
            <HouseItem
                style={style}
                key={key}
                houseCode={itemHouse.houseCode}
                desc={itemHouse.desc}
                houseImg={itemHouse.houseImg}
                price={itemHouse.price}
                tags={itemHouse.tags}
                title={itemHouse.title}
            />
        )
    }
    
    const isRowLoaded = ({ index }: {index: number}) => {
        console.log(!!houseList[index])
        return !!houseList[index]
    }

    const loadMoreRows = ({ startIndex, stopIndex }: { startIndex: number, stopIndex: number }) => {
        const cityId: string = JSON.parse(localStorage.getItem('cityId') as string)
        return new Promise<void>((resolve) => {
            api.getHouseList(cityId, filters, startIndex, stopIndex).then((res) => {
                if (res.status === 200) {
                    setHouseList([...houseList, ...res.body.list])
                }
                resolve()
            })
        })
    }

    useEffect(() => {
        searchHouseList({})
    }, [])

    return (
        <div className={"home-list-con"}>
            <div className={"home-list-header-con"}>
                <SIcon icon={"icon-back"} color={'#999'} size={1.7} callBack={handleBack} />
                <SearchHeader position={false} addressColor={'#00ae66'} addressSize={2.5} />
            </div>
            <Filter onFilter={onFilter} />
            <div className={"home-list-house-list-con"}>
                {/* @ts-ignore */}
                <InfiniteLoader loadMoreRows={loadMoreRows} isRowLoaded={isRowLoaded} rowCount={houseCount}>
                    {({ onRowsRendered, registerChild }) => (
                        // @ts-ignore
                        <WindowScroller>
                            {({ height, isScrolling, scrollTop }) => (
                                // @ts-ignore
                                <AutoSizer>
                                    {({ width }) => (
                                        // @ts-ignore
                                        <List
                                            autoHeight
                                            width={width}
                                            height={height}
                                            rowCount={houseCount}
                                            rowHeight={120}
                                            rowRenderer={rowRenderer}
                                            isScrolling={isScrolling}
                                            scrollTop={scrollTop}
                                            onRowsRendered={onRowsRendered}
                                            ref={registerChild}
                                        />
                                    )}
                                </AutoSizer>
                            )}
                        </WindowScroller>
                    )}
                </InfiniteLoader>
            </div>
        </div>
    )
}

export default HouseList;