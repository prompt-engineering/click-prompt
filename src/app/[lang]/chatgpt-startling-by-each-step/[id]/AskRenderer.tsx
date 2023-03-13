import { fillStepWithValued, StepDetail } from "@/app/[lang]/chatgpt-startling-by-each-step/[id]/StepDetail";
import React, { useEffect, useRef } from "react";
import { Textarea } from "@chakra-ui/react";
import SimpleMarkdown from "@/components/SimpleMarkdown";
import autosize from "autosize";
import styled from "@emotion/styled";

type AskRendererProps = { step: StepDetail; onAskUpdate: (ask: string) => void; cachedValue: Record<number, any> };

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
        // @ts-ignore
        autosize.destroy(ref.current);
      };
    }
  }, []);

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
