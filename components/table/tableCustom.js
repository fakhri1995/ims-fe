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

const TableCustomTipeTask = ({ dataSource, setDataSource, columns, loading, pageSize, total, setpraloading, initProps, setpage, pagefromsearch, setdataraw, setsortingtipetask, searcingtipetask }) => {
    return (
        <Table
            className='tableTypeTask'
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            scroll={{ x: 200 }}
            pagination={{
                current: pagefromsearch,
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
            onChange={(pagination, filters, sorter, extra) => {
                // console.log('params', pagination, filters, sorter, extra);
                if (extra.action === "sort") {
                    if (sorter.column) {
                        setpraloading(true)
                        setsortingtipetask({ sort_by: sorter.column.dataIndex, sort_type: sorter.order === "ascend" ? "asc" : "desc" })
                        fetch(`https://boiling-thicket-46501.herokuapp.com/getTaskTypes?page=${pagination.current}&rows=${pagination.pageSize}&sort_by=${sorter.column.dataIndex}&sort_type=${sorter.order === "ascend" ? "asc" : "desc"}&name=${searcingtipetask}`, {
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
                    else {
                        setpraloading(true)
                        setsortingtipetask({ sort_by: "", sort_type: "" })
                        fetch(`https://boiling-thicket-46501.herokuapp.com/getTaskTypes?page=${pagination.current}&rows=${pagination.pageSize}&sort_by=&sort_type=&name=${searcingtipetask}`, {
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
                }
            }}
        />
    )
}

const TableCustomTask = ({ dataSource, setDataSource, columns, loading, pageSize, total, setpraloading, initProps, setpage, pagefromsearch, setdataraw, sortstate, searchstate, setsortstate, filterstate, setfilterstate }) => {
    const rt = useRouter()
    const [rowstate, setrowstate] = useState(0)
    return (
        <Table
            className='tableTask'
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            scroll={{ x: 'max-content' }}
            pagination={{
                current: pagefromsearch,
                pageSize: pageSize,
                total: total,
                onChange: (page, pageSize) => {
                    setpraloading(true)
                    setpage(page)
                    fetch(`https://boiling-thicket-46501.herokuapp.com/getTasks?page=${page}&rows=${pageSize}&sort_by=${sortstate.sort_by}&sort_type=${sortstate.sort_type}&keyword=${searchstate}&status${filterstate}`, {
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
                    `${record.id === rowstate && `cursor-pointer`} ${record.status === 1 && `bg-bgBackdropOverdue`}`
                )
            }}
            onChange={(pagination, filters, sorter, extra) => {
                // console.log('params', pagination, filters, sorter, extra, pagefromsearch, searchstate);
                if (extra.action === "sort") {
                    if (sorter.column) {
                        setpraloading(true)
                        setsortstate({ sort_by: sorter.column.dataIndex, sort_type: sorter.order === "ascend" ? "asc" : "desc" })
                        fetch(`https://boiling-thicket-46501.herokuapp.com/getTasks?page=${pagination.current}&rows=${pagination.pageSize}&sort_by=${sorter.column.dataIndex}&sort_type=${sorter.order === "ascend" ? "asc" : "desc"}&keyword=${searchstate}&status=${filterstate}`, {
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
                    else {
                        setpraloading(true)
                        setsortstate({ sort_by: "", sort_type: "" })
                        fetch(`https://boiling-thicket-46501.herokuapp.com/getTasks?page=${pagination.current}&rows=${pagination.pageSize}&sort_by=&sort_type=&keyword=${searchstate}&status=${filterstate}`, {
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
                }
                else if (extra.action === "filter") {
                    if (filters.status !== null) {
                        setpraloading(true)
                        setfilterstate(filters.status[0])
                        fetch(`https://boiling-thicket-46501.herokuapp.com/getTasks?page=${pagination.current}&rows=${pagination.pageSize}&sort_by=${sortstate.sort_by}&sort_type=${sortstate.sort_type}&keyword=${searchstate}&status=${filters.status[0]}`, {
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
                    else {
                        setpraloading(true)
                        setfilterstate("")
                        fetch(`https://boiling-thicket-46501.herokuapp.com/getTasks?page=${pagination.current}&rows=${pagination.pageSize}&sort_by=${sortstate.sort_by}&sort_type=${sortstate.sort_type}&keyword=${searchstate}&status=`, {
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
                }
            }}
        />
    )
}

const TableCustomStaffTask = ({ dataSource, setDataSource, columns, loading, pageSize, total, setpraloading, initProps, setpage, pagefromsearch, setdataraw, setsortingstaff, searcingstaff }) => {
    return (
        <Table
            className='tableTypeTask'
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            scroll={{ x: 200 }}
            pagination={{
                current: pagefromsearch,
                pageSize: pageSize,
                total: total,
                onChange: (page, pageSize) => {
                    setpraloading(true)
                    setpage(page)
                    fetch(`https://boiling-thicket-46501.herokuapp.com/getStaffTaskStatuses?page=${page}&rows=${pageSize}&name=${searcingstaff}&from=&to=`, {
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
            onChange={(pagination, filters, sorter, extra) => {
                // console.log('params', pagination, filters, sorter, extra);
                if (extra.action === "sort") {
                    if (sorter.column) {
                        setpraloading(true)
                        setsortingstaff({ sort_by: sorter.column.dataIndex, sort_type: sorter.order === "ascend" ? "asc" : "desc" })
                        fetch(`https://boiling-thicket-46501.herokuapp.com/getStaffTaskStatuses?page=${pagination.current}&rows=${pagination.pageSize}&name=${searcingstaff}&from=&to=`, {
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
                    else {
                        setpraloading(true)
                        setsortingstaff({ sort_by: "", sort_type: "" })
                        fetch(`https://boiling-thicket-46501.herokuapp.com/getStaffTaskStatuses?page=${pagination.current}&rows=${pagination.pageSize}&name=${searcingstaff}&from=&to=`, {
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
                }
            }}
        />
    )
}

export {
    TableCustom, TableCustomRelasi, TableCustomTipeTask, TableCustomTask, TableCustomStaffTask
}
