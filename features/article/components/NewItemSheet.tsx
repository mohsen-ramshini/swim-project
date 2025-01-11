import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect } from "react";

/**
 * Generic New Item Sheet Component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the sheet is open.
 * @param {() => void} props.onClose - Function to close the sheet.
 * @param {z.ZodObject<any>} props.formSchema - Zod schema for form validation.
 * @param {() => { mutate: (values: any, options: { onSuccess: () => void }) => void }} props.useMutation - Hook to handle form submission mutation.
 * @param {React.ComponentType<{ onSubmit: (values: any) => void; formSchema: z.ZodObject<any> }>} props.FormComponent - The form component to render.
 * @param {string} props.title - The title of the sheet.
 * @param {string} props.description - The description of the sheet.
 */
export const NewItemSheet: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  formSchema: z.ZodObject<any>;
  useMutation: () => {
    mutate: (values: any, options: { onSuccess: () => void }) => void;
  };
  FormComponent: React.ComponentType<{
    onSubmit: (values: any) => void;
    formSchema: z.ZodObject<any>;
  }>;
  title: string;
  description: string;
}> = ({
  isOpen,
  onClose,
  formSchema,
  useMutation,
  FormComponent,
  title,
  description,
}) => {
  useEffect(() => {
    console.log(`Sheet is open: ${isOpen}`);
  }, [isOpen]);

  const mutation = useMutation();

  const onSubmit = (values: any) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4" side={"left"} dir="rtl">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <FormComponent onSubmit={onSubmit} formSchema={formSchema} />
      </SheetContent>
    </Sheet>
  );
};
