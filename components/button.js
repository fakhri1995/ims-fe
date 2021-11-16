import { Button } from 'antd'

import React from 'react'

const ButtonSys = ({ size, type, children, color }) => {
    console.log(color)
    if (type === 'primary') {
        return (
            <button className={`btn ${size === "large" ? "" : "btn-sm"} ${typeof(color) === 'undefined' ? "bg-primary100" : (color === "danger" && "bg-state1")}  hover:${typeof(color) === 'undefined' ? "bg-primary75" : (color === "danger" && "bg-state1")} ${typeof(color) === 'undefined' ? "border-primary100" : (color === "danger" && "border-state1")} hover:${typeof(color) === 'undefined' ? "border-primary100" : (color === "danger" && "border-state1")} px-6`}>
                {children}
            </button>
        )
    }
    else if(type === 'default'){
        return(
            <button className={`btn btn-outline ${size === "large" ? "" : "btn-sm"} ${typeof(color) === 'undefined' ? "text-primary100" : (color === "danger" && "text-state1")} hover:text-white hover:${typeof(color) === 'undefined' ? "bg-primary75" : (color === "danger" && "bg-state1")} ${typeof(color) === 'undefined' ? "border-primary100" : (color === "danger" && "border-state1")} hover:${typeof(color) === 'undefined' ? "border-primary75" : (color === "danger" && "border-state1")} px-6`}>
                {children}
            </button>
        )
    }
    else if(type === 'ghost'){
        return(
            <button className={`btn btn-outline border-none ${size === "large" ? "" : "btn-sm"} ${typeof(color) === 'undefined' ? "text-primary100" : (color === "danger" && "text-state1")} hover:${typeof(color) === 'undefined' ? "text-primary75" : (color === "danger" && "text-state1")} px-6`}>
                {children}
            </button>
        )
    }
}

export default ButtonSys
