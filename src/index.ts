import lib, { type IConfig } from './lib';
import _ from 'lodash';
// import jsonFix from 'json-fixer';
// import type { IDefaultColor, IDefaultColorMode, IDefaultPaletteType } from './lib/defaultPalette';
const kmPalette = lib;
export default kmPalette;

// const src = jetpack.cwd('src/assets/vuetify');
// const pathes = src.find({ directories: true, files: false });
// const data: any = {};
// console.log('pathes', pathes);
// const make = async () => {
//   for (const path of pathes) {
//     const staticPath = `src/assets/vuetify/${path}/index.ts`;
//     const response = await jetpack.readAsync(staticPath, 'utf8');
//     const removedUnwanteds =
//       response
//         ?.split('export default { palette };')
//         .join('')
//         .split(`import type { IPalette } from "../types";`)
//         .join('')
//         .split(`// ${path.toUpperCase()} Theme`)
//         .join('')
//         .split(`const palette: IPalette =`)
//         .join('')
//         .split('};')
//         .join('}') || '{}';
//     const fixedJsonData = jsonFix(removedUnwanteds).data;
//     // @ts-ignore
//     data[path] = fixedJsonData;
//   }
// };
// await make();

// import config from './assets/config-default-theme.json';
// const takedConfig = lib.take<IDefaultPaletteType, IDefaultColor, IDefaultColorMode>(
//   config as unknown as IConfig<'YES', IDefaultPaletteType, IDefaultColor, IDefaultColorMode>,
//   { wood: true },
// );

// const vuetifyPalette = lib.generateVuetifyPalette<
//   IDefaultPaletteType,
//   IDefaultColor,
//   IDefaultColorMode
// >(takedConfig.config);
// const { dark, ligh, variables, tailwind } = await lib.makeCssAsString<
//   IDefaultPaletteType,
//   IDefaultColor,
//   IDefaultColorMode
// >(takedConfig.config);

// dark.forEach((item, index) => {
//   jetpack.write(`./css-rendered/test-file-dark-${item.name}.css`, item.css);
// });
// ligh.forEach((item, index) => {
//   jetpack.write(`./css-rendered/test-file-light-${item.name}.css`, item.css);
// });
// variables.forEach((item, index) => {
//   jetpack.write(`./css-rendered/test-file-variable-${item.name}.css`, item.css);
// });

// jetpack.write(`./css-rendered/test-file-${tailwind.name}.css`, tailwind.css);
