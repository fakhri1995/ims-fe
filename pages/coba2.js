import React, { useState, useMemo } from 'react'
const Coba2 = () => {
    const [num, setnum] = useState(0)
    console.log("halo")
    return (
        <>
            <h1>Parent comp</h1>
            <button onClick={() => setnum(prev => prev + 1)}>Click {num}</button>
            <br />
            <MemoChild />
        </>
    )
}

const ChildComp = () => {
    sleep(2000)
    console.log("tunggu dulu...")
    return (
        <>
            <h2>Child comp</h2>
        </>
    )
}
const MemoChild = React.memo(ChildComp)


function sleep(ms) {
    const date = new Date()
    var currdate = null
    do {
        currdate = Date.now()
    } while (currdate - date < ms)
}

export default Coba2
