import React, { useRef, useEffect } from "react";
import { StickyType } from "../../untils/types";
import "./Sticky.css";

const Sticky = (props: StickyType) => {

    const contentRef = useRef<HTMLDivElement | null>(null)
    const placeholderRef = useRef<HTMLDivElement | null>(null)

    const handleScroll = () => {
        const contentCurrent = contentRef.current
        const placeCurrent = placeholderRef.current as HTMLDivElement

        const placeRect: DOMRect = placeCurrent?.getBoundingClientRect() as DOMRect
        if (placeRect?.top && placeRect.top < 0) {
            contentCurrent?.classList.add('sticky-fix')
            placeCurrent.style.height = `${props.stickyHeight}px`
        } else {
            contentCurrent?.classList.remove('sticky-fix')
            if (placeCurrent) {
                placeCurrent.style.height = '0px'
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div ref={placeholderRef}></div>
            <div ref={contentRef}>
                {
                    props.children
                }
            </div>
        </div>
    )

}

export default Sticky