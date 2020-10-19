import React from "react";

const TextBox = ({
  label,
  onChange,
}: {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <div className="mb-2 font-bold">{label}</div>
      <input
        type="text"
        placeholder={label}
        className="w-full p-3 bg-gray-300 rounded-lg"
        onChange={onChange}
      />
    </div>
  );
};

export default TextBox;
