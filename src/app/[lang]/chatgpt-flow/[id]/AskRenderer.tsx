import { fillStepWithValued, FlowStep } from "@/app/[lang]/chatgpt-flow/[id]/flow-step";
import React, { useEffect, useRef } from "react";
import { Textarea } from "@chakra-ui/react";
import SimpleMarkdown from "@/components/markdown/SimpleMarkdown";
import autosize from "autosize";
import styled from "@emotion/styled";
import FlowMarkdownEditor from "@/components/markdown/FlowMarkdownEditor";

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
      <StyledTextarea
        className='bg-white'
        value={value}
        ref={ref}
        onChange={(event) => {
          setValue(event.target.value);
          onAskUpdate(event.target.value);
        }}
      />
    );
  }

  return <SimpleMarkdown content={step.ask} />;
}

const StyledTextarea = styled(Textarea)`
  background: #fff;
`;
