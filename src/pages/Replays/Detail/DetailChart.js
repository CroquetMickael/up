const teamColor = {
  blue: "#00bfff",
  orange: "#ffa500",
};

export const dataByTeams = ({
  gameBlueValue,
  gameOrangeValue,
  titles,
  chartTitle,
}) => {
  return {
    title: {
      text: chartTitle,
      textStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      left: "150",
    },
    xAxis: {
      type: "category",
      data: [
        ...titles.map((title) => ({
          value: title,
          textStyle: { color: "white" },
        })),
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: gameBlueValue?.length
          ? gameBlueValue.map((value) => ({
              value,
              itemStyle: {
                color: teamColor.blue,
              },
            }))
          : [
              {
                value: gameBlueValue,
                itemStyle: {
                  color: teamColor.blue,
                },
              },
            ],
        type: "bar",
        label: {
          show: true,
          position: "inside",
          color: "white",
        },
      },
      {
        data: gameOrangeValue?.length
          ? gameOrangeValue.map((value) => ({
              value,
              itemStyle: {
                color: teamColor.orange,
              },
            }))
          : [
              {
                value: gameOrangeValue,
                itemStyle: {
                  color: teamColor.orange,
                },
              },
            ],
        type: "bar",
        label: {
          show: true,
          position: "inside",
          color: "white",
        },
      },
    ],
  };
};

export const dataByPlayers = ({
  type,
  dataToFind,
  gamesData,
  titles,
  chartTitle,
  isFixed,
}) => {
  return {
    legend: {
      textStyle: {
        color: "white",
      },
    },
    title: {
      text: chartTitle,
      textStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      left: "150",
    },
    xAxis: {
      type: "category",
      data: [
        ...titles.map((title) => ({
          value: title,
          textStyle: { color: "white" },
        })),
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      ...gamesData?.blue?.players
        ?.filter((player) => player.start_time === 0)
        .map((player) => ({
          data: [
            ...dataToFind.map((data) =>
              isFixed
                ? player.stats[type][data].toFixed(2)
                : player.stats[type][data]
            ),
          ],
          name: player.name,
          type: "bar",
          label: {
            show: true,
            position: "inside",
            color: "white",
          },
        })),
      ...gamesData?.orange?.players
        ?.filter((player) => player.start_time === 0)
        .map((player) => ({
          data: [
            ...dataToFind.map((data) =>
              isFixed
                ? player.stats[type][data].toFixed(2)
                : player.stats[type][data]
            ),
          ],
          name: player.name,
          type: "bar",
          label: {
            show: true,
            position: "inside",
            color: "white",
          },
        })),
    ],
  };
};
