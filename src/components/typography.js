const H1 = ({ children, color }) => {
  return (
    <p
      className={`font-bold text-xl my-1 ${color === "white" && `text-white`} ${
        color === "primary" && "text-primary100 hover:text-primary75"
      }`}
    >
      {children}
    </p>
  );
};

const H2 = ({ children, color }) => {
  return (
    <p
      className={`font-semibold text-base mb-1 ${
        color === "white" && `text-white`
      } ${color === "primary" && "text-primary100 hover:text-primary75"}`}
    >
      {children}
    </p>
  );
};

const Label = ({ children, color, cursor, id }) => {
  return (
    <p
      id={id}
      className={`${typeof color === "undefined" && "text-gray-400"} ${
        color === "green" && "text-primary100 hover:text-primary75"
      } ${color === "white" && "text-white hover:text-white"} ${
        color === "primary" && "text-primary100 hover:text-primary75"
      } text-xs mb-0 ${cursor === "pointer" && "cursor-pointer"}`}
    >
      {children}
    </p>
  );
};

const LabelDark = ({ children, color, cursor, id }) => {
  return (
    <p
      id={id}
      className={`${typeof color === "undefined" && "text-gray-600"} ${
        color === "green" && "text-primary100 hover:text-primary75"
      } text-xs mb-0 ${cursor === "pointer" && "cursor-pointer"}`}
    >
      {children}
    </p>
  );
};

const Text = ({ children, color, cursor, id }) => {
  return (
    <p
      id={id}
      className={`${typeof color === "undefined" && "text-black"} ${
        color === "green" && "text-primary100 hover:text-primary75"
      } ${color === "white" && "text-white hover:text-white"} ${
        color === "primary" && "text-primary100 hover:text-primary75"
      } text-xs mb-0 ${cursor === "pointer" && "cursor-pointer"}`}
    >
      {children}
    </p>
  );
};

export { H1, H2, Label, LabelDark, Text };
