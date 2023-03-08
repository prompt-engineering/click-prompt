# i18n files

Inside this folder, the first folder level is locale code such as `en-US`, and in it has A LOT of json files the naming convention is:

- Global data is in the `*.json` file.
- For specific page data:
  - index page is corresponding to `_.json` file
  - other pages just use pathname without trailing slash and locale segment, and replace all `/` with `_`(cause in some filesystem `/` is illegal charactor in pathname). such as `_foo.json` for `/foo/`, `_foo_bar.json` for `/foo/bar/` . I think you get the idea.



# HOW TO USE IN RSC(React server component)

```typescript
import { getAppData } from "@/i18n";

async function RscFoo() {
  // ...
  const { i18n } = await getAppData();
  const t = i18n.tFactory("/"); 
  // t is a function takes key and give you value in the json file
  // ...
}

```

