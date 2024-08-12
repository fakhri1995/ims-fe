import { useRouter } from "next/router";
import React from "react";

import { ArrowLeftIconSvg, CopyIconSvg } from "components/icon";

const ButtonBack = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-transparent items-center flex"
    >
      <ArrowLeftIconSvg size={20} />
    </button>
  );
};

export default ButtonBack;
