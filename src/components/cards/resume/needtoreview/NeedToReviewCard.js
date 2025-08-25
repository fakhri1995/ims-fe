import { RocketIconSvg, StarFillIconSvg } from "../../../icon";

// Currently use for Training, Certifications, and Achievements section in resume
const NeedToReviewCard = ({ onChooseData, doc, dataChoose }) => {
  return (
    <div
      onClick={() => onChooseData(doc)}
      className={`w-1/5 px-3 py-2.5 rounded-[5px] ${
        doc.id == dataChoose?.id ? "bg-primary100" : "bg-white"
      } border-1.5 ${
        doc.id == dataChoose?.id ? "border-primary100" : "border-[#E6E6E6]"
      } hover:cursor-pointer`}
    >
      <div className={"flex flex-col gap-2"}>
        <p
          className={`${
            doc.id == dataChoose?.id ? "text-white" : "text-mono30"
          } text-sm leading-6 font-bold`}
        >
          {doc.name}
        </p>
        {console.log("doc?.resume ", doc?.resume)}
        <div className={"flex flex-col gap-1"}>
          <div className={"flex gap-1 items-start"}>
            <StarFillIconSvg color={"#E9C600"} />
            <p className={"text-[#E9C600] text-[10px] font-medium"}>
              {doc?.resume?.educations
                ? doc?.resume?.educations[doc?.resume?.educations.length - 1]
                    ?.university
                : "-"}
            </p>
          </div>
          <div className={"flex gap-1 items-start"}>
            <RocketIconSvg
              color={doc.id == dataChoose?.id ? "white" : "#4D4D4D"}
            />
            {doc?.resume?.skills ? (
              <p
                className={`${
                  doc.id == dataChoose?.id ? "text-white" : "text-mono30"
                } text-[10px] font-medium`}
              >
                {doc?.resume?.skills.map((skill, index) => (
                  <span key={index}>
                    {skill.name}
                    {index < doc?.resume?.skills.length - 1 && ", "}
                  </span>
                ))}
              </p>
            ) : (
              <p
                className={`${
                  doc.id == dataChoose?.id ? "text-white" : "text-mono30"
                } text-[10px] font-medium`}
              >
                -
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedToReviewCard;
