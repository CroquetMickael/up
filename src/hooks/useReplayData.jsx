const fixedNumber = (value) => (value / 10).toFixed(1);
const useReplayData = ({ lastGames, comparedGames, user }) => {
  const getBoost = (games) => {
    let boostPerMinute = 0;
    let timeZeroBoost = 0;
    let timeMaxBoost = 0;
    let stolenBig = 0;
    let stolenSmall = 0;
    let takenBig = 0;
    let takenSmall = 0;
    games?.forEach((game) => {
      const playerBlue = game.blue.players.find(
        (player) => player.id.id === user.id
      );
      const playerOrange = game.orange.players.find(
        (player) => player.id.id === user.id
      );

      if (playerBlue) {
        boostPerMinute += playerBlue.stats.boost.bpm;
        timeZeroBoost += playerBlue.stats.boost.time_zero_boost;
        timeMaxBoost += playerBlue.stats.boost.time_full_boost;
        stolenBig += playerBlue.stats.boost.count_stolen_big;
        stolenSmall += playerBlue.stats.boost.count_stolen_small;
        takenBig += playerBlue.stats.boost.count_collected_big;
        takenSmall += playerBlue.stats.boost.count_collected_small;
      } else {
        boostPerMinute += playerOrange.stats.boost.bpm;
        timeZeroBoost += playerOrange.stats.boost.time_zero_boost;
        timeMaxBoost += playerOrange.stats.boost.time_full_boost;
        stolenBig += playerOrange.stats.boost.count_stolen_big;
        stolenSmall += playerOrange.stats.boost.count_stolen_small;
        takenBig += playerOrange.stats.boost.count_collected_big;
        takenSmall += playerOrange.stats.boost.count_collected_small;
      }
    });
    return {
      bpm: fixedNumber(boostPerMinute),
      timeZeroBoost: fixedNumber(timeZeroBoost),
      timeMaxBoost: fixedNumber(timeMaxBoost),
      stolenBig: fixedNumber(stolenBig),
      stolenSmall: fixedNumber(stolenSmall),
      takenSmall: fixedNumber(takenSmall),
      takenBig: fixedNumber(takenBig),
    };
  };

  const getOverfill = (games) => {
    let overfill = 0;
    let overfillStolen = 0;
    games?.forEach((game) => {
      const playerBlue = game.blue.players.find(
        (player) => player.id.id === user.id
      );
      const playerOrange = game.orange.players.find(
        (player) => player.id.id === user.id
      );

      if (playerBlue) {
        overfill += playerBlue.stats.boost.amount_overfill;
        overfillStolen += playerBlue.stats.boost.amount_overfill_stolen;
      } else {
        overfill += playerOrange.stats.boost.amount_overfill;
        overfillStolen += playerOrange.stats.boost.amount_overfill_stolen;
      }
    });
    return {
      overfill: fixedNumber(overfill),
      overfillStolen: fixedNumber(overfillStolen),
    };
  };

  const getMovement = (games) => {
    let timeSupersonicSpeed = 0;
    let timeSlowSpeed = 0;
    let timeBoostSpeed = 0;
    games?.forEach((game) => {
      const playerBlue = game.blue.players.find(
        (player) => player.id.id === user.id
      );
      const playerOrange = game.orange.players.find(
        (player) => player.id.id === user.id
      );

      if (playerBlue) {
        timeSupersonicSpeed += playerBlue.stats.movement.time_supersonic_speed;
        timeSlowSpeed += playerBlue.stats.movement.time_slow_speed;
        timeBoostSpeed += playerBlue.stats.movement.time_boost_speed;
      } else {
        timeSupersonicSpeed +=
          playerOrange.stats.movement.time_supersonic_speed;
        timeSlowSpeed += playerOrange.stats.movement.time_slow_speed;
        timeBoostSpeed += playerOrange.stats.movement.time_boost_speed;
      }
    });

    return {
      timeSupersonicSpeed: fixedNumber(timeSupersonicSpeed),
      timeSlowSpeed: fixedNumber(timeSlowSpeed),
      timeBoostSpeed: fixedNumber(timeBoostSpeed),
    };
  };

  return {
    boost: {
      current: { ...getBoost(lastGames), ...getOverfill(lastGames) },
      compared: { ...getBoost(comparedGames), ...getOverfill(comparedGames) },
    },
    movement: {
      current: getMovement(lastGames),
      compared: getMovement(comparedGames),
    },
  };
};

export { useReplayData };
