const fixedNumber = (value) => (value / 10).toFixed(1);
const useReplayData = ({ lastGames, comparedGames, user }) => {
  const getBoost = (games) => {
    let boostPerMinute = { value: 0, gamesValue: [] };
    let timeZeroBoost = { value: 0, gamesValue: [] };
    let timeMaxBoost = { value: 0, gamesValue: [] };
    let stolenBig = { value: 0, gamesValue: [] };
    let stolenSmall = { value: 0, gamesValue: [] };
    let takenBig = { value: 0, gamesValue: [] };
    let takenSmall = { value: 0, gamesValue: [] };
    games?.forEach((game) => {
      const playerBlue = game.blue.players.find(
        (player) => player.id.id === user.id
      );
      const playerOrange = game.orange.players.find(
        (player) => player.id.id === user.id
      );

      if (playerBlue) {
        //BPM
        boostPerMinute.value += playerBlue.stats.boost.bpm;
        boostPerMinute.gamesValue.push(playerBlue.stats.boost.bpm);
        //TZB
        timeZeroBoost.value += playerBlue.stats.boost.time_zero_boost;
        timeZeroBoost.gamesValue.push(playerBlue.stats.boost.time_zero_boost);

        timeMaxBoost.value += playerBlue.stats.boost.time_full_boost;
        timeMaxBoost.gamesValue.push(playerBlue.stats.boost.time_full_boost);
        //Stolen Big
        stolenBig.value += playerBlue.stats.boost.count_stolen_big;
        stolenBig.gamesValue.push(playerBlue.stats.boost.count_stolen_big);

        stolenSmall.value += playerBlue.stats.boost.count_stolen_small;
        stolenSmall.gamesValue.push(playerBlue.stats.boost.count_stolen_small);

        takenBig.value += playerBlue.stats.boost.count_collected_big;
        takenBig.gamesValue.push(playerBlue.stats.boost.count_collected_big);

        takenSmall.value += playerBlue.stats.boost.count_collected_small;
        takenSmall.gamesValue.push(playerBlue.stats.boost.count_collected_small);

      } else {
        boostPerMinute.value += playerOrange.stats.boost.bpm;
        boostPerMinute.gamesValue.push(playerOrange.stats.boost.bpm);
        //TZB
        timeZeroBoost.value += playerOrange.stats.boost.time_zero_boost;
        timeZeroBoost.gamesValue.push(playerOrange.stats.boost.time_zero_boost);

        timeMaxBoost.value += playerOrange.stats.boost.time_full_boost;
        timeMaxBoost.gamesValue.push(playerOrange.stats.boost.time_full_boost);
        //Stolen Big
        stolenBig.value += playerOrange.stats.boost.count_stolen_big;
        stolenBig.gamesValue.push(playerOrange.stats.boost.count_stolen_big);

        stolenSmall.value += playerOrange.stats.boost.count_stolen_small;
        stolenSmall.gamesValue.push(playerOrange.stats.boost.count_stolen_small);

        takenBig.value += playerOrange.stats.boost.count_collected_big;
        takenBig.gamesValue.push(playerOrange.stats.boost.count_collected_big);

        takenSmall.value += playerOrange.stats.boost.count_collected_small;
        takenSmall.gamesValue.push(playerOrange.stats.boost.count_collected_small);
      }
    });
    return {
      bpm: { average: fixedNumber(boostPerMinute.value), gamesValue: boostPerMinute.gamesValue },
      timeZeroBoost: { average: fixedNumber(timeZeroBoost.value), gamesValue: timeZeroBoost.gamesValue },
      timeMaxBoost: { average: fixedNumber(timeMaxBoost.value), gamesValue: timeMaxBoost.gamesValue },
      stolenBig: { average: fixedNumber(stolenBig.value), gamesValue: stolenBig.gamesValue },
      stolenSmall: { average: fixedNumber(stolenSmall.value), gamesValue: stolenSmall.gamesValue },
      takenSmall: { average: fixedNumber(takenSmall.value), gamesValue: takenSmall.gamesValue },
      takenBig: { average: fixedNumber(takenBig.value), gamesValue: takenBig.gamesValue },
    };
  };

  const getOverfill = (games) => {
    let overfill = { value: 0, gamesValue: [] };
    let overfillStolen = { value: 0, gamesValue: [] };
    games?.forEach((game) => {
      const playerBlue = game.blue.players.find(
        (player) => player.id.id === user.id
      );
      const playerOrange = game.orange.players.find(
        (player) => player.id.id === user.id
      );

      if (playerBlue) {
        overfill.value += playerBlue.stats.boost.amount_overfill;
        overfill.gamesValue.push(playerBlue.stats.boost.amount_overfill);

        overfillStolen.value += playerBlue.stats.boost.amount_overfill_stolen;
        overfillStolen.gamesValue.push(playerBlue.stats.boost.amount_overfill_stolen);
      } else {
        overfill.value += playerOrange.stats.boost.amount_overfill;
        overfill.gamesValue.push(playerOrange.stats.boost.amount_overfill);

        overfillStolen.value += playerOrange.stats.boost.amount_overfill_stolen;
        overfillStolen.gamesValue.push(playerOrange.stats.boost.amount_overfill_stolen);
      }
    });
    return {
      overfill: { average: fixedNumber(overfill.value), gamesValue: overfill.gamesValue },
      overfillStolen: { average: fixedNumber(overfillStolen.value), gamesValue: overfillStolen.gamesValue },
    };
  };

  const getMovement = (games) => {
    let timeSupersonicSpeed = { value: 0, gamesValue: [] };
    let timeSlowSpeed = { value: 0, gamesValue: [] };
    let timeBoostSpeed = { value: 0, gamesValue: [] };
    games?.forEach((game) => {
      const playerBlue = game.blue.players.find(
        (player) => player.id.id === user.id
      );
      const playerOrange = game.orange.players.find(
        (player) => player.id.id === user.id
      );

      if (playerBlue) {
        timeSupersonicSpeed.value += playerBlue.stats.movement.time_supersonic_speed;
        timeSupersonicSpeed.gamesValue.push(playerBlue.stats.movement.time_supersonic_speed);
        timeSlowSpeed.value += playerBlue.stats.movement.time_slow_speed;
        timeSlowSpeed.gamesValue.push(playerBlue.stats.movement.time_slow_speed);
        timeBoostSpeed.value += playerBlue.stats.movement.time_boost_speed;
        timeBoostSpeed.gamesValue.push(playerBlue.stats.movement.time_boost_speed);
      } else {
        timeSupersonicSpeed.value += playerOrange.stats.movement.time_supersonic_speed;
        timeSupersonicSpeed.gamesValue.push(playerOrange.stats.movement.time_supersonic_speed);
        timeSlowSpeed.value += playerOrange.stats.movement.time_slow_speed;
        timeSlowSpeed.gamesValue.push(playerOrange.stats.movement.time_slow_speed);
        timeBoostSpeed.value += playerOrange.stats.movement.time_boost_speed;
        timeBoostSpeed.gamesValue.push(playerOrange.stats.movement.time_boost_speed);
      }
    });

    return {
      timeSupersonicSpeed: { average: fixedNumber(timeSupersonicSpeed.value), gamesValue: timeSupersonicSpeed.gamesValue },
      timeSlowSpeed: { average: fixedNumber(timeSlowSpeed.value), gamesValue: timeSlowSpeed.gamesValue },
      timeBoostSpeed: { average: fixedNumber(timeBoostSpeed.value), gamesValue: timeBoostSpeed.gamesValue },
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
