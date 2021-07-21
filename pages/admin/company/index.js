import React, { useEffect } from 'react'
import {useRouter} from 'next/router'

const CompanyIndex = () => {
    const rt = useRouter()
    useEffect(()=>{
        rt.push(`/dashboard/admin`)
    },[])
    return (
        <>
        </>
    )
}

export default CompanyIndex
