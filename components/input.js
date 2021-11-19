import React from 'react'
import { Input, Radio } from 'antd'
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

export {
    InputRequired, RadioRequired
}
