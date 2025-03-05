// import { createElement, useMemo, useState } from "react";
// import parse, { domToReact } from "html-react-parser";

// // Function to extract plain text from parsed content
// const extractTextFromNode = (node: any): string => {
//   if (typeof node === "string") {
//     return node; // If it's plain text, return it
//   }

//   if (Array.isArray(node)) {
//     return node.map(extractTextFromNode).join(""); // Flatten array of nodes
//   }

//   if (node && node.props && node.props.children) {
//     return extractTextFromNode(node.props.children);
//   }

//   return "";
// };

// const useParsedContent = (
//   rawHtmlContent: string,
//   trim: boolean,
//   sliceLength: number = 200 // تعداد کاراکتر برای اسلایس (پیش‌فرض: 200)
// ) => {
//   const [content, setContent] = useState<React.ReactNode>(null);

//   const parseContent = (html: string, trim: boolean) => {
//     return parse(html, {
//       replace: (domNode: any) => {
//         if (domNode.type === "tag" && domNode.children) {
//           // Remove the style attribute from each tag
//           if (domNode.attribs && domNode.attribs.style) {
//             delete domNode.attribs.style; // حذف استایل
//           }

//           let content = domToReact(domNode.children);
//           // If trim is enabled, slice text content
//           if (trim && typeof content === "string") {
//             content =
//               content.slice(0, sliceLength) +
//               (content.length > sliceLength ? "..." : "");
//           }
//           return createElement(domNode.name, domNode.attribs, content);
//         }
//       },
//     });
//   };

//   // Parse full content (without trimming) if trim is false
//   const parsedContent = useMemo(
//     () => parseContent(rawHtmlContent, false),
//     [rawHtmlContent]
//   );

//   // Extract the plain text from parsed content to check the length
//   const textContent = useMemo(
//     () => extractTextFromNode(parsedContent),
//     [parsedContent]
//   );

//   // Trim the text to the specified slice length if necessary
//   const trimmedContent = useMemo(() => {
//     if (trim) {
//       const trimmedText =
//         textContent.slice(0, sliceLength) +
//         (textContent.length > sliceLength ? "..." : "");
//       return parseContent(trimmedText, true);
//     }
//     // If not trimming, return the full content
//     return parsedContent;
//   }, [textContent, sliceLength, trim]);

//   // Set content after parsing and trimming
//   useMemo(() => {
//     setContent(trimmedContent);
//   }, [trimmedContent]);

//   return content;
// };

// export default useParsedContent;
import { createElement, useEffect, useMemo, useState } from "react";
import parse, { domToReact } from "html-react-parser";

// Function to extract plain text from parsed content
const extractTextFromNode = (node: any): string => {
  if (typeof node === "string") {
    return node; // If it's plain text, return it
  }

  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join(""); // Flatten array of nodes
  }

  if (node && node.props && node.props.children) {
    return extractTextFromNode(node.props.children);
  }

  return "";
};

const useParsedContent = (
  rawHtmlContent: string,
  trim: boolean,
  sliceLength: number = 200, // تعداد کاراکتر برای اسلایس (پیش‌فرض: 200)
  keepStyle: boolean = false // آرگومان برای نگه‌داشتن استایل‌ها
) => {
  const [content, setContent] = useState<React.ReactNode>(null);

  const parseContent = (html: string, trim: boolean, keepStyle: boolean) => {
    return parse(html, {
      replace: (domNode: any) => {
        if (domNode.type === "tag" && domNode.children) {
          // If keepStyle is false, remove the style attribute
          if (!keepStyle && domNode.attribs && domNode.attribs.style) {
            delete domNode.attribs.style; // حذف استایل
          }

          let content = domToReact(domNode.children);
          // If trim is enabled, slice text content
          if (trim && typeof content === "string") {
            content =
              content.slice(0, sliceLength) +
              (content.length > sliceLength ? "..." : "");
          }
          return createElement(domNode.name, domNode.attribs, content);
        }
      },
    });
  };

  // Parse full content (without trimming) if trim is false
  const parsedContent = useMemo(
    () => parseContent(rawHtmlContent, false, keepStyle),
    [rawHtmlContent, keepStyle]
  );

  // Extract the plain text from parsed content to check the length
  const textContent = useMemo(
    () => extractTextFromNode(parsedContent),
    [parsedContent]
  );

  // Trim the text to the specified slice length if necessary
  const trimmedContent = useMemo(() => {
    if (trim) {
      const trimmedText =
        textContent.slice(0, sliceLength) +
        (textContent.length > sliceLength ? "..." : "");
      return parseContent(trimmedText, true, keepStyle);
    }
    // If not trimming, return the full content
    return parsedContent;
  }, [textContent, sliceLength, trim, keepStyle]);

  // Set content after parsing and trimming
  useEffect(() => {
    setContent(trimmedContent);
  }, [trimmedContent]);

  return content;
};

export default useParsedContent;
