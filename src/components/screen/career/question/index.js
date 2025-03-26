import parse from "html-react-parser";
import React from "react";

const CareerQuestion = ({ detailCareer, renderType }) => {
  const currencyI18n = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div className={"mt-6 grid md:grid-cols-2 gap-6"}>
      {detailCareer &&
        detailCareer.question != null &&
        detailCareer.question.details.map((data, key) => (
          <div
            className={
              "w-full  px-4 py-3 rounded-[5px] border border-solid border-inputkategori bg-white"
            }
          >
            <p className={"text-mono30 text-[14px] font-bold leading-6 "}>
              {key + 1}. {data.name}
            </p>
            <p className={"text-mono50 text-sm font-medium leading-5 "}>
              {renderType(data.type)}
            </p>
          </div>
        ))}
    </div>
  );
};

export default CareerQuestion;
