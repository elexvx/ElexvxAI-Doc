# Content Config Layout

All site-configurable copy/data files are centralized in `data/content`.

Directory convention:

- `data/content/home/<locale>.yaml`
- `data/content/navigation/<locale>.yaml`
- `data/content/i18n/<locale>.yaml`
- `data/content/sponsors/<locale>.yaml`
- `data/content/seo/<locale>.yaml`

For sponsor page header buttons:

- `copy.cta`: button text
- `copy.ctaHref`: button link; set to an empty string to hide the button
- `copy.ctaExternal`: whether to open in a new tab

Locale filenames are unified as `en.yaml` and `zh.yaml`.
