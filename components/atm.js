import React from 'react'

const AtmMain = ({ idx }) => {
    return (
        <div className={`w-5/12 h-28 rounded-md bg-gradient-to-tl ${idx % 2 === 0 ? "from-state1" : "from-state3"} ${idx % 2 === 0 ? "to-state2" : "to-state4"} relative mr-3`}>
            <div className="absolute bottom-0 right-2">
                <img src="/image/visa.png" className="object-contain" />
            </div>
        </div>
    )
}

const AtmBank = ({ from, to }) => {
    console.log(from,to)
    return (
        <div className={`w-5/12 h-28 rounded-md bg-gradient-to-tl ${from} ${to} relative mr-3`}>
            <div className="absolute bottom-0 right-2">
                <img src="/image/visa.png" className="object-contain" />
            </div>
        </div>
    )
}

export {
    AtmMain, AtmBank
}
