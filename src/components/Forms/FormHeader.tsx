type FormHeaderProps = { title: string; body?: JSX.Element };

const FormHeader = ({ title, body }: FormHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-[10px]">
      <h1 className="title-lg uppercase text-gray-500">{title}</h1>
      <p className="body-lg text-neutral-500">{body}</p>
    </div>
  );
};

export default FormHeader;
