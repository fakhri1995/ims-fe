import React from 'react'
import { DatePicker, Input, Radio, Select, TreeSelect } from 'antd'
import { Label } from './typography'

const InputRequired = ({ label, name, defaultValue, onChangeInput, value }) => {
    return (
        <div className="flex flex-col mb-5 px-3">
            <div className="flex">
                <Label>{label}</Label>
                <span className="namaField"></span>
                <style jsx>
                    {`
                        .namaField::before{
                            content: '*';
                            color: red;
                        }
                    `}
                </style>
            </div>
            <Input name={name} defaultValue={defaultValue} value={value} onChange={onChangeInput}></Input>
        </div>
    )
}

const TextAreaRequired = ({ label, name, defaultValue, onChangeInput, value }) => {
    return (
        <div className="flex flex-col mb-5 px-3">
            <div className="flex">
                <Label>{label}</Label>
                <span className="namaField"></span>
                <style jsx>
                    {`
                        .namaField::before{
                            content: '*';
                            color: red;
                        }
                    `}
                </style>
            </div>
            <Input.TextArea name={name} defaultValue={defaultValue} value={value} onChange={onChangeInput}></Input.TextArea>
        </div>
    )
}

const InputNotRequired = ({ label, name, defaultValue, onChangeInput, value }) => {
    return (
        <div className="flex flex-col mb-5 px-3">
            <div className="flex">
                <Label>{label}</Label>
            </div>
            <Input name={name} defaultValue={defaultValue} value={value} onChange={onChangeInput}></Input>
        </div>
    )
}

const TreeSelectRequired = ({ label, name, defaultValue, onChangeTreeselect, value, treeData, allowClear }) => {
    return (
        <div className="flex flex-col mb-5 px-3">
            <div className="flex">
                <Label>{label}</Label>
                <span className="namaField"></span>
                <style jsx>
                    {`
                        .namaField::before{
                            content: '*';
                            color: red;
                        }
                    `}
                </style>
            </div>
            <TreeSelect allowClear={allowClear} name={name} treeDefaultExpandedKeys={[1]} defaultValue={defaultValue} value={value} onChange={onChangeTreeselect} treeData={treeData}></TreeSelect>
        </div>
    )
}

const SelectRequired = ({ label, name, defaultValue, onChangeSelect, value, children }) => {
    return (
        <div className="flex flex-col mb-5 px-3">
            <div className="flex">
                <Label>{label}</Label>
                <span className="namaField"></span>
                <style jsx>
                    {`
                        .namaField::before{
                            content: '*';
                            color: red;
                        }
                    `}
                </style>
            </div>
            <Select name={name} defaultValue={defaultValue} value={value} onChange={onChangeSelect}>
                {children}
            </Select>
        </div>
    )
}

const SelectNotRequired = ({ label, name, defaultValue, onChangeSelect, value, children, mb, px }) => {
    return (
        <div className={`flex flex-col mb-${mb} px-${px}`}>
            <div className="flex">
                <Label>{label}</Label>
            </div>
            <Select name={name} defaultValue={defaultValue} value={value} onChange={onChangeSelect}>
                {children}
            </Select>
        </div>
    )
}

const DateRequired = ({ label, name, defaultValue, onChangeDate, value, children }) => {
    return (
        <div className="flex flex-col mb-5 px-3">
            <div className="flex">
                <Label>{label}</Label>
                <span className="namaField"></span>
                <style jsx>
                    {`
                        .namaField::before{
                            content: '*';
                            color: red;
                        }
                    `}
                </style>
            </div>
            <DatePicker name={name} defaultValue={defaultValue} value={value} onChange={onChangeDate}>
                {children}
            </DatePicker>
        </div>
    )
}
const DateNotRequired = ({ label, name, defaultValue, onChangeDate, value, children }) => {
    return (
        <div className="flex flex-col mb-5 px-3">
            <div className="flex">
                <Label>{label}</Label>
            </div>
            <DatePicker name={name} defaultValue={defaultValue} value={value} onChange={onChangeDate}>
                {children}
            </DatePicker>
        </div>
    )
}

const RadioRequired = ({ label, name, onChangeRadio, options, value, defaultValue }) => {
    return (
        <div className="flex flex-col mb-3 px-3">
            <div className="flex">
                <Label>{label}</Label>
                <span className="namaField"></span>
                <style jsx>
                    {`
                        .namaField::before{
                            content: '*';
                            color: red;
                        }
                    `}
                </style>
            </div>
            <Radio.Group name={name} onChange={onChangeRadio} defaultValue={defaultValue}>
                <div className="flex flex-col">
                    {
                        options.map((doc, idx) => {
                            return (
                                <Radio value={doc.value}>{doc.title}</Radio>
                            )
                        })
                    }
                </div>
            </Radio.Group>
        </div>

    )
}

const RadioNotRequired = ({ label, name, onChangeRadio, options, value, defaultValue }) => {
    return (
        <div className="flex flex-col mb-3">
            <div className="flex">
                <Label>{label}</Label>
            </div>
            <Radio.Group name={name} onChange={onChangeRadio} defaultValue={defaultValue}>
                <div className="flex flex-col">
                    {
                        options.map((doc, idx) => {
                            return (
                                <Radio value={doc.value}>{doc.title}</Radio>
                            )
                        })
                    }
                </div>
            </Radio.Group>
        </div>

    )
}

export {
    InputRequired, InputNotRequired, RadioRequired, RadioNotRequired, SelectRequired, SelectNotRequired, TreeSelectRequired, DateRequired, DateNotRequired, TextAreaRequired
}
