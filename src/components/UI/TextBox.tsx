import React from "react";

const TextBox = ({
  label,
  value,
  password,
  onChange,
}: {
  label: string;
  value: any;
  password?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <div className="mb-2 font-bold">{label}</div>
      <input
        type={password ? "password" : "text"}
        placeholder={label}
        className="w-full p-3 border-2 border-gray-300 rounded-lg"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default React.memo(TextBox);
