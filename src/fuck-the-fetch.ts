import fetch, {
  Blob,
  blobFrom,
  blobFromSync,
  File,
  fileFrom,
  fileFromSync,
  FormData,
  Headers,
  Request,
  Response,
} from "node-fetch";

(globalThis as any).fetch = fetch;
(globalThis as any).Blob = Blob;
(globalThis as any).blobFrom = blobFrom;
(globalThis as any).blobFromSync = blobFromSync;
(globalThis as any).File = File;
(globalThis as any).fileFrom = fileFrom;
(globalThis as any).fileFromSync = fileFromSync;
(globalThis as any).FormData = FormData;
(globalThis as any).Headers = Headers;
(globalThis as any).Request = Request;
(globalThis as any).Response = Response;
