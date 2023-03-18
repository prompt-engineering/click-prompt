"use client";

import { useState, MouseEventHandler, useMemo, ChangeEventHandler } from "react";
import { Box, Card, CardBody, CardFooter, CardHeader, Flex, Text, Link, Stack, Select } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import girl1_neutral from "@/assets/images/visual-novel/00055-3317647877.png";
import girl1_happy from "@/assets/images/visual-novel/00057-3317647877.png";
import girl1_sad from "@/assets/images/visual-novel/00059-3317647877.png";
import girl1_closed_eyes from "@/assets/images/visual-novel/00061-3317647877.png";
import girl1_suprised from "@/assets/images/visual-novel/00063-3317647877.png";

import girl2_neutral from "@/assets/images/visual-novel/00063-3415190727.png";
import girl2_happy from "@/assets/images/visual-novel/00065-3415190727.png";
import girl2_sad from "@/assets/images/visual-novel/00067-3415190727.png";
import girl2_suprised from "@/assets/images/visual-novel/00071-3415190727.png";
import girl2_closed_eyes from "@/assets/images/visual-novel/00073-3415190727.png";

import girl3_neutral from "@/assets/images/visual-novel/00073-645522131.png";
import girl3_happy from "@/assets/images/visual-novel/00075-645522131.png";
import girl3_sad from "@/assets/images/visual-novel/00077-645522131.png";
import girl3_suprised from "@/assets/images/visual-novel/00079-645522131.png";
import girl3_closed_eyes from "@/assets/images/visual-novel/00081-645522131.png";

import player_neutral from "@/assets/images/visual-novel/00144-1619487309.png";
import player_happy from "@/assets/images/visual-novel/00089-1619487309.png";
import player_sad from "@/assets/images/visual-novel/00091-1619487309.png";
import player_suprised from "@/assets/images/visual-novel/00093-1619487309.png";
import player_closed_eyes from "@/assets/images/visual-novel/00095-1619487309.png";

import room from "@/assets/images/visual-novel/00115-1693129910.png";
import lobby from "@/assets/images/visual-novel/00116-767133290.png";
import garden from "@/assets/images/visual-novel/00117-1865753899.png";
import restaurant from "@/assets/images/visual-novel/00146-2156326714.png";

import Image, { StaticImageData } from "next/image";
import { upperFirst } from "lodash-es";
import ExecutePromptButton from "@/components/ClickPrompt/ExecutePromptButton";
import { ResponseSend } from "@/pages/api/chatgpt/chat";
import SimpleMarkdown from "@/components/markdown/SimpleMarkdown";
import CopyComponent from "@/components/CopyComponent";
import { fontSize } from "@mui/system";

type StoryLine = {
  speaker: string;
  dialogue: string;
  mood: string;
  location: string;
};

type Scene = {
  speaker: string;
  girls: string[];
  story: StoryLine[];
};

function ChatGptVisualNovel({ i18n }: GeneralI18nProps) {
  const dict = i18n.dict;
  const genres = ["romance", "fantasy", "horror", "sci-fi", "crime"];
  const [genre, setGenre] = useState(dict[genres[0]]);
  const [scene, setScene] = useState({} as Scene);
  const [conversationId, setConversationId] = useState(undefined as number | undefined);
  const girls: { [key: string]: StaticImageData }[] = [
    {
      neutral: girl1_neutral,
      happy: girl1_happy,
      sad: girl1_sad,
      closed_eyes: girl1_closed_eyes,
      surprised: girl1_suprised,
    },
    {
      neutral: girl2_neutral,
      happy: girl2_happy,
      sad: girl2_sad,
      closed_eyes: girl2_closed_eyes,
      surprised: girl2_suprised,
    },
    {
      neutral: girl3_neutral,
      happy: girl3_happy,
      sad: girl3_sad,
      closed_eyes: girl3_closed_eyes,
      surprised: girl3_suprised,
    },
  ];
  const player: { [key: string]: StaticImageData } = {
    neutral: player_neutral,
    happy: player_happy,
    sad: player_sad,
    closed_eyes: player_closed_eyes,
    surprised: player_suprised,
  };
  const locations: { [key: string]: StaticImageData } = {
    lobby: lobby,
    room: room,
    garden: garden,
    restaurant: restaurant,
  };
  const prompt = `${dict["prompt_start"]}${genre}${dict["prompt_after_story_genre"]} ${girls.length} ${
    dict["prompt_after_number_of_girls"]
  }\n{speaker: "", girls: [""], story: [{"speaker": "", "dialogue": "", "mood": "", "location": ""}]}\n${
    dict["prompt_follow_rules"]
  } ${Object.keys(girls[0]).join(", ")}\n${dict["prompt_locations"]} ${Object.keys(locations).join(", ")}\n${
    dict["prompt_end"]
  }`;
  // Using only English for the continuing prompt as ChatGPT does not follow correctly with Chinese prompt
  const promptContinue = "Please continue on the previous story and remove the previous dialogues from the JSON.";
  const [step, setStep] = useState(0);
  const [characterMap, setCharacterMap] = useState({} as { [key: string]: number });

  const handleGenreChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setGenre(genres.indexOf(e.target.value) ? dict[e.target.value] : dict[genres[0]]);
  };

  const handleStoryNextStep: MouseEventHandler = (e) => {
    if (step < scene.story.length - 1) {
      setStep(step + 1);
    }
  };

  const handleResponse = (response: ResponseSend) => {
    try {
      const newScene = JSON.parse(response[0].content.trim()) as Scene;
      if ("speaker" in newScene && "girls" in newScene && "story" in newScene) {
        const newCharacterMap = characterMap;
        for (const girlIndex in newScene.girls) {
          const girl = newScene.girls[girlIndex].toLowerCase();
          const girlCount = Object.keys(newCharacterMap).length;
          if (!(girl in newCharacterMap) && Object.keys(newCharacterMap).length < girls.length) {
            newCharacterMap[girl] = girlCount;
          }
        }
        setStep(0);
        setCharacterMap(newCharacterMap);
        setScene(newScene);
      } else {
        console.log(newScene);
      }
    } catch (e) {
      console.log(response);
      console.error(e);
    }
  };

  const updateConversationId = (id: number) => {
    setConversationId(id);
  };

  const character = useMemo(() => {
    if (!(scene && scene.speaker)) return;
    const speaker = scene.story[step].speaker.toLowerCase();
    if (speaker == scene.speaker.toLowerCase() || speaker == "narrator")
      return player[scene.story[step].mood.toLowerCase()];
    if (speaker in characterMap) return girls[characterMap[speaker]][scene.story[step].mood.toLowerCase()];
  }, [step, scene, characterMap]);

  return (
    <>
      {!(scene && scene.speaker) && (
        <Card>
          <CardHeader>
            <Text>{dict["select_genre"]}</Text>
            <Select onChange={handleGenreChange}>
              {genres.map((storyGenre) => (
                <option key={storyGenre} value={storyGenre}>
                  {dict[storyGenre]}
                </option>
              ))}
            </Select>
          </CardHeader>
          <CardBody maxH='320px' overflow='auto'>
            <Stack>
              <SimpleMarkdown content={prompt} />
            </Stack>
          </CardBody>
          <CardFooter>
            <Flex w='90%' flexGrow={"column"} justifyContent='space-between'>
              <Box>
                <CopyComponent value={prompt} />
              </Box>
              <Box>
                <ExecutePromptButton
                  text={prompt}
                  name='promptBtn'
                  handleResponse={handleResponse}
                  conversationId={conversationId}
                  updateConversationId={updateConversationId}
                />
              </Box>
            </Flex>
          </CardFooter>
        </Card>
      )}
      {scene && scene.speaker && (
        <Box
          style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", cursor: "pointer" }}
          onClick={handleStoryNextStep}
        >
          <Image
            src={scene.story[step].location in locations ? locations[scene.story[step].location] : locations["garden"]}
            alt={scene.story[step].location}
            style={{
              position: "absolute",
              left: "0",
              bottom: "0",
              minHeight: "100%",
              minWidth: "100%",
              objectFit: "cover",
            }}
          />
          <Box
            style={{
              borderRadius: "10px 10px 0 0",
              background: "teal",
              color: "white",
              fontSize: "1.2rem",
              padding: "1rem 1rem 2rem 1rem",
              width: "100%",
              position: "absolute",
              left: "0",
              bottom: "0",
            }}
          >
            <Image
              src={character ?? ""}
              alt={scene.story[step].speaker}
              style={{ position: "absolute", left: "35%", bottom: "100%", width: "30%", minWidth: "256px" }}
            />
            <Box
              style={{
                borderRadius: "10px 10px 0 0",
                background: "teal",
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "bold",
                textAlign: "center",
                padding: "0.4rem 0.6rem 0 0.6rem",
                height: "2rem",
                position: "absolute",
                left: "1rem",
                top: "-2rem",
              }}
            >
              {upperFirst(scene.story[step].speaker)}
            </Box>
            {scene.story[step].dialogue}
            {step < scene.story.length - 1 ? (
              <ArrowDownIcon
                style={{
                  color: "white",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "1.2rem",
                  bottom: "1.2rem",
                }}
              />
            ) : (
              <Box style={{ position: "absolute", right: "1.6rem", bottom: "0.6rem" }}>
                <ExecutePromptButton
                  text={promptContinue}
                  name='promptContinueBtn'
                  handleResponse={handleResponse}
                  conversationId={conversationId}
                  updateConversationId={updateConversationId}
                />
              </Box>
            )}
            <Text
              style={{ position: "absolute", left: "1rem", bottom: "0.5rem", fontSize: "0.5rem", color: "lightgray" }}
            >
              {dict["sd_note_prefix"]}
              <Link href='https://github.com/CompVis/stable-diffusion' isExternal>
                Stable Diffusion
              </Link>
              {dict["sd_note_model"]}
              <Link href='https://huggingface.co/WarriorMama777/OrangeMixs/tree/main/Models/AbyssOrangeMix3' isExternal>
                AbyssOrangeMix3
              </Link>
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ChatGptVisualNovel;
