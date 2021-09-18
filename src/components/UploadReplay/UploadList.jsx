import React from "react";
import { useState } from "react";
import { BsCardChecklist } from "react-icons/bs"


const UploadList = ({ elements, retries }) => {
    const [isShowed, setIsShowed] = useState(false);
    return (
        <>
            <div className="fixed z-30 bottom-8 right-8">
                <button className="bg-brandSuccess rounded-full p-2 text-3xl text-white" title="Show replays Tracking" onClick={() => setIsShowed(!isShowed)}><BsCardChecklist /></button>
            </div>
            <div className={`fixed z-30 top-32 right-0 mt-12 mr-6 ${isShowed ? "toast" : "unShowed"}`}>
                <div className="w-full bg-brandDarker text-sm text-white font-bold px-5 py-2 shadow border-b border-gray-300">
                    Tracking replays
                </div>
                <div className="w-full h-full overflow-auto shadow bg-brandDarker" id="journal-scroll">
                    <table className="w-full">
                        <tbody className="w-full">
                            {elements?.length > 0 ? elements.map(element => (
                                <tr className="relative transform scale-100 text-xs w-full py-1 text-white border-b-2 border-blue-100 cursor-default hover:bg-brandSub hover:bg-opacity-25" key={element.id}>
                                    <td className="px-2 py-2 whitespace-no-wrap">
                                        <div className="leading-5 text-white font-medium">{element.name}</div>
                                        {retries.id === element.id && (
                                            <>
                                                <div className="leading-5 text-white ">Retrieving data</div>
                                                <div className="leading-5 text-white">Current retries: {retries.retryCount} / 10</div>
                                            </>
                                        )}
                                    </td>
                                </tr>)
                            ) : <tr className="relative transform scale-100 text-xs py-1 border-b-1 w-full border-blue-100 cursor-default hover:bg-brandSub hover:bg-opacity-25">
                                <td className="px-2 py-2 whitespace-no-wrap text-white">
                                    No Data to retrieve
                                </td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </>)
}

export { UploadList }