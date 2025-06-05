import FormSectionClient from "./FormSectionClient";

const AuthClientScreen = ({ children }) => {
  return (
    <div className="h-screen">
      {/* Left Side */}
      <FormSectionClient>{children}</FormSectionClient>
    </div>
  );
};

export default AuthClientScreen;
