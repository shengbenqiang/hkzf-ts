import React, { useState, useEffect } from "react";
import SIcon from "../SIcon";
import { useNavigate } from "react-router-dom";
import { getCurrentCity } from "../../untils/handleFun";
import { searchHeaderType } from "../../untils/types";
import "./SearchHeader.css";

const SearchHeader = (props: searchHeaderType) => {

    const navigate = useNavigate()
    const [ cityName, setCityName ] = useState<string>('上海')

    const handleNavigate = (path: string): void => {
        navigate(path)
    }

    const getLocate = () => {
        getCurrentCity().then((res: any) => {
            setCityName(res.label)
        })
    }

    useEffect(() => {
        getLocate()
    }, [])

    return (
        <div className={`index-header-navigate-con ${props.position ? 'index-header-position' : 'index-header-un-position'}`}>
            <div className={"index-header-search-con"}>
                <div className={"index-header-now-locate-con"} onClick={() => handleNavigate('/cityList')}>
                    <div className={"index-header-now-locate-child"}>
                        <span>{ cityName }</span>
                        <SIcon icon={"icon-arrow"} />
                    </div>
                </div>
                <div className={"index-header-search-entry"} onClick={() => handleNavigate('/search')}>
                    <SIcon icon={"icon-seach"} color={'#ccc'} />
                    <span className={"index-header-search-entry-input"}>请输入小区或地址</span>
                </div>
            </div>
            <div className={"index-header-locate-con"} onClick={() => handleNavigate('/map')}>
                <SIcon icon={"icon-map"} size={props.addressSize} color={props.addressColor ? props.addressColor : ''} />
            </div>
        </div>
    )
}

export default SearchHeader