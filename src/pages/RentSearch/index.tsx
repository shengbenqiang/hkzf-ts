import React, {useState} from "react";
import { SearchBar } from "antd-mobile"
import { getCity } from "../../untils/city";
import api from "../../server/api";
import { areaType } from "../../untils/types";
import { useNavigate } from "react-router-dom";
import "./RentSearch.css";

const RentSearch = () => {

    const navigate = useNavigate()

    const [ searchText, setSearchText ] = useState<string>('')
    const [ areaList, setAreaList ] = useState<areaType[]>([])

    const handleTextChange = (newText: string) => {
        setSearchText(newText)
        if (!newText) {
            return setAreaList([])
        }

        const { value } = getCity()
        api.getAreaList(newText, value).then((res) => {
            if (res.status === 200) {
                setAreaList(res.body)
            }
        })
    }

    const handleCancel = () => {
        navigate(-1)
    }
    
    const handleAreaClick = (area: areaType) => {
        navigate('/rent/rentAdd', {
            replace: true,
            state: {
                from: {
                    name: area.communityName,
                    id: area.community
                }
            }
        })
    }

    return (
        <div className={"rent-search-con"}>
            <div className={"rent-search-search-input"}>
                <SearchBar
                    clearable
                    value={searchText}
                    onCancel={handleCancel}
                    style={{ '--height': '4rem', '--background': '#fff' }}
                    placeholder={"请输入小区或地址"}
                    showCancelButton={() => true}
                    onChange={(value) => handleTextChange(value)}
                />
            </div>
            <div className={"rent-search-area-list-room"}>
                {
                    areaList.map((itemArea) => (
                        <div onClick={() => handleAreaClick(itemArea)} key={itemArea.community} className={"rent-search-item-area-room"}>{ itemArea.communityName }</div>
                    ))
                }
            </div>
        </div>
    )
}

export default RentSearch;