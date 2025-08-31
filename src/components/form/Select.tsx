import React from "react";

interface SelectProps<T extends Record<string, any>> {
  options: T[];
  valueKey: keyof T;       // konsa key use hoga option value ke liye
  labelKey: keyof T;       // konsa key use hoga option label ke liye
  placeholder?: string;
  value: string | number | null;
  onChange: (value: string) => void;
  className?: string;
}

const Select = <T extends Record<string, any>>({
  options,
  valueKey,
  labelKey,
  placeholder = "Select an option",
  value,
  onChange,
  className = "",
}: SelectProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-orange-600/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
        value ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"
      } ${className}`}
      value={value ?? ""}
      onChange={handleChange}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option, idx) => (
        <option
          key={idx}
          value={String(option[valueKey])}
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {String(option[labelKey])}
        </option>
      ))}
    </select>
  );
};

export default Select;
