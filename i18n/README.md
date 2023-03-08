# i18n files

Inside this folder, the first folder level is locale code such as `en-US`, and in it has lot of json files the naming convention is:

- Global data is `*.json`
- For specific page data:
  - index page is `_.json`
  - other pages just use pathname without trailing slash and locale segment, such as `_foo.json` for `/foo/`, `_foo_bar.json` for `/foo/bar/` . I think you get the idea.
