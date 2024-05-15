module.exports.getMexicoDate = () => {
  const now = new Date();

  const utcOffset = -6 * 60 * 60 * 1000;

  const utcMinusSixDate = new Date(now.getTime() + utcOffset);

  const mexicoISODate = utcMinusSixDate.toISOString().slice(0, 10);

  return mexicoISODate;
};
