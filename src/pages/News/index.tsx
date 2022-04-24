import React, { useEffect } from "react";

const News = () => {

    const handleScroll = () => {
        console.log('执行饿了')
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <div className={'news-con'}>
            <div className={"news-scroll"} style={{ height: 1000 + 'px' }}>新闻资讯</div>
        </div>
    )
}

export default News;
