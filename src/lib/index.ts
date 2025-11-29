import _ from 'lodash';
import type { IDefaultColor, IDefaultColorMode, IDefaultPaletteType } from './defaultPalette';
import { format } from 'prettier';

export type ISelectPalette<PALETTE extends string> = Record<PALETTE, boolean>;

type IStrct = 'YES' | 'STRICT_COLOR' | 'NO';

/**
 * Creates a typed color-theme configuration.
 * Strictness is controlled by the first generic:
 * - "YES" → all colors + modes required
 * - "STRICT_COLOR" → colors required, modes optional
 * - "NO" → everything optional
 *
 * @template {'YES' | 'STRICT_COLOR' | 'NO'} STRICT
 * @template {string} PALETTE
 * @template {string} COLOR
 * @template {string} MODE
 *
 * @param {STRICT extends 'YES'
 *   ? Record<PALETTE, {
 *       dark:  Record<COLOR | `${COLOR}-${MODE}`, string>;
 *       light: Record<COLOR | `${COLOR}-${MODE}`, string>;
 *     }>
 *   : STRICT extends 'STRICT_COLOR'
 *   ? Record<PALETTE, {
 *       dark:  Record<COLOR, string> & Partial<Record<`${COLOR}-${MODE}`, string>>;
 *       light: Record<COLOR, string> & Partial<Record<`${COLOR}-${MODE}`, string>>;
 *     }>
 *   : Record<PALETTE, {
 *       dark:  Partial<Record<COLOR | `${COLOR}-${MODE}`, string>>;
 *       light: Partial<Record<COLOR | `${COLOR}-${MODE}`, string>>;
 *     }>
 * } config
 *
 * @returns {typeof config}
 *
 * @example
 * // 1 — STRICT: "YES"
 * makeConfig<
 *  'YES',
 *  'wood' | 'chroma',
 *  'primary' | 'secondary',
 *  'hover' | 'focus'
 * >({
 *   wood: {
 *     dark: { primary: '#000', 'primary-hover': '#111', secondary: '#222', 'secondary-focus': '#333' },
 *     light:{ primary: '#fff', 'primary-hover': '#eee', secondary: '#ddd', 'secondary-focus': '#ccc' }
 *   },
 *   chroma: {
 *     dark: { primary: '#010', 'primary-hover': '#020', secondary: '#030', 'secondary-focus': '#040' },
 *     light:{ primary: '#f10', 'primary-hover': '#f20', secondary: '#f30', 'secondary-focus': '#f40' }
 *   }
 * });
 *
 * @example
 * // 2 — STRICT: "STRICT_COLOR"
 * makeConfig<
 *  'STRICT_COLOR',
 *  'neo',
 *  'primary' | 'background',
 *  'hover' | 'fade-1'
 * >({
 *   neo: {
 *     dark: { primary: '#000', background: '#222', 'primary-hover': '#333' },
 *     light:{ primary: '#fff', background: '#eee' }
 *   }
 * });
 *
 * @example
 * // 3 — STRICT: "NO"
 * makeConfig<
 *  'NO',
 *  'galaxy',
 *  'surface' | 'primary',
 *  'darken-1' | 'hover'
 * >({
 *   galaxy: {
 *     dark:  { primary: '#555', 'primary-hover': '#666' },
 *     light: { surface: '#ccc' }
 *   }
 * });
 *
 * @example
 * // 4
 * makeConfig<'NO','wood','primary','hover'>({
 *   wood: { dark:{ primary:'#000' }, light:{} }
 * });
 *
 * @example
 * // 5
 * makeConfig<'STRICT_COLOR','chroma','primary' | 'background','focus'>({
 *   chroma:{ dark:{ primary:'#222', background:'#333' }, light:{ primary:'#ddd' } }
 * });
 *
 * @example
 * // 6
 * makeConfig<'YES','neo','primary','hover'>({
 *   neo:{ dark:{ primary:'#111','primary-hover':'#222' }, light:{ primary:'#eee','primary-hover':'#fff' } }
 * });
 *
 * @example
 * // 7
 * makeConfig<'NO','galaxy','surface','fade-1'>({
 *   galaxy:{ dark:{ 'surface-fade-1':'#999' }, light:{} }
 * });
 *
 * @example
 * // 8
 * makeConfig<'STRICT_COLOR','wood','primary' | 'secondary','hover'>({
 *   wood:{ dark:{ primary:'#100', secondary:'#200','primary-hover':'#300' }, light:{ primary:'#eee', secondary:'#ddd' } }
 * });
 *
 * @example
 * // 9
 * makeConfig<'NO','neo' | 'galaxy','primary','darken-1'>({
 *   neo:{ dark:{ 'primary-darken-1':'#454545' }, light:{} }
 * });
 *
 * @example
 * // 10
 * makeConfig<'STRICT_COLOR','chroma','primary','hover' | 'fade-1'>({
 *   chroma:{ dark:{ primary:'#121212','primary-hover':'#131313' }, light:{ primary:'#fafafa' } }
 * });
 */

const makeConfig = <
  STRICT extends IStrct,
  PALETTE extends string,
  COLOR extends string,
  MODE extends string,
>(
  config: STRICT extends 'YES'
    ? Record<
        PALETTE,
        {
          dark: Record<COLOR | `${COLOR}-${MODE}`, string>;
          light: Record<COLOR | `${COLOR}-${MODE}`, string>;
        }
      >
    : STRICT extends 'STRICT_COLOR'
      ? Record<
          PALETTE,
          {
            dark: Record<COLOR, string> & Partial<Record<`${COLOR}-${MODE}`, string>>;
            light: Record<COLOR, string> & Partial<Record<`${COLOR}-${MODE}`, string>>;
          }
        >
      : Record<
          PALETTE,
          {
            dark: Partial<Record<COLOR | `${COLOR}-${MODE}`, string>>;
            light: Partial<Record<COLOR | `${COLOR}-${MODE}`, string>>;
          }
        >,
) => {
  return config;
};

export type IConfig<
  STRICT extends IStrct,
  PALETTE extends string,
  COLOR extends string,
  MODE extends string,
> = ReturnType<typeof makeConfig<STRICT, PALETTE, COLOR, MODE>>;

const take = <PALETTE extends string, COLOR extends string, MODE extends string>(
  config: Record<
    PALETTE,
    {
      dark: Record<COLOR | `${COLOR}-${MODE}`, string>;
      light: Record<COLOR | `${COLOR}-${MODE}`, string>;
    }
  >,
  entryOptions: Partial<ISelectPalette<PALETTE>>,
) => {
  const output = { ...config } as const;
  for (const key in output) {
    if (!entryOptions[key] == true) {
      delete output[key];
    }
  }
  // const filtered = _.filter(config, (data, key) => {
  //   return entryOptions[key as PALETTE] == true;
  // });
  return { config: output, names: Object.keys(output) };
};

const generateVuetifyPalette = <PALETTE extends string, COLOR extends string, MODE extends string>(
  config: Record<
    PALETTE,
    {
      dark: Record<COLOR | `${COLOR}-${MODE}`, string>;
      light: Record<COLOR | `${COLOR}-${MODE}`, string>;
    }
  >,
) => {
  const result = () => {
    const output = {} as Record<
      `${PALETTE}-dark` | `${PALETTE}-light`,
      { colors: Record<COLOR | `${COLOR}-${MODE}`, string>; dark: boolean }
    >;
    for (const _key in config) {
      const { light, dark } = config[_key];
      output[`${_key}-dark`] = { colors: dark, dark: true };
      output[`${_key}-light`] = { colors: light, dark: false };
    }
    return output;
  };
  return result();
};

const generateFlattenPalette = <PALETTE extends string, COLOR extends string, MODE extends string>(
  config: Record<
    PALETTE,
    {
      dark: Record<COLOR | `${COLOR}-${MODE}`, string>;
      light: Record<COLOR | `${COLOR}-${MODE}`, string>;
    }
  >,
) => {
  const result = () => {
    const output = {} as Record<
      | `${PALETTE}-dark-${COLOR}`
      | `${PALETTE}-light-${COLOR}`
      | `${PALETTE}-dark-${COLOR}-${MODE}`
      | `${PALETTE}-light-${COLOR}-${MODE}`,
      string
    >;
    for (const _key in config) {
      const { light, dark } = config[_key];
      for (const color in dark) {
        const outputKey = `${_key}-dark-${color as COLOR}` as const;
        const outputValue = dark[color as COLOR];
        output[outputKey] = outputValue;
      }
      for (const color in light) {
        const outputKey = `${_key}-light-${color as COLOR}` as const;
        const outputValue = light[color as COLOR];
        output[outputKey] = outputValue;
      }
    }
    return output;
  };
  return result();
};

const onEachColorOfPalette = <PALETTE extends string, COLOR extends string, MODE extends string>(
  config: Record<
    PALETTE,
    {
      dark: Record<COLOR | `${COLOR}-${MODE}`, string>;
      light: Record<COLOR | `${COLOR}-${MODE}`, string>;
    }
  >,
  options: {
    onFinishPalette: (paletteName: PALETTE, paletteValue: (typeof config)[PALETTE]) => void;
    onStartPalette: (paletteName: PALETTE, paletteValue: (typeof config)[PALETTE]) => void;
    onFinishThemeMode: (
      themeMode: 'dark' | 'light',
      paletteName: PALETTE,
      paletteValue: (typeof config)[PALETTE],
    ) => void;
    onColor: (
      colorName: COLOR,
      colorValue: string,
      themeMode: 'dark' | 'light',
      paletteName: PALETTE,
      paletteValue: (typeof config)[PALETTE],
    ) => void;
  },
) => {
  const result = () => {
    for (const _key in config) {
      options.onStartPalette(_key, config[_key]);
      const { light, dark } = config[_key];
      for (const color in dark) {
        options.onColor(color as COLOR, dark[color as COLOR], 'dark', _key, config[_key]);
      }
      options.onFinishThemeMode('dark', _key, config[_key]);
      for (const color in dark) {
        options.onColor(color as COLOR, light[color as COLOR], 'light', _key, config[_key]);
      }
      options.onFinishThemeMode('light', _key, config[_key]);
      options.onFinishPalette(_key, config[_key]);
    }
  };
  return result();
};

const toCssVariables = <OBJECT extends object, PREFIX extends string>(
  object: OBJECT,
  prefix: PREFIX,
) => {
  const output = {};
  for (const key in object) {
    console.log('key', key);
    // @ts-ignore
    output[`--${prefix}-${key}`] = object[key];
  }
  return output;
};
const objectToCss = (object: object) => {
  const css = Object.entries(object)
    .map(([k, v]) => `${k}:${v}`)
    .join(';');
  return css;
};
const formatCss = async (css: string) => {
  return await format(css, { parser: 'css', printWidth: 140 });
};
const makeTailwindClass = <OBJECT extends object, PREFIX extends string>(
  object: OBJECT,
  prefix: PREFIX,
) => {
  const output = {};
  for (const key in object) {
    console.log('key', key);
    // @ts-ignore
    output[`--${prefix}-${key}`] = object[key];
  }
  return output;
};

const makeCssAsString = async <PALETTE extends string, COLOR extends string, MODE extends string>(
  config: Record<
    PALETTE,
    {
      dark: Record<COLOR | `${COLOR}-${MODE}`, string>;
      light: Record<COLOR | `${COLOR}-${MODE}`, string>;
    }
  >,
) => {
  const rootVariables: any = {};
  const lightClass: any = {};
  const darkClass: any = {};
  const tailwindTheme: any = {};
  onEachColorOfPalette<PALETTE, COLOR, MODE>(config, {
    onStartPalette: (paletteName, paletteValue) => {
      rootVariables[paletteName] = {};
      lightClass[paletteName] = {};
      darkClass[paletteName] = {};
    },
    onFinishPalette: (paletteName, paletteValue) => {},
    onFinishThemeMode: (themeMode) => {},
    onColor: (colorName, colorValue, themeMode, paletteName, paletteValue) => {
      tailwindTheme[`--color-tw-${colorName}`] = `var(${`--color-tw-${colorName}`})`;
      rootVariables[paletteName][`--color-${paletteName}-${themeMode}-${colorName}`] = colorValue;
      if (themeMode == 'light') {
        lightClass[paletteName][`--color-tw-${colorName}`] =
          `var(--color-${paletteName}-${themeMode}-${colorName})`;
      } else {
        darkClass[paletteName][`--color-tw-${colorName}`] =
          `var(--color-${paletteName}-${themeMode}-${colorName})`;
      }
    },
  });

  const variables: { css: string; name: string }[] = [];
  const ligh: { css: string; name: string }[] = [];
  const dark: { css: string; name: string }[] = [];
  const tailwind: { css: string; name: string } = {
    name: 'tailwind',
    css: await formatCss(`@theme{${objectToCss(tailwindTheme)}}`),
  };
  for (const key in rootVariables) {
    const css = `:root {${objectToCss(rootVariables[key])}}`;
    variables.push({ css: await formatCss(css), name: key });
  }
  for (const key in lightClass) {
    const css = `.theme-${key}-light {${objectToCss(lightClass[key])}}`;
    ligh.push({ css: await formatCss(css), name: key });
  }
  for (const key in darkClass) {
    const css = `.theme-${key}-dark {${objectToCss(darkClass[key])}}`;
    dark.push({ css: await formatCss(css), name: key });
  }
  return {
    variables,
    ligh,
    dark,
    tailwind,
  };
};

export default {
  makeConfig,
  generateVuetifyPalette,
  // generateFlattenPalette,
  take,
  // toCssVariables,
  // onEachColorOfPalette,
  // objectToCss,
  makeCssAsString,
};
