import configs from "./configs.json";
export { getLocales as getLocales,default as languages } from "./langs.js";

/**
 *
 * @returns string
 */
export const getLocale = () => {
  return configs.locale;
};
