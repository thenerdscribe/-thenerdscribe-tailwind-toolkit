const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const _ = require("lodash");

module.exports = plugin(function ({ addUtilities, theme }) {
  const alternatingColors = (colors, offset) =>
    _.map(colors, (colorSteps, name) => {
      return _.map(colorSteps, (color, step) => ({
        [`.alternating-${offset}-${name}${
          _.isObject(colorSteps) && step !== "DEFAULT" ? `-${step}` : ""
        } > *:nth-child(${offset})`]: {
          "background-color": _.isObject(colorSteps) ? color : colorSteps,
        },
      }));
    });
  const themeColors = theme("colors", {});
  const alternatingColorsOdd = alternatingColors(colors, "odd");
  const alternatingColorsEven = alternatingColors(colors, "even");
  const alternatingThemeOdd = alternatingColors(themeColors, "odd");
  const alternatingThemeEven = alternatingColors(themeColors, "even");
  addUtilities([
    ...alternatingColorsOdd,
    ...alternatingColorsEven,
    ...alternatingThemeEven,
    ...alternatingThemeOdd,
  ]);
});
