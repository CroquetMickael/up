import { rankColorsHex } from "../../../helpers/colorsHelpers"


const rankLabel = {
    1: "Bronze",
    4: "Silver",
    7: "Gold",
    10: "Plat",
    13: "Diam",
    16: "Champ",
    19: "GC",
    999: "Pros"
}

const getGamesColor = ({ gamesData, average, reversed }) => {
    if (gamesData > average) {
        return reversed ? "#f6005c" : "#00cc8a";
    } else {
        return reversed ? "#00cc8a" : "#f6005c";
    }
}

export const dataByGames = ({ gamesValue, average, distance, reversed }) => {
    return {
        xAxis: {
            type: 'category',
            data: gamesValue.map((game, index) => `Game ${index + 1}`),
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: 'white'
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: 'white'
                }
            }
        },
        series: [{
            data: gamesValue.map(gamesBpm => {
                return {
                    value: gamesBpm.toFixed(1), itemStyle: {
                        color: getGamesColor({ gamesData: gamesBpm, average, reversed })
                    }
                }
            }),
            type: 'bar',
            label: {
                show: true,
                position: 'inside',
                color: 'white'
            },
            markLine: {
                label: {
                    normal: {
                        show: true,
                        position: 'middle',
                        formatter: `Average : ${average}`,
                        backgroundColor: "transparent",
                        color: "#00cc8a",
                        distance: distance
                    }
                },
                data: [{ name: 'Average', yAxis: average }],
                lineStyle: {
                    type: "solid",
                    color: "transparent"
                }
            },
            barWidth: '50%'
        }]
    }
}


export const dataByRanks = ({ rankData, average, distance }) => {

    return {
        xAxis: {
            type: 'category',
            data: rankData && rankData.points.map(data => rankLabel[data[0]]),
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: 'white'
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: 'white'
                }
            }
        },
        series: [{
            data: rankData && rankData.points.map(data => {
                return {
                    value: data[2].toFixed(1), itemStyle: {
                        color: rankColorsHex[data[0]]
                    }
                }
            }),
            type: 'bar',
            label: {
                show: true,
                position: 'inside',
                color: 'white'
            },
            markLine: {
                label: {
                    normal: {
                        show: true,
                        position: 'middle',
                        formatter: `You : ${average}`,
                        backgroundColor: "transparent",
                        color: "#00cc8a",
                        distance: distance
                    }
                },
                data: [{ name: 'You', yAxis: average }],
                lineStyle: {
                    type: "solid",
                    color: "transparent"
                }
            },
            barWidth: '60%'
        }]

    }

}