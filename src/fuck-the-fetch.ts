import fetch, { Blob, Headers, Request, Response } from "node-fetch";

(fetch as any).__XX_PATCHED__ = true;
(globalThis as any).fetch = fetch;
(globalThis as any).Blob = Blob;
(globalThis as any).Headers = Headers;
(globalThis as any).Request = Request;
(globalThis as any).Response = Response;
