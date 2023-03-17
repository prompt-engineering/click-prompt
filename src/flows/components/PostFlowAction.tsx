import React from "react";
import { ActionPostComponent, FlowAction } from "@/flows/types/flow-action";
import { Button } from "@chakra-ui/react";
import { postActionDispatcher } from "@/flows/post-action-dispatcher";
import SharedFlowAction from "@/flows/components/SharedFlowAction";
import { JsonViewer } from "@/flows/flow-components/JsonViewer";

type ActionProps = { action: FlowAction; response: string };

function PostFlowAction({ action, response }: ActionProps) {
  const [isShowPostComponent, setIsShowPostComponent] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);

  const handleSubmit = (modifiedAction: FlowAction) => {
    postActionDispatcher(modifiedAction, response).then((r) => {
      if (r.success) {
        setResult(r.result);
        if (action.postComponents?.length) {
          setIsShowPostComponent(true);
        }
      }
    });
  };

  function showPostCompos(components: ActionPostComponent[], result: any) {
    return (
      <div>
        {components.map((component, index) => {
          switch (component.name) {
            case "JsonViewer":
              return <JsonViewer json={result} />;
            default:
              return <div>Not found</div>;
          }
        })}
      </div>
    );
  }

  return (
    <>
      <SharedFlowAction action={action} onSubmit={handleSubmit} />
      {isShowPostComponent &&
        action.postComponents?.length &&
        action.postComponents?.length > 0 &&
        showPostCompos(action.postComponents, result)}
    </>
  );
}

export default PostFlowAction;
