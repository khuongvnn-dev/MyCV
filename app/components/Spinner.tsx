import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string; // Ví dụ: "text-indigo-600" hoặc "text-sky-500"
  className?: string; // Cho phép thêm class tùy biến khác
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "text-sky-600",
  className = "",
}) => {
  // Định nghĩa kích thước dựa trên prop
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-6",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`
          ${sizeClasses[size]} 
          ${color} 
          animate-spin 
          rounded-full 
          border-t-transparent 
          border-current
        `}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;