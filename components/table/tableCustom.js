import React from 'react'
import { Table } from 'antd'

const TableCustom = ({ dataSource, setDataSource, columns, loading, pageSize, total, setloading, initProps, setpage }) => {
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

export {
    TableCustom
}
