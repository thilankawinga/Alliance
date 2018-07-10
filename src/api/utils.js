import moment from 'moment-timezone';

/**
 * Rounds leadTime to nearest hour
 * @param {moment or long} time
 * @return {moment}
 */
const ceilTime = time => {
  const currentTime = moment.isMoment(time) ? time : moment(leadTime);
  return currentTime.minute() || currentTime.second() || currentTime.millisecond()
    ? currentTime.add(1, 'hour').startOf('hour')
    : currentTime.startOf('hour');
};

export default {
  ceilTime
};