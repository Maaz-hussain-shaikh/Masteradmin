import React from "react";
import { PulseLoader ,ScaleLoader } from "react-spinners"; 

type LoaderProps = {
  loading: boolean;
  error?: string | null;
};

const Loader: React.FC<LoaderProps> = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
  {/* Loader spinner */}
   <PulseLoader
        color="#ec4a0a"
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  <p className="mt-2 text-orange-600 text-sm font-medium">Loading...</p>
</div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        {/* Error Icon */}
        <ScaleLoader
        color="#ec4a0a"
        loading={loading}
        width={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        <p className="mt-2 text-red-600 text-sm font-medium">{error}</p>
      </div>
    );
  }

  return null; // Agar na loading na error ho toh kuch mat dikhao
};

export default Loader;
