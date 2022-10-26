import React, { useCallback, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../redux/Hooks";
import { NavBar } from "../commonComponents/NavBar"
import { SideMenu } from "../commonComponents/SideMenu"
import { RelevantArticlesContainer } from "../pages/home/container/RelevantArticlesContainer";
import { IrrelevantArticlesContainer } from "../pages/irRelevant/container/IrRelevantArticlesContainer";
import { NoMatchPath } from "../pages/noMatchPath/container/NoMatchPath";

export function HasLoggedInRoutes() {

    console.log("2)       Inside the has auth page running....((((((((((((((");

    const { innerWidth } = window
    const { innerHeight } = window;
    const { sideBarPinned } = useAppSelector(state => state.navBarPinnedDetails)
    const [windowSize, setwindowSize] = useState<{ width: number, height: number }>({
        width: innerWidth,
        height: innerHeight
    })        
    const [reRender, setreRender] = useState<boolean>(true) // used to avoid multiple render while the window.addEventListener function works

    const windowResizeHandler = useCallback(() => {
        setreRender(false)
        if (reRender) {
            setwindowSize({
                ...windowSize,
                width: innerWidth,
                height: innerHeight
            })
        }
    }, [reRender,windowSize,innerWidth,innerHeight])

    window.addEventListener("resize", windowResizeHandler)

    return (
        <div className="h-100vh d-flex">
            <div className="w-100 d-flex">
                <div className="h-100vh position-relative width-animation side-menu" style={{ width: !sideBarPinned ? "15%" : 50 }}>
                    <SideMenu sideBarPinned={sideBarPinned} />
                </div>
                <div className="h-100vh width-animation" style={{ width: !sideBarPinned ? "85%" : (innerWidth - 50) }}>
                    <NavBar />
                    <Routes>
                        <Route path="login" element={<Navigate to={"/"} />} />
                        <Route path="forgot_password" element={<Navigate to={"/"} />} />
                        <Route path="reset_password/:secret_key" element={<Navigate to={"/"} />} />
                        <Route path="/" element={<RelevantArticlesContainer innerHeight={innerHeight} />} />
                        <Route path="irrelevant" element={<IrrelevantArticlesContainer innerHeight={innerHeight} />} />
                        <Route path="*" element={<NoMatchPath innerHeight={innerHeight - 50}/>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
