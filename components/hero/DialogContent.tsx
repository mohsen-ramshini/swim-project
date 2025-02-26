import React from "react";

interface Props {
  dialog: string;
}

const DialogContent: React.FC<Props> = ({ dialog }) => {
  return (
    <section
      className="relative hidden lg:flex text-white    rounded-md p-4 w-full max-w-md mx-auto lg:max-w-lg lg:w-1/3 
      bottom-20 left-5 sm:left-10 md:left-16 lg:left-96 lg:bottom-48 shadow-lg bg-sky-900"
    >
      {dialog}
    </section>
  );
};

export default DialogContent;
