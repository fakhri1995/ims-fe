import React, { useState } from 'react'
import { Table } from 'antd'
import { useRouter } from 'next/router'

const TableCustom = ({ dataSource, setDataSource, columns, loading, pageSize, total, setpraloading, initProps, setpage }) => {
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            scroll={{ x: 200 }}
            pagination={{
                pageSize: pageSize,
                total: total,
                onChange: (page, pageSize) => {
                    setloading(true)
                    setpage(page)
                    fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyInventories?page=${page}&rows=${pageSize}&keyword=`, {
                        method: `GET`,
                        headers: {
                            'Authorization': JSON.parse(initProps),
                        },
                    })
                        .then(res => res.json())
                        .then(res2 => {
                            setDataSource(res2.data.data)
                            setpraloading(false)
                        })
                }
            }}
        />
    )
}

const TableCustomRelasi = ({ dataSource, setDataSource, columns, loading, pageSize, total, setpraloading, initProps, id, setpage, setdataraw }) => {
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            scroll={{ x: 200 }}
            pagination={{
                pageSize: pageSize,
                total: total,
                onChange: (page, pageSize) => {
                    setpraloading(true)
                    setpage(page)
                    fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyRelationshipInventory?id=${id}&page=${page}&rows=${pageSize}`, {
                        method: `GET`,
                        headers: {
                            'Authorization': JSON.parse(initProps),
                        },
                    })
                        .then(res => res.json())
                        .then(res2 => {
                            setdataraw(res2.data)
                            setDataSource(res2.data.data)
                            setpraloading(false)
                        })
                }
            }}
        />
    )
}

const TableCustomTipeTask = ({ dataSource, setDataSource, columns, loading, pageSize, total, setpraloading, initProps, setpage, setdataraw }) => {
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            scroll={{ x: 200 }}
            pagination={{
                pageSize: pageSize,
                total: total,
                onChange: (page, pageSize) => {
                    setpraloading(true)
                    setpage(page)
                    fetch(`https://boiling-thicket-46501.herokuapp.com/getTaskTypes?page=${page}&rows=${pageSize}`, {
                        method: `GET`,
                        headers: {
                            'Authorization': JSON.parse(initProps),
                        },
                    })
                        .then(res => res.json())
                        .then(res2 => {
                            setdataraw(res2.data)
                            setDataSource(res2.data.data)
                            setpraloading(false)
                        })
                }
            }}
        />
    )
}

const TableCustomTask = ({ dataSource, setDataSource, columns, loading, pageSize, total, setpraloading, initProps, setpage, setdataraw }) => {
    const rt = useRouter()
    const [rowstate, setrowstate] = useState(0)
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            scroll={{ x: 'max-content' }}
            pagination={{
                pageSize: pageSize,
                total: total,
                onChange: (page, pageSize) => {
                    setpraloading(true)
                    setpage(page)
                    fetch(`https://boiling-thicket-46501.herokuapp.com/getTasks?page=${page}&rows=${pageSize}`, {
                        method: `GET`,
                        headers: {
                            'Authorization': JSON.parse(initProps),
                        },
                    })
                        .then(res => res.json())
                        .then(res2 => {
                            setdataraw(res2.data)
                            setDataSource(res2.data.data)
                            setpraloading(false)
                        })
                }
            }}
            onRow={(record, rowIndex) => {
                return {
                    onMouseOver: (event) => {
                        setrowstate(record.id)
                    },
                    onClick: (event) => {
                            rt.push(`/tasks/detail/${record.id}`)
                    }
                }
            }}
            rowClassName={(record, idx) => {
                return (
                    record.id === rowstate ? `cursor-pointer` : ``
                )
            }}
        />
    )
}

export {
    TableCustom, TableCustomRelasi, TableCustomTipeTask, TableCustomTask
}
