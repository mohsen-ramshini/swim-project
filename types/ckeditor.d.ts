declare module "@ckeditor/ckeditor5-react" {
  import { ComponentType } from "react";
  const CKEditor: ComponentType<any>;
  export { CKEditor };
}

declare module "@ckeditor/ckeditor5-build-classic" {
  const ClassicEditor: any;
  export default ClassicEditor;
}

declare module "react-persian-datepicker";
