import { Button } from 'antd'

import React from 'react'

const ButtonSys = ({ size, type, children, color, submit, onClick, form, selected, onChangeGambar, disabled, fullWidth }) => {
    if (type === 'primary') {
        return (
            <button style={fullWidth && { width: `100%` }} disabled={disabled} form={form} onClick={onClick} type={submit && "submit"} className={`btn ${size === "large" ? "" : "btn-sm"} ${typeof (color) === 'undefined' && "bg-primary100"} ${color === "danger" && "bg-state1"} ${color === "white" && "bg-white"}  ${typeof (color) === 'undefined' && "hover:bg-primary75"} ${color === "danger" && " hover:bg-state12"}  ${color === "white" && "hover:bg-gray-100"} ${typeof (color) === 'undefined' && "border-primary100"} ${color === "danger" && "border-state1"} ${color === "white" && "border-white"} ${typeof (color) === 'undefined' && "hover:border-primary75"} ${color === "danger" && "hover:border-state1"} ${color === "white" && "hover:border-gray-100"} px-6`}>
                {children}
            </button>
        )
    }
    if (type === 'primaryInput') {
        return (
            <label onClick={onClick} className={`btn ${size === "large" ? "" : "btn-sm"} ${typeof (color) === 'undefined' ? "bg-primary100" : (color === "danger" && "bg-state1")}  hover:${typeof (color) === 'undefined' ? "bg-primary75" : (color === "danger" && "bg-state1")} ${typeof (color) === 'undefined' ? "border-primary100" : (color === "danger" && "border-state1")} hover:${typeof (color) === 'undefined' ? "border-primary75" : (color === "danger" && "border-state1")} px-6`}>
                <input type="file" style={{ display: `none` }} name="urlgambarProduct" onChange={onChangeGambar} />
                {children}
            </label>
        )
    }
    else if (type === 'default') {
        return (
            <button style={fullWidth && { width: `100%` }} disabled={disabled} form={form} onClick={onClick} type={submit ? "submit" : "button"} className={`btn btn-outline ${size === "large" ? "" : "btn-sm"} ${typeof (color) === 'undefined' ? "text-primary100" : (color === "danger" && "text-state1")} hover:text-white hover:${typeof (color) === 'undefined' ? "bg-primary75" : (color === "danger" && "bg-state1")} ${typeof (color) === 'undefined' ? "border-primary100" : (color === "danger" && "border-state1")} hover:${typeof (color) === 'undefined' ? "border-primary75" : (color === "danger" && "border-state1")} px-6`}>
                {children}
            </button>
        )
    }
    else if (type === 'ghost') {
        return (
            <button style={fullWidth && { width: `100%` }} form={form} onClick={onClick} type={submit ? "submit" : "button"} className={`btn btn-outline border-none ${size === "large" ? "" : "btn-sm"} ${typeof (color) === 'undefined' && "text-primary100"} ${color === "danger" && "text-state1"} ${selected && "bg-primary25"} hover:${typeof (color) === 'undefined' ? "text-primary75" : (color === "danger" && "text-state1")} px-6`}>
                {children}
            </button>
        )
    }
}

export default ButtonSys
