import React from 'react'
import TreeCore from './treeCore'

const TreeLokasi = ({ expandedkeys, branchdata }) => {
    return (
        <TreeCore
            expandedKeys={expandedkeys}
            treeData={branchdata}
        >
        </TreeCore>
    )
}

export default TreeLokasi
