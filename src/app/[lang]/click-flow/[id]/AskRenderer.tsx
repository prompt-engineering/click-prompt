import React, { useEffect, useRef } from "react";
import { Box, Textarea } from "@chakra-ui/react";
import SimpleMarkdown from "@/components/markdown/SimpleMarkdown";
import autosize from "autosize";
import styled from "@emotion/styled";
import FlowMarkdownEditor from "@/flows/components/FlowMarkdownEditor";
import { fillStepWithValued, FlowStep } from "@/flows/types/flow-step";

type AskRendererProps = { step: FlowStep; onAskUpdate: (ask: string) => void; cachedValue: Record<number, any> };

export function AskRenderer({ step, onAskUpdate, cachedValue }: AskRendererProps) {
  const askTask = fillStepWithValued(step, cachedValue);
  const [value, setValue] = React.useState<string>(askTask.ask);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(askTask.ask);
    onAskUpdate(askTask.ask);
  }, [askTask.ask, setValue]);

  useEffect(() => {
    if (ref.current) {
      autosize(ref.current);
      return () => {
        if (ref.current) autosize.destroy(ref.current);
      };
    }
  }, []);

  if (step.markdownEditor) {
    return (
      <FlowMarkdownEditor
        text={value}
        onChange={(text) => {
          setValue(text);
          onAskUpdate(text);
        }}
      />
    );
  }

  if (askTask.replaced) {
    return (
      <Box w='100%' h='100%'>
        <StyledTextarea
          className='bg-white'
          value={value}
          ref={ref}
          onChange={(event) => {
            setValue(event.target.value);
            onAskUpdate(event.target.value);
          }}
        />
      </Box>
    );
  }

  return (
    <div>
      <SimpleMarkdown content={step.ask} />
    </div>
  );
}

const StyledTextarea = styled(Textarea)`
  background: #fff;
`;
