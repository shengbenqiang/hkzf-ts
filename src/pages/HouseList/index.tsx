import React, { useState, useEffect } from "react";
import SIcon from "../../components/SIcon";
import SearchHeader from "../../components/SearchHeader";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/SelfSelect/Filter";
import HouseItem from "../../components/HouseItem";
import { strObj, roomType, cityItem } from "../../untils/types";
import { List, AutoSizer, WindowScroller, InfiniteLoader } from "react-virtualized";
import Sticky from "../../components/Sticky";
import NoHouse from "../../components/NoHouse";
import api from "../../server/api";
import { Toast } from "antd-mobile"
import "./HomeList.css";

const HouseList = () => {

    const navigate = useNavigate()
    const [ houseList, setHouseList ] = useState<roomType[]>([])
    const [ filters, setFilters ] = useState<strObj>({})
    const [ houseCount, setHouseCount ] = useState<number | undefined>(undefined)
    const [ isLoad, setIsLoad ] = useState<boolean>(false)

    const handleBack = () => {
        navigate(-1)
    }
    
    const onFilter = (filters: strObj) => {
        // 未达到目标效果
        window.scrollTo(0, 0)
        searchHouseList(filters)
    }

    const searchHouseList = (filters: strObj) => {
        setIsLoad(true)
        const toast = Toast.show({
            icon: 'loading',
            content: '加载中…',
            duration: 0
        })
        setFilters(filters)
        const cityId = JSON.parse(localStorage.getItem('hkzf_city') as string)
        api.getHouseList(cityId.value, filters, 1, 20).then((res) => {
            if (res.status === 200) {
                setIsLoad(false)
                setHouseList(res.body.list)
                setHouseCount(res.body.count)
                toast.close()
                if (res.body.count !== 0) {
                    Toast.show(`共找到${res.body.count}套房源`)
                }
            }
        })
    }
    
    const rowRendererList = ({ index, key, style }: cityItem) => {
        const itemHouse: roomType = houseList[index]
        if (!itemHouse) {
            return (
                <div key={key} style={style}>
                    <p className={"house-list-item-null"}></p>
                </div>
            )
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
    
    const isRowLoaded = ({ index }: {index: number}): boolean => {
        return !!houseList[index]
    }

    const loadMoreRows = ({ startIndex, stopIndex }: { startIndex: number, stopIndex: number }) => {
        const cityId: string = JSON.parse(localStorage.getItem('cityId') as string)
        return new Promise<void>((resolve) => {
            resolve()
        }).then(function () {
            api.getHouseList(cityId, filters, startIndex, stopIndex).then((res) => {
                setHouseList([...houseList, ...res.body.list])
            })
        })
    }

    const renderIInfinite = () => {
        if (houseCount === 0 && !isLoad) {
            return <NoHouse emptyWord={"没有找到房源，请切换搜索条件"} />
        }
        return (
            <div className={"home-list-house-list-con"}>
                {/* @ts-ignore */}
                <InfiniteLoader loadMoreRows={loadMoreRows} isRowLoaded={isRowLoaded} rowCount={houseList.length}>
                    {({ onRowsRendered, registerChild }) => (
                        // @ts-ignore
                        <WindowScroller>
                            {({ height, isScrolling, scrollTop }) => (
                                // @ts-ignore
                                <AutoSizer disableHeight>
                                    {({ width }) => (
                                        // @ts-ignore
                                        <List
                                            autoHeight
                                            width={width}
                                            height={height}
                                            rowCount={houseList.length}
                                            rowHeight={120}
                                            rowRenderer={rowRendererList}
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
        )
    }

    useEffect(() => {
        searchHouseList({})
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={"home-list-con"}>
            <div className={"home-list-header-con"}>
                <SIcon icon={"icon-back"} color={'#999'} size={1.7} callBack={handleBack} />
                <SearchHeader position={false} addressColor={'#00ae66'} addressSize={2.5} />
            </div>
            <Sticky stickyHeight={50}>
                <Filter onFilter={onFilter} />
            </Sticky>
            {/* 失败 */}
            {renderIInfinite()}
        </div>
    )
}

export default HouseList;