const StringFormatter = function () {
  const capitalizeFirst = (string) => {
    const capString = string[0].toUpperCase() + string.slice(1).toLowerCase();
    return capString;
  };

  const toSkewerCase = (string) => {
    return string.split(" ").join("-");
  };

  return {
    capitalizeFirst: capitalizeFirst,
    toSkewerCase: toSkewerCase,
  };
};

export default StringFormatter;
