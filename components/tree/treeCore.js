import React from 'react'
import { Tree } from 'antd'
import { DownIconSvg } from '../icon'
import { Label } from '../typography'

const TreeCore = ({ expandedkeys, branchdata }) => {
    return (
        <Tree
            expandedKeys={expandedkeys}
            treeData={branchdata}
            showIcon={<DownIconSvg size={15} color={`#35763B`} />}
            titleRender={(nodeData) => (
                <>
                    <div
                        id={`wrap${nodeData.key}`}
                        className={`flex justify-between text-gray-400 py-3`}
                        onMouseOver={() => {
                            var d = document.getElementById(`node${nodeData.key}`)
                            d.classList.add("bg-gray-400"); d.classList.remove("bg-primary100")
                            var dd = document.getElementById(`wrap${nodeData.key}`)
                            dd.classList.add("bg-primary20");
                        }}
                        onMouseLeave={() => {
                            var e = document.getElementById(`node${nodeData.key}`)
                            e.classList.add("hiddbg-primary100en"); e.classList.remove("bg-gray-400")
                            var ee = document.getElementById(`wrap${nodeData.key}`)
                            ee.classList.remove("bg-primary20");
                        }}
                    >
                        <div className=" w-full hover:bg-primary25">
                            <div className="flex">
                                <div className="mr-3">
                                    <Label>{nodeData.title}</Label>
                                </div>
                                <div id={`node${nodeData.key}`} className="w-5 h-5 rounded-full bg-gray-400 text-white">{nodeData.no_sub_child_count}</div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
            blockNode={true}
        >
        </Tree>
    )
}

export default TreeCore
