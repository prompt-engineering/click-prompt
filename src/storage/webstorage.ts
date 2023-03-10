type WebStorageType = "localStorage" | "sessionStorage";

export class WebStorage<T> {
  type: WebStorageType = "localStorage";
  name: string;

  constructor(name: string, type?: WebStorageType) {
    this.name = name;
    type && (this.type = type);
  }

  get storage(): Storage {
    return window[this.type];
  }

  get<T>() {
    try {
      return JSON.parse(this.storage.getItem(this.name) ?? "") as T;
    } catch (e) {
      return null;
    }
  }

  set(value: T) {
    this.storage.setItem(this.name, JSON.stringify(value));
  }

  remove() {
    this.storage.removeItem(this.name);
  }
}
