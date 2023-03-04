import "@testing-library/jest-dom";
import { parseStableDiffusionPrompt } from "../src/data-processor/SduiParser";

describe("StableDiffusion Prompt Parser", () => {
  it("parse", () => {
    let str = `Prompt: particle effects small breasts, 1 girl, solo, {{masterpiece}}, {best quality},{highres}, original, extremely detailed 8K wallpaper, greasy skin, realistic and delicate facial features, slim waist, overexposure,ultra-detailed,illustration,incredibly_absurdres,ray tracing,intricate detail, colored tips,colored inner hair,aquagradient eyes,gradient eyes,eyelashes,finely detail, depth of field, in gentle breeze dance from ethereal chance. An aura of peace,beyond compare, cinematic lighting, dramatic angle, upper body, long dresses
Negative prompt: obese, (ugly:1.3), (duplicate:1.3), (morbid), (mutilated), out of frame, extra fingers, mutated hands, (poorly drawn hands), (poorly drawn face), (mutation:1.3), (deformed:1.3), (amputee:1.3), blurry,( bad anatomy), bad proportions, (extra limbs), cloned face, (disfigured:1.3), gross proportions, (malformed limbs), (missing arms), (missing legs), ((extra arms)), (extra legs), mutated hands, (fused fingers), (too many fingers), (long neck:1.3), lowres, text, error, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, black and white, monochrome, censored,empty,lingerie,, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry
Steps: 20, Sampler: Euler a, CFG scale: 7, Seed: 1338233768, Size: 512x512, Model hash: f773383dbc, Model: anything-v4.5-pruned-fp16
`;
    let result = parseStableDiffusionPrompt(str);
    expect(result.model).toEqual("anything-v4.5-pruned-fp16");
  });
});
