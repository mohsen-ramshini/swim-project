import React from "react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor styles
import SunEditor from "suneditor-react";

interface SunEditorComponentProps {
  onChange: (content: string) => void;
  content: string;
}

const SunEditorComponent: React.FC<SunEditorComponentProps> = ({
  onChange,
  content,
}) => {
  return (
    <SunEditor
      defaultValue={content}
      onChange={onChange}
      setOptions={{
        height: "200",
        buttonList: [
          // Customize toolbar buttons
          ["undo", "redo"],
          ["bold", "italic", "underline", "strike"],
          ["align", "list", "fontColor", "fontSize"],
          ["image", "video", "link"],
        ],
      }}
    />
  );
};

export default SunEditorComponent;
