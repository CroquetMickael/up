import React from "react"

const Loadable = ({ progress, isDone, children }) => (
    <>
        {
            isDone ? children : (
                <div className="absolute flex flex-col justify-center items-center h-full w-full pin bg-black ease-out transition-all duration-500 opacity-75">
                    <svg fill='none' className="h-32 animate-spin text-brandSub" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                        <path clipRule='evenodd'
                            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                            fill='currentColor' fill-rule='evenodd' />
                    </svg>
                    {progress &&
                        <div className="w-64 bg-white shadow rounded">
                            <div
                                className="bg-gray-100 rounded h-2 w-full"
                                role="progressbar"
                            >
                                <div
                                    className="bg-brandSub rounded h-2 text-center transition-all"
                                    style={{ width: `${(progress.value / progress.max) * 100}%` }}
                                >
                                </div>
                                <div className="text-white text-center">Replays retrieved : {progress.value} / {progress.max}</div>
                            </div>
                        </div>
                    }
                </div>
            )
        }
    </>
)


export { Loadable }