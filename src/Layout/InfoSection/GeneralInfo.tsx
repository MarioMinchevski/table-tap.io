import { useState, useEffect } from 'react'

export function GeneralInfo() {
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    const formattedDate = `${currentTime.getDate()}-${currentTime.getMonth() + 1}-${currentTime.getFullYear()} | ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`

    return (
        <div className="general-info">
            <div className="info-text-box">
                <h3>Establishment:</h3>
                <span>Your favorite restaurant</span>
            </div>
            <div className="info-text-box">
                <h3>Date & time:</h3>
                <p>{formattedDate}</p>
            </div>
            <div className="info-text-box">
                <h3>Hours Since Shift Start:</h3>
                <span>3</span>
            </div>
        </div>
    )
}
