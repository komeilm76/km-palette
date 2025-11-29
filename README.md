# 🎨 km-palette

A powerful **color palette generator** that converts your single theme config into:

✅ Vuetify theme format  
✅ Tailwind theme format  
✅ CSS Variables  
✅ Dark / Light mode ready  
✅ Fully typed with TypeScript

One config → Multiple Frameworks → Zero duplication

---

## 🚀 Features

✨ Single source of truth for colors  
🎨 Vuetify theme generator  
🌬 Tailwind CSS theme generator  
🧩 CSS variables generator  
🌙 Dark / Light mode support  
💪 Fully typed with TypeScript generics  
⚡ Fast & JSON based  
🔌 Framework agnostic

---

## 📦 Installation

With **npm**:

```bash
npm install km-palette
```

With **bun**:

```bash
bun add km-palette
```

---

## 📥 Import

```ts
import kmPalette from "km-palette";
import type {
  IDefaultColor,
  IDefaultColorMode,
  IDefaultPaletteType,
} from "km-palette";
import config from "./assets/config-default-theme.json";
```

---

## ✅ Step 1: Parse & Validate Theme Config

```ts
const takedConfig = kmPalette.take<
  IDefaultPaletteType,
  IDefaultColor,
  IDefaultColorMode
>(
  config as unknown as IConfig<
    "YES",
    IDefaultPaletteType,
    IDefaultColor,
    IDefaultColorMode
  >,
  { wood: true }
);
```

---

## ✅ Step 2: Generate Vuetify Theme

```ts
const vuetifyPalette = kmPalette.generateVuetifyPalette<
  IDefaultPaletteType,
  IDefaultColor,
  IDefaultColorMode
>(takedConfig.config);
```

---

## ✅ Step 3: Generate Tailwind + CSS Variables

```ts
const { dark, light, variables, tailwind } = await kmPalette.makeCssAsString<
  IDefaultPaletteType,
  IDefaultColor,
  IDefaultColorMode
>(takedConfig.config);
```

---

### 🎯 CSS Variables

```css
:root {
  --color-wood-dark-background: #2c2416;
  --color-wood-dark-surface: #3e3220;
  --color-wood-dark-surface-bright: #4f412b;
  --color-wood-dark-surface-light: #352a1a;
  --color-wood-dark-surface-variant: #d4b896;
  --color-wood-dark-on-surface-variant: #2c2416;
  --color-wood-dark-primary: #d4b896;
  --color-wood-dark-primary-darken-1: #c4a886;
  --color-wood-dark-secondary: #b89a76;
  --color-wood-dark-secondary-darken-1: #a88a66;
  --color-wood-dark-error: #e27d6a;
  --color-wood-dark-info: #6b8b9a;
  --color-wood-dark-success: #7a8b4f;
  --color-wood-dark-warning: #e8b854;
  --color-wood-light-background: #f5e8d0;
  --color-wood-light-surface: #e8d5b5;
  --color-wood-light-surface-bright: #f8edd8;
  --color-wood-light-surface-light: #dbc9a8;
  --color-wood-light-surface-variant: #8b7355;
  --color-wood-light-on-surface-variant: #f5e8d0;
  --color-wood-light-primary: #8b7355;
  --color-wood-light-primary-darken-1: #7a6245;
  --color-wood-light-secondary: #a78a6d;
  --color-wood-light-secondary-darken-1: #957857;
  --color-wood-light-error: #c44536;
  --color-wood-light-info: #4a6572;
  --color-wood-light-success: #556b2f;
  --color-wood-light-warning: #b8860b;
}
```

### 🎯 CSS Dark

```css
.theme-wood-dark {
  --color-tw-background: var(--color-wood-dark-background);
  --color-tw-surface: var(--color-wood-dark-surface);
  --color-tw-surface-bright: var(--color-wood-dark-surface-bright);
  --color-tw-surface-light: var(--color-wood-dark-surface-light);
  --color-tw-surface-variant: var(--color-wood-dark-surface-variant);
  --color-tw-on-surface-variant: var(--color-wood-dark-on-surface-variant);
  --color-tw-primary: var(--color-wood-dark-primary);
  --color-tw-primary-darken-1: var(--color-wood-dark-primary-darken-1);
  --color-tw-secondary: var(--color-wood-dark-secondary);
  --color-tw-secondary-darken-1: var(--color-wood-dark-secondary-darken-1);
  --color-tw-error: var(--color-wood-dark-error);
  --color-tw-info: var(--color-wood-dark-info);
  --color-tw-success: var(--color-wood-dark-success);
  --color-tw-warning: var(--color-wood-dark-warning);
}
```

### 🎯 CSS Light

```css
.theme-wood-light {
  --color-tw-background: var(--color-wood-light-background);
  --color-tw-surface: var(--color-wood-light-surface);
  --color-tw-surface-bright: var(--color-wood-light-surface-bright);
  --color-tw-surface-light: var(--color-wood-light-surface-light);
  --color-tw-surface-variant: var(--color-wood-light-surface-variant);
  --color-tw-on-surface-variant: var(--color-wood-light-on-surface-variant);
  --color-tw-primary: var(--color-wood-light-primary);
  --color-tw-primary-darken-1: var(--color-wood-light-primary-darken-1);
  --color-tw-secondary: var(--color-wood-light-secondary);
  --color-tw-secondary-darken-1: var(--color-wood-light-secondary-darken-1);
  --color-tw-error: var(--color-wood-light-error);
  --color-tw-info: var(--color-wood-light-info);
  --color-tw-success: var(--color-wood-light-success);
  --color-tw-warning: var(--color-wood-light-warning);
}
```

### 🎯 CSS Tailwind

```css
@theme {
  --color-tw-background: var(--color-tw-background);
  --color-tw-surface: var(--color-tw-surface);
  --color-tw-surface-bright: var(--color-tw-surface-bright);
  --color-tw-surface-light: var(--color-tw-surface-light);
  --color-tw-surface-variant: var(--color-tw-surface-variant);
  --color-tw-on-surface-variant: var(--color-tw-on-surface-variant);
  --color-tw-primary: var(--color-tw-primary);
  --color-tw-primary-darken-1: var(--color-tw-primary-darken-1);
  --color-tw-secondary: var(--color-tw-secondary);
  --color-tw-secondary-darken-1: var(--color-tw-secondary-darken-1);
  --color-tw-error: var(--color-tw-error);
  --color-tw-info: var(--color-tw-info);
  --color-tw-success: var(--color-tw-success);
  --color-tw-warning: var(--color-tw-warning);
}
```

---

## 📁 Example Config

```json
{
  "jungle": {
    "light": {
      "background": "#F0FFF0",
      "surface": "#E8F5E8",
      "surface-bright": "#F8FFF8",
      "surface-light": "#D4EBD4",
      "surface-variant": "#228B22",
      "on-surface-variant": "#F0FFF0",
      "primary": "#228B22",
      "primary-darken-1": "#1C7A1C",
      "secondary": "#32CD32",
      "secondary-darken-1": "#2CBD2C",
      "error": "#8B0000",
      "info": "#20B2AA",
      "success": "#006400",
      "warning": "#9ACD32"
    },
    "dark": {
      "background": "#0A2A0A",
      "surface": "#1A3A1A",
      "surface-bright": "#2A4A2A",
      "surface-light": "#143214",
      "surface-variant": "#90EE90",
      "on-surface-variant": "#0A2A0A",
      "primary": "#90EE90",
      "primary-darken-1": "#80DE80",
      "secondary": "#7CFC7C",
      "secondary-darken-1": "#6CEC6C",
      "error": "#CD5C5C",
      "info": "#48D1CC",
      "success": "#32CD32",
      "warning": "#ADFF2F"
    }
  },
  "office": {
    "light": {
      "background": "#FFFFFF",
      "surface": "#F5F5F5",
      "surface-bright": "#FFFFFF",
      "surface-light": "#E8E8E8",
      "surface-variant": "#2C5F9E",
      "on-surface-variant": "#F5F5F5",
      "primary": "#2C5F9E",
      "primary-darken-1": "#25508E",
      "secondary": "#5F9EA0",
      "secondary-darken-1": "#4F8E90",
      "error": "#8B0000",
      "info": "#4682B4",
      "success": "#2E8B57",
      "warning": "#DAA520"
    },
    "dark": {
      "background": "#0A1A2F",
      "surface": "#1A2A3F",
      "surface-bright": "#2A3A4F",
      "surface-light": "#142235",
      "surface-variant": "#7EB6FF",
      "on-surface-variant": "#0A1A2F",
      "primary": "#7EB6FF",
      "primary-darken-1": "#6EA6EF",
      "secondary": "#8FD0D2",
      "secondary-darken-1": "#7FC0C2",
      "error": "#CD5C5C",
      "info": "#6A9FCF",
      "success": "#5EAB7F",
      "warning": "#E8C54F"
    }
  },
  "wood": {
    "light": {
      "background": "#F5E8D0",
      "surface": "#E8D5B5",
      "surface-bright": "#F8EDD8",
      "surface-light": "#DBC9A8",
      "surface-variant": "#8B7355",
      "on-surface-variant": "#F5E8D0",
      "primary": "#8B7355",
      "primary-darken-1": "#7A6245",
      "secondary": "#A78A6D",
      "secondary-darken-1": "#957857",
      "error": "#C44536",
      "info": "#4A6572",
      "success": "#556B2F",
      "warning": "#B8860B"
    },
    "dark": {
      "background": "#2C2416",
      "surface": "#3E3220",
      "surface-bright": "#4F412B",
      "surface-light": "#352A1A",
      "surface-variant": "#D4B896",
      "on-surface-variant": "#2C2416",
      "primary": "#D4B896",
      "primary-darken-1": "#C4A886",
      "secondary": "#B89A76",
      "secondary-darken-1": "#A88A66",
      "error": "#E27D6A",
      "info": "#6B8B9A",
      "success": "#7A8B4F",
      "warning": "#E8B854"
    }
  }
}
```

---

## 🧬 Type System

```ts
kmPalette.take<PaletteKey, ColorKey, ModeKey>({ wood: true });
```

---

## 🔧 API

### take(config, options)

Validates and parses your theme.

### generateVuetifyPalette(config)

Returns Vuetify theme structure.

### makeCssAsString(config)

Returns CSS + Tailwind configs.

---

## ❤️ License

MIT

---

One theme config to rule them all 😎
