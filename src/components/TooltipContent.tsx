type TooltipContentProps = {
  provided: string | number;
  verified: string | number;
};

const TooltipContent = ({ provided, verified }: TooltipContentProps) => {
  return (
    <div className="flex flex-col">
      <span>You provided: {provided}</span>
      <span>We verified: {verified}</span>
    </div>
  );
};

export default TooltipContent;
