import fetch, { Blob, Headers, Request, Response } from "node-fetch";

(fetch as any).__XX_PATCHED__ = true;
(globalThis as any).fetch = fetch;
