import dynamic from "next/dynamic";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

export function JsonViewer({ json }: { json: object }) {
  return (
    <DynamicReactJson
      src={json}
      enableClipboard={false}
      displayDataTypes={false}
      displayObjectSize={false}
      name={false}
      onEdit={false}
      onAdd={false}
      onDelete={false}
    />
  );
}
