import React from "react";

import FormSection from "./FormSection";
import WelcomeSection from "./WelcomeSection";

const AuthScreen = ({ children }) => {
  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <FormSection>{children}</FormSection>

      {/* Right Side */}
      <WelcomeSection />
    </div>
  );
};

export default AuthScreen;
