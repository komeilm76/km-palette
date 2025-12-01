import _ from 'lodash';
import type { IDefaultColor, IDefaultColorMode, IDefaultPaletteType } from './defaultPalette';
// import { format } from 'prettier';

export type ISelectPalette<PALETTE extends string> = Record<PALETTE, boolean>;

type IStrct = 'YES' | 'STRICT_COLOR' | 'NO';

const makeConfig = <
  T extends [STRICT, PALETTE, COLOR, MODE] | [STRICT, PALETTE, COLOR],
  STRICT extends IStrct = IStrct,
  PALETTE extends string = string,
  COLOR extends string = string,
  MODE extends string = string,
>(
  config: T['0'] extends 'YES'
    ? Record<
        T['1'],
        {
          dark: T['3'] extends string
            ? Record<T['2'] | `${T['2']}-${T['3']}`, string>
            : Record<T['2'], string>;
          light: T['3'] extends string
            ? Record<T['2'] | `${T['2']}-${T['3']}`, string>
            : Record<T['2'], string>;
        }
      >
    : T['0'] extends 'STRICT_COLOR'
      ? Record<
          T['1'],
          {
            dark: T['3'] extends string
              ? Record<T['2'], string> & Partial<Record<`${T['2']}-${T['3']}`, string>>
              : Record<T['2'], string> & Partial<Record<`${T['2']}`, string>>;
            light: T['3'] extends string
              ? Record<T['2'], string> & Partial<Record<`${T['2']}-${T['3']}`, string>>
              : Record<T['2'], string> & Partial<Record<`${T['2']}`, string>>;
          }
        >
      : Record<
          T['1'],
          {
            dark: T['3'] extends string
              ? Partial<Record<T['2'] | `${T['2']}-${T['3']}`, string>>
              : Partial<Record<T['2'], string>>;
            light: T['3'] extends string
              ? Partial<Record<T['2'] | `${T['2']}-${T['3']}`, string>>
              : Partial<Record<T['2'], string>>;
          }
        >,
) => {
  return config;
};

export type IConfig<T extends [IStrct, string, string, string]> = ReturnType<
  typeof makeConfig<[T['0'], T['1'], T['2'], T['3']]>
>;

const take = <
  T extends [PALETTE, COLOR, MODE] | [PALETTE, COLOR],
  PALETTE extends string = string,
  COLOR extends string = string,
  MODE extends string = string,
>(
  config: Record<
    T['0'],
    {
      dark: T['2'] extends string
        ? Record<T['1'] | `${T['1']}-${T['2']}`, string>
        : Record<T['1'], string>;
      light: T['2'] extends string
        ? Record<T['1'] | `${T['1']}-${T['2']}`, string>
        : Record<T['1'], string>;
    }
  >,
  entryOptions: Partial<Record<T['0'], boolean>>,
) => {
  const output = { ...config } as const;
  for (const _key in output) {
    const key = _key as T['0'];
    if (!entryOptions[key] == true) {
      delete output[key];
    }
  }
  return { config: output, names: Object.keys(output) };
};

// take<['wood', 'primary' | 'secondary']>(
//   {
//     wood: {
//       dark: {

//       },

//     },
//   },
//   { wood: true },
// );

const generateVuetifyPalette = <
  T extends [PALETTE, COLOR, MODE] | [PALETTE, COLOR],
  PALETTE extends string = string,
  COLOR extends string = string,
  MODE extends string = string,
>(
  config: Record<
    T['0'],
    {
      dark: T['2'] extends string
        ? Record<T['1'] | `${T['1']}-${T['2']}`, string>
        : Record<T['1'], string>;
      light: T['2'] extends string
        ? Record<T['1'] | `${T['1']}-${T['2']}`, string>
        : Record<T['1'], string>;
    }
  >,
) => {
  const result = () => {
    const output = {} as Record<
      `${T['0']}-dark` | `${T['0']}-light`,
      {
        colors: T['2'] extends string
          ? Record<T['1'] | `${T['1']}-${T['2']}`, string>
          : Record<T['1'], string>;
        dark: boolean;
      }
    >;
    for (const _key in config) {
      const key = _key as T['0'];
      const { light, dark } = config[key];
      output[`${key}-dark`] = { colors: dark, dark: true };
      output[`${key}-light`] = { colors: light, dark: false };
    }
    return output;
  };
  return result();
};

const generateFlattenPalette = <
  T extends [PALETTE, COLOR, MODE] | [PALETTE, COLOR],
  PALETTE extends string = string,
  COLOR extends string = string,
  MODE extends string = string,
>(
  config: Record<
    T['0'],
    {
      dark: T['2'] extends string
        ? Record<T['1'] | `${T['1']}-${T['2']}`, string>
        : Record<T['1'], string>;
      light: T['2'] extends string
        ? Record<T['1'] | `${T['1']}-${T['2']}`, string>
        : Record<T['1'], string>;
    }
  >,
) => {
  const result = () => {
    const output = {} as Record<
      T['2'] extends string
        ?
            | `${T['0']}-dark-${T['1']}`
            | `${T['0']}-light-${T['1']}`
            | `${T['0']}-dark-${T['1']}-${T['2']}`
            | `${T['0']}-light-${T['1']}-${T['2']}`
        : `${T['0']}-dark-${T['1']}` | `${T['0']}-light-${T['1']}`,
      string
    >;

    for (const _key in config) {
      const key = _key as T['0'];
      const { light, dark } = config[key];
      for (const color in dark) {
        const outputKey = `${key}-dark-${color}` as keyof typeof output;
        const outputValue = dark[color];
        output[outputKey] = outputValue;
      }
      for (const color in light) {
        const outputKey = `${key}-light-${color}` as keyof typeof output;
        const outputValue = light[color];
        output[outputKey] = outputValue;
      }
    }
    return output;
  };
  return result();
};

const onEachColorOfPalette = <
  T extends [PALETTE, COLOR, MODE] | [PALETTE, COLOR],
  PALETTE extends string = string,
  COLOR extends string = string,
  MODE extends string = string,
>(
  config: Record<
    T['0'],
    {
      dark: T['2'] extends string
        ? Record<T['1'] | `${T['1']}-${T['2']}`, string>
        : Record<T['1'], string>;
      light: T['2'] extends string
        ? Record<T['1'] | `${T['1']}-${T['2']}`, string>
        : Record<T['1'], string>;
    }
  >,
  options: {
    onFinishPalette: (paletteName: T['0'], paletteValue: (typeof config)[T['0']]) => void;
    onStartPalette: (paletteName: T['0'], paletteValue: (typeof config)[T['0']]) => void;
    onFinishThemeMode: (
      themeMode: 'dark' | 'light',
      paletteName: T['0'],
      paletteValue: (typeof config)[T['0']],
    ) => void;
    onColor: (
      colorName: T['1'] | (T['2'] extends string ? `${T['1']}-${T['2']}` : T['1']),
      colorValue: string,
      themeMode: 'dark' | 'light',
      paletteName: T['0'],
      paletteValue: (typeof config)[T['0']],
    ) => void;
  },
) => {
  const result = () => {
    for (const _key in config) {
      const key = _key as T['0'];
      options.onStartPalette(key, config[key]);
      const { light, dark } = config[key];
      for (const color in dark) {
        options.onColor(
          color as unknown as T['1'] | (T['2'] extends string ? `${T['1']}-${T['2']}` : T['1']),
          dark[color],
          'dark',
          key,
          config[key],
        );
      }
      options.onFinishThemeMode('dark', key, config[key]);
      for (const color in light) {
        options.onColor(
          color as unknown as T['1'] | (T['2'] extends string ? `${T['1']}-${T['2']}` : T['1']),
          light[color],
          'light',
          key,
          config[key],
        );
      }
      options.onFinishThemeMode('light', key, config[key]);
      options.onFinishPalette(key, config[key]);
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

const format = async (data: string, options: { parser: 'css'; printWidth: number }) => {
  return data;
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

const makeCssAsString = async <
  T extends [PALETTE, COLOR, MODE] | [PALETTE, COLOR],
  PALETTE extends string = string,
  COLOR extends string = string,
  MODE extends string = string,
>(
  config: Record<
    T['0'],
    {
      dark: T['2'] extends string
        ? Record<T['1'] | `${T['1']}-${T['2']}`, string>
        : Record<T['1'], string>;
      light: T['2'] extends string
        ? Record<T['1'] | `${T['1']}-${T['2']}`, string>
        : Record<T['1'], string>;
    }
  >,
) => {
  const rootVariables: any = {};
  const lightClass: any = {};
  const darkClass: any = {};
  const tailwindTheme: any = {};
  onEachColorOfPalette(config, {
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

  const variables: { css: string; cssFileName: string; name: string }[] = [];
  const light: { css: string; cssFileName: string; name: string }[] = [];
  const dark: { css: string; cssFileName: string; name: string }[] = [];

  for (const key in rootVariables) {
    const css = `:root {${objectToCss(rootVariables[key])}}`;
    variables.push({ css: await formatCss(css), name: key, cssFileName: `${key}-variables.css` });
  }
  for (const key in lightClass) {
    const css = `.theme-${key}-light {${objectToCss(lightClass[key])}}`;
    light.push({ css: await formatCss(css), name: key, cssFileName: `${key}-light.css` });
  }
  for (const key in darkClass) {
    const css = `.theme-${key}-dark {${objectToCss(darkClass[key])}}`;
    dark.push({ css: await formatCss(css), name: key, cssFileName: `${key}-dark.css` });
  }
  const fileNames: string[] = [];
  [variables, light, dark].forEach((items) => {
    items.forEach((item) => {
      fileNames.push(item.cssFileName);
    });
  });
  const tailwindImports: string = [
    '@import "tailwindcss";',
    ...fileNames.map((fileName) => `@import "./${fileName}";`),
  ].join('\n');
  const tailwind: { css: string; cssFileName: string; name: string } = {
    name: 'tailwind',
    css: await formatCss(`${tailwindImports}\n@theme{${objectToCss(tailwindTheme)}}`),
    cssFileName: 'tailwind.css',
  };
  return {
    variables,
    light,
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
