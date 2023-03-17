export interface Sample {
  name: string;
  description: string;
  author: string;
  category: string;
  homepage: string;
  preview: string;
  path: string;
}

export interface SampleDetail {
  name: string;
  description: string;
  category: string;
  author: string;
  homepage: string;
  preview: string;
  steps: {
    ask: string;
    response: string;
  }[];
}
