import React, { useEffect } from "react";
import { useState } from "react";
import { useReplays } from "../../context/Replays/ReplaysContext";
import { FaSteam, FaPlaystation, FaXbox } from "react-icons/fa"
import { SiEpicgames } from "react-icons/si"
import { DataTitle } from "../Home/components/DataTitle";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const iconsByPlatform = {
    "steam": <FaSteam />,
    "ps4": <FaPlaystation />,
    "epic": <SiEpicgames />,
    "xbox": <FaXbox />
};

const typeGames = (teamSize) => ({
    "unranked-doubles": "Unranked Doubles - 2v2",
    "unranked-standard": "Unranked Standard - 3v3",
    "unranked-duels": "Unranked Duels - 1v1",
    "ranked-doubles": "Ranked Doubles - 2v2",
    "ranked-standard": "Ranked Standard - 3v3",
    "ranked-duels": "Ranked Duels - 1v1",
    "Tournament": `Tournament - ${teamSize}v${teamSize}`
})

const Replays = () => {
    const { lastGames, comparedGames } = useReplays();
    const [games, setGames] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        setGames([...lastGames, ...comparedGames].sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, [comparedGames, lastGames])

    return (
        <>
            <div className="mx-auto max-w-4xl w-full">
                <DataTitle Title={t("replay.games")} />
            </div>
            {games.map(game =>
                <Link className="max-w-4xl w-full mx-auto z-10 transform transition-transform scale-95 hover:scale-100 cursor-pointer" to={`/replays/${game.id}`}>
                    <div className="flex flex-col">
                        <div className="bg-brandDarker border border-gray-900 shadow-lg m-4">
                            <div className="flex-none sm:flex">
                                <div className=" relative h-32 w-32 flex sm:mb-0 mb-3">
                                    <div className="bg-brandSub flex w-1/2 h-full bg-opacity-25">
                                        <div className="justify-self-center self-center text-center w-full text-brandSub">3</div>
                                    </div>
                                    <div className="bg-yellow-700 flex w-1/2 h-full bg-opacity-25">
                                        <div className="justify-self-center self-center text-center w-full text-yellow-700" >2</div>
                                    </div>
                                </div>
                                <div className="flex-auto sm:ml-5 justify-evenly">
                                    <div className="flex items-center justify-between sm:mt-2 w-full">
                                        <div className="flex items-center w-full">
                                            <div className="flex flex-col w-full">
                                                <div className="w-full flex-none text-lg text-gray-200 font-bold leading-none">{game.title}</div>
                                                <div className="flex flex-wrap text-gray-400 my-1 w-full text-sm">
                                                    <div className="w-1/3 ">{game.map_name}</div>
                                                    <div className="w-1/3">{game.playlist_id ? typeGames(game.team_size)[game.playlist_id] : typeGames(game.team_size)[game.match_type]}</div>
                                                    <div className="w-1/3">{t("replay.season")} {game.season}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex pt-2  text-sm text-gray-400 h-16 items-end">
                                        <div className="flex-1 inline-flex items-center gap-x-1">
                                            {game.blue.players.map(player => {
                                                return player.start_time === 0 ? <div className="flex justify-center items-center"><span className="mx-2 text-brandSub">{iconsByPlatform[player.id.platform]}</span>{player.name}</div> : null
                                            }
                                            )}
                                        </div>
                                        <div className="flex-1 inline-flex items-center gap-x-1">
                                            {game.orange.players.map(player => {
                                                return player.start_time === 0 ? <div className="flex justify-center items-center"><span className="mx-2 text-yellow-700">{iconsByPlatform[player.id.platform]}</span>{player.name}</div> : null
                                            }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>)}
        </>
    )
}

export { Replays }