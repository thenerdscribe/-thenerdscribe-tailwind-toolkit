const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const buildShadowPalette = requre("buildShadowPalette");
const {map, isObject} = require("lodash");

module.exports = plugin(function ({ addUtilities, theme, variants }) {
  const alternatingColors = (colors, offset) =>
    map(colors, (colorSteps, name) => {
      return map(colorSteps, (color, step) => ({
        [`.alternating-${offset}-${name}${
          isObject(colorSteps) && step !== "DEFAULT" ? `-${step}` : ""
        } > *:nth-child(${offset})`]: {
          "background-color": isObject(colorSteps) ? color : colorSteps,
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
    ...buildShadowPalette(theme)
  ], {
    variants: [...variants('boxShadow'), 'active']
  });
});

