interface Props {
  title: string;
  subtitle?: string;
}

const DialogContent: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <section
      className="
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        text-white text-center
        bg-black/40 backdrop-blur-sm
        p-6 rounded-xl
        w-[90%] max-w-xl
      "
    >
      <h2 className="font-extrabold text-3xl lg:text-4xl mb-3">
        {title}
      </h2>

      <p className="text-sm lg:text-base opacity-90">
        {subtitle}
      </p>
    </section>
  );
};

export default DialogContent;
