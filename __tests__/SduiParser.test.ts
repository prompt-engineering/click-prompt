import "@testing-library/jest-dom";
import { parseStableDiffusionData } from "../src/data-processor/SduiParser";

describe("StableDiffusion Prompt Parser", () => {
  it("parse", () => {
    let str = `Prompt: particle effects small breasts, 1 girl, solo, {{masterpiece}}, {best quality},{highres}, original, extremely detailed 8K wallpaper, greasy skin, realistic and delicate facial features, slim waist, overexposure,ultra-detailed,illustration,incredibly_absurdres,ray tracing,intricate detail, colored tips,colored inner hair,aquagradient eyes,gradient eyes,eyelashes,finely detail, depth of field, in gentle breeze dance from ethereal chance. An aura of peace,beyond compare, cinematic lighting, dramatic angle, upper body, long dresses
Negative prompt: obese, (ugly:1.3), (duplicate:1.3), (morbid), (mutilated), out of frame, extra fingers, mutated hands, (poorly drawn hands), (poorly drawn face), (mutation:1.3), (deformed:1.3), (amputee:1.3), blurry,( bad anatomy), bad proportions, (extra limbs), cloned face, (disfigured:1.3), gross proportions, (malformed limbs), (missing arms), (missing legs), ((extra arms)), (extra legs), mutated hands, (fused fingers), (too many fingers), (long neck:1.3), lowres, text, error, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, black and white, monochrome, censored,empty,lingerie,, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry
Steps: 20, Sampler: Euler a, CFG scale: 7, Seed: 1338233768, Size: 512x512, Model hash: f773383dbc, Model: anything-v4.5-pruned-fp16
`;
    let result = parseStableDiffusionData(str);
    expect(result.model).toEqual("anything-v4.5-pruned-fp16");
  });

  it("parse lora", () => {
    let str = `Prompt: complex 3d render ultra detailed of a beautiful porcelain profile woman android face, cyborg, robotic parts, 150 mm, beautiful studio soft light, rim light, vibrant details, luxurious cyberpunk, lace, hyperrealistic, anatomical, facial muscles, cable electric wires, microchip, elegant, beautiful background, octane render, H. R. Giger style, 8k, best quality, masterpiece, illustration, an extremely delicate and beautiful, extremely detailed ,CG ,unity ,wallpaper, (realistic, photo-realistic:1.37),Amazing, finely detail, masterpiece,best quality,official art, extremely detailed CG unity 8k wallpaper, absurdres, incredibly absurdres,  <lora:japaneseDollLikeness_v10:0.1>, <lora:koreanDollLikeness_v10:0.5>, robot, silver halmet, full body, sitting
Negative prompt: illustration, 3d, sepia, painting, cartoons, sketch, (worst quality:2), (low quality:2), (normal quality:2), lowres, bad anatomy, bad hands, normal quality, ((monochrome)), ((grayscale:1.2)), futanari, full-package_futanari, penis_from_girl, newhalf, collapsed eyeshadow, multiple eyebrows, vaginas in breasts,holes on breasts, fleckles, stretched nipples, gigantic penis, nipples on buttocks, analog, analogphoto, signatre, logo,2 faces
Size: 512x784, Seed: 21364683354, Model: chilloutmix_NiPrunedFp32Fix, Steps: 33, Sampler: DPM++ SDE Karras, CFG scale: 7, Model hash: fc2511737a`;

    let result = parseStableDiffusionData(str);
    expect(result.lora.length).toEqual(2);
    expect(result.lora[0]).toEqual("japaneseDollLikeness_v10");
    expect(result.lora[1]).toEqual("koreanDollLikeness_v10");
  });
});
