import { PickerValue } from "antd-mobile/es/components/picker-view";
import {ReactNode} from "react";

export interface tabBarType {
    key: string;
    title: string;
    icon: JSX.Element;
}

export interface iconProps {
    icon: string;
    size?: number;
    color?: string;
    callBack?: () => void;
}

export interface swiperType {
    id: number;
    alt: string;
    imgSrc: string
}

export interface axiosRes {
    body: never;
    status: number;
    description: string;
}

export interface indexNavigate {
    img: string;
    name: string;
    path: string;
}

export interface groupType {
    id: number;
    desc: string;
    imgSrc: string;
    title: string;
}

export interface newType {
    date: string;
    from: string;
    id: number;
    imgSrc: string;
    title: string;
}

export interface locateType {
    label: string;
    pinyin: string;
    short: string;
    value: string;
}

export interface cityAbout {
    cityIndex: string[];
    cityList: listItem;
}

export interface listItem {
    [key: string]: locateType[]
}

export interface commonStr {
    [key: string]: boolean;
}

export interface cityItem {
    key?: string;
    index: number;
    isScrolling?: boolean;
    isVisible?: boolean;
    style?: object;
}

export interface renderedType {
    startIndex: number;
    stopIndex?: number;
    overscanStartIndex?: number;
    overscanStopIndex?: number;
}

export interface NavType {
    title: string;
    isMargin?: boolean;
}

interface mapLocate {
    latitude: number;
    longitude: number;
}

export interface labelType {
    coord: mapLocate;
    count: number;
    label: string;
    value: string;
}

export interface roomType {
    desc: string;
    houseCode: string;
    houseImg: string;
    price: number;
    tags: string[];
    title: string;
    style?: object;
}

export interface searchHeaderType {
    position: boolean;
    addressColor?: string;
    addressSize: number;
}

export interface titleListType {
    title: string;
    type: string;
}

export interface FilterTitleType {
    titleSelectedStatus: titleStats;
    titleClick: (type: string) => void;
}

export interface titleStats extends commonStr{
    area: boolean;
    rentType: boolean;
    price: boolean;
    more: boolean;
}

export interface filterPickerType {
    cols: number;
    type: string;
    onCancel: () => void;
    onSave: (val: PickerValue[] | undefined, type: string | undefined) => void;
    data: CascadePickerType[];
    defaultValue: string[];
}

export interface basePicker {
    label: string;
    value: string;
}

export interface CascadePickerType {
    label: string;
    value: string;
    children?: CascadePickerType[];
}

export interface conditionType {
    [key: string]: CascadePickerType | basePicker[];
}

export interface PickerFooterType {
    cancelText: string;
    value?: PickerValue[] | undefined;
    type?: string;
    onCancel: () => void;
    onSave: (val: PickerValue[] | undefined, type: string | undefined) => void;
}

export interface SelectPicker {
    area: string[];
    rentType: string[];
    price: string[];
    more: string[];
}

export interface FilterMoreType {
    type: string;
    floor: basePicker[];
    oriented: basePicker[];
    roomType: basePicker[];
    defaultValue: string[];
    characteristic: basePicker[];
    onCancel: () => void;
    onSave: (val: PickerValue[] | undefined, type: string | undefined) => void;
}

export interface baseBool {
    [key: string]: boolean
}
export interface baseStrArr {
    [key: string]: string[]
}

export interface strObj {
    [key: string]: string
}

export interface FilterType {
    onFilter: (filters: strObj) => void;
}

export interface StickyType {
    children: ReactNode,
    stickyHeight: number
}

export interface EmptyType {
    emptyWord: string;
}