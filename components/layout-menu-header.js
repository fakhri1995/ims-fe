import ExportOutlined from '@ant-design/icons/ExportOutlined'
import { Avatar, Dropdown } from 'antd'
import Link from 'next/link'
import UserOutlined from '@ant-design/icons/UserOutlined'
import NotificationOutlined from '@ant-design/icons/NotificationOutlined'
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import PlusCircleTwoTone from '@ant-design/icons/PlusCircleTwoTone'
import { TicketIconSvg, ContractIconSvg} from './icon'

function LayoutMenuHeader({ dataProfile, Linkheader, handleLogout, st }) {

    const menuProfile2 = () => {
        return (
            <div className="w-auto h-auto flex flex-col shadow-md rounded bg-white space-y-4 px-10 py-5">
                <div className="flex justify-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex text-white text-center justify-center items-center">
                        <img src={dataProfile.data.image_profile} alt="imageProfile" className=" object-cover w-full h-full" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold mb-1">{dataProfile.data.fullname}</h2>
                        <h2 className="text-sm font-normal mb-1">{dataProfile.data.email}</h2>
                        <Linkheader href={`/profile`} ref="noreferrer">Profile Settings</Linkheader>
                    </div>
                </div>
                <div>
                    <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
                        <ExportOutlined /> Logout
                    </a>
                </div>
            </div>
        )
    }

    const addMenu = () => {
        return (
            <div style={{ fontSize: '14px' }} className="w-48 h-auto grid grid-cols-1 md:grid-cols-1 shadow-md rounded bg-white">
            {/* yang awal*/}
            {/* <div style={{ fontSize: '14px' }} className="w-auto h-auto grid grid-cols-1 md:grid-cols-3 shadow-md rounded bg-white"> */} 
                <div className=" col-span-1 md:col-span-1 text-xs md:text-sm m-3 md:m-2 h-auto">
                    <Link href={`/incidents/create?originPath=Tickets`}>
                        <div className="flex justify-start pt-2 cursor-pointer hover:bg-gray-200" >
                            <TicketIconSvg className={"pt-1"}/> &nbsp; &nbsp; <p className="p-1">Incident</p>
                        </div>
                    </Link>
                    <Link href={`/admin/contracts/create`}>
                        <div className="flex justify-start pt-2 cursor-pointer hover:bg-gray-200" >
                            <ContractIconSvg className={"pt-1"}/> &nbsp; &nbsp; <p className="p-1">Contract</p>
                        </div>
                    </Link>
                    {/* <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Release</p>
                    </div>
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Project</p>
                    </div>
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Project</p>
                    </div> */}
                </div>
                {/* <div className=" col-span-1 md:col-span-1 text-xs md:text-sm m-3 md:m-2 space-y-3 px-8">
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Incident</p>
                    </div>
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Release</p>
                    </div>
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Project</p>
                    </div>
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Project</p>
                    </div>
                </div>
                <div className=" col-span-1 md:col-span-1 text-xs md:text-sm m-3 md:m-2 space-y-3 px-8">
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Incident</p>
                    </div>
                </div> */}
            </div>
        )
    }
    return (
        <div className={`hidden md:flex md:w-auto w-full ${st.menu}`}>
            <div style={{ marginRight: `3rem` }}>
                <Dropdown overlay={addMenu} placement="bottomCenter" trigger={['click']}>
                    <PlusCircleTwoTone className="" style={{ fontSize: '20px', cursor: `pointer` }} />
                </Dropdown>
            </div>
            <div style={{ marginRight: `3rem`, cursor: `pointer` }}>
                <QuestionCircleOutlined />
            </div>
            <div style={{ marginRight: `3rem`, cursor: `pointer` }}>
                <NotificationOutlined />
            </div>
            <div style={{ marginRight: `3rem`, marginTop: `1rem` }}>
                <Dropdown overlay={menuProfile2} trigger={['click']}>
                    {
                        dataProfile.data.image_profile ?
                            <img src={dataProfile.data.image_profile} alt="ava" className="w-8 h-8 rounded-full object-cover cursor-pointer" />
                            :
                            <Avatar icon={<UserOutlined></UserOutlined>} style={{ cursor: `pointer` }} />
                    }
                </Dropdown>
            </div>
        </div>
    )
}

export default LayoutMenuHeader