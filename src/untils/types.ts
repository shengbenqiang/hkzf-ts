export interface tabBarType {
    key: string;
    title: string;
    icon: JSX.Element;
}

export interface iconProps {
    icon: string;
    size?: number;
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

export interface cityItem {
    key: string;
    index: number;
    isScrolling?: boolean;
    isVisible?: boolean;
    style: object;
}