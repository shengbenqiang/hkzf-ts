export interface tabBarType {
    key: string;
    title: string;
    icon: JSX.Element;
}

export interface iconProps {
    icon: string;
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