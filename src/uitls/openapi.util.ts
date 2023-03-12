import { Configuration, OpenAIApi, type ConfigurationParameters } from "openai";
async function getConfig(apiKey: string) {
  const baseConf: ConfigurationParameters = {
    apiKey,
  };
  // FIXME now just for development
  if (process.env.NODE_ENV === "development" && process.env.PROXY_HOST && process.env.PROXY_PORT) {
    const { httpsOverHttp } = await import("tunnel");
    const tunnel = httpsOverHttp({
      proxy: {
        host: process.env.PROXY_HOST,
        port: process.env.PROXY_PORT as unknown as number,
      },
    });
    baseConf.baseOptions = {
      httpsAgent: tunnel,
      proxy: false,
    };
  }
  return baseConf;
}

async function createNewOpenAIApi(apiKey: string) {
  const conf = await getConfig(apiKey);
  const configuration = new Configuration(conf);

  return new OpenAIApi(configuration);
}

const chatClients = new Map<string, OpenAIApi>();

export async function getChatClient(keyHashed: string, apiKey: string) {
  const chatClient = chatClients.get(keyHashed) || (await createNewOpenAIApi(apiKey));
  chatClients.set(keyHashed, chatClient);
  return chatClient;
}
