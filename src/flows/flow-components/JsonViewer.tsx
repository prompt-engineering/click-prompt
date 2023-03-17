import ReactJson from "react-json-view";

export function JsonViewer({ json }: { json: object }) {
  return (
    <ReactJson
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
