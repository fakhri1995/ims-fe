import React from 'react'
import { Table } from 'antd'

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

export {
    TableCustom, TableCustomRelasi
}
