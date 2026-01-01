import { Spinner as FlowbiteSpinner } from "flowbite-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-left items-left py-10">
      <FlowbiteSpinner
        aria-label="Loading"
        className="h-10 w-10 text-white fill-cyan-600"
      />
    </div>
  );
};

export default LoadingSpinner;
