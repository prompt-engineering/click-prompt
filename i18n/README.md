# i18n files

Inside this folder, the first folder level is locale code such as `en-US`, and in it has A LOT of json files the naming convention is:

- Global data is in the `$.json` file.
- For specific page data:
  - index page is corresponding to `_.json` file
  - other pages just use pathname without trailing slash and locale segment, and replace all `/` with `_`(cause in some filesystem `/` is illegal charactor in pathname). such as `_foo.json` for `/foo/`, `_foo_bar.json` for `/foo/bar/` . I think you get the idea.

# HOW TO USE IN RSC(React server component)

```typescript jsx
// page.server.tsx
import { getAppData } from "@/i18n";
import CSC from "./component.client.tsx";

async function RscFoo() {
  // ...
  const { locale, pathname, i18n } = await getAppData();
  const t = i18n.tFactory("/");
  // t is a function takes key and give you value in the json file
  t("title"); // will be "Streamline your prompt design"

  // you can also access global data by
  const g = i18n.g;

  const i18nProps: GeneralI18nProps = {
    locale,
    pathname,
    i18n: {
      dict: i18n.dict,
    },
  };

  // use i18n in CSC (client side component)
  return <CSC {...i18nProps} />;
  // ...
}
```

```typescript jsx
// component.client.tsx
"use client";

export default function CSC({ i18n }: GeneralI18nProps) {
  const { dict } = i18n;

  // use dict like plain object here
}
```
