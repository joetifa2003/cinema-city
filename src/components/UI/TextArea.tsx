import React from "react";

const TextArea = ({
  label,
  onChange,
}: {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div>
      <div className="mb-2 font-bold">{label}</div>
      <textarea
        placeholder={label}
        className="w-full p-3 border-2 border-gray-300 rounded-lg"
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
