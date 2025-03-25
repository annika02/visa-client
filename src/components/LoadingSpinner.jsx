const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative h-12 w-12">
        {/* Outer ring with gradient and pulse effect */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>

        {/* Animated spinner with gradient */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>

        {/* Optional center dot (remove if too much) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
