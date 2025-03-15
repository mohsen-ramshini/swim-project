import useParsedContent from "@/hooks/use-content-parser";
import React from "react";

interface Props {
  data: string;
}

const Content: React.FC<Props> = ({ data }) => {
  const content = useParsedContent(data, false);
  return <div>{content}</div>;
};

export default Content;
