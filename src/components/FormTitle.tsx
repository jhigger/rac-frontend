type FormTitleProps = { text: string };

const FormTitle = ({ text }: FormTitleProps) => {
  return <h1 className="title-lg uppercase text-gray-500">{text}</h1>;
};

export default FormTitle;
