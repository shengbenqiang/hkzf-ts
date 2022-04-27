import React, {useState} from "react";
import { SearchBar } from "antd-mobile"
import { getCity } from "../../untils/city";
import api from "../../server/api";
import "./RentSearch.css";

const RentSearch = () => {

    const [ searchText, setSearchText ] = useState<string>('')
    const [ areaList, setAreaList ] = useState([])

    const handleTextChange = (newText: string) => {
        setSearchText(newText)
        if (!newText) {
            return setAreaList([])
        }
        const { value } = getCity()
        api.getAreaList(newText, value).then((res) => {
            if (res.status === 200) {
                console.log(res.body)
            }
        })
    }

    return (
        <div className={"rent-search-con"}>
            <div className={"rent-search-search-input"}>
                <SearchBar
                    clearable
                    value={searchText}
                    style={{ '--height': '4rem', '--background': '#fff' }}
                    placeholder={"请输入小区或地址"}
                    showCancelButton={() => true}
                    onChange={(value) => handleTextChange(value)}
                />
            </div>
        </div>
    )
}

export default RentSearch;