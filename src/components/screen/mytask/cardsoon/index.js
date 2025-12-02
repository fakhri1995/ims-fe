import { Empty, Progress, Spin } from "antd";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  isValidDate,
  permissionWarningNotification,
} from "../../../../lib/helper";
import {
  ClipboardcheckIconSvg,
  ClockIconSvg,
  EditIconSvg,
  ListcheckIconSvg,
} from "../../../icon";
import { H1, H2, Label, Text } from "../../../typography";
import clsx from "clsx";

const CardSoon = ({ loadinguserlasttwo, userlasttwo }) => {
  const rt = useRouter();
  return (
    <div className="col-span-12 lg:col-span-6 flex flex-col shadow-md rounded-md bg-gray-50 p-5">
      {loadinguserlasttwo ? (
        <>
          <Spin />
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <H1>Segera Berakhir</H1>
            {userlasttwo.length > 0 && (
              <div className="p-2 rounded bg-red-50 text-state1 text-xs flex">
                {userlasttwo[0]?.deadline ? (
                  <>
                    <div className="mr-1 flex items-center">
                      <ClockIconSvg size={15} color={`#BF4A40`} />
                    </div>
                    {userlasttwo[0]?.deadline
                      ? moment(userlasttwo[0].deadline)
                          .locale("id")
                          .format("lll")
                      : "-"}
                  </>
                ) : null}
                {/* {moment(userlasttwo[0].deadline)
                          .locale("id")
                          .format("lll")} */}
              </div>
            )}
          </div>
          <div className="h-full">
            {userlasttwo.length === 0 ? (
              <div className=" flex w-full h-full items-center justify-center">
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            ) : (
              <>
                {userlasttwo.map(
                  (
                    {
                      id,
                      deadline,
                      time_limit_percentage,
                      name,
                      time_left,
                      status,
                    },
                    index
                  ) => {
                    const isOverdue = status === 1;

                    const cardContainerClassName = clsx(
                      {
                        "bg-white hover:bg-mono90": !isOverdue,
                        "bg-state1 hover:bg-state12 text-white mb-2": isOverdue,
                      },
                      "rounded transition duration-300 shadow p-5 flex justify-between cursor-pointer block mb-2"
                    );

                    // Saat ini: 100 <= time_limit_percentage <= 0
                    // Menjadi: 0 <= progressPrecentage <= 100
                    const progressPrecentage = Math.max(
                      0,
                      Math.min(Math.round(time_limit_percentage), 100)
                    );

                    let berakhirSentence = "Berakhir %s";
                    if (isValidDate(deadline)) {
                      // Delta hari ini dengan deadline (day) (24 hour inclusive)
                      const isEndedToday =
                        moment(new Date(deadline)).diff(moment(), "d") === 0;
                      const dueDate = moment(deadline)
                        .locale("id")
                        .format("Do MMM");

                      const replaceWith = isEndedToday ? "Hari Ini" : dueDate;

                      berakhirSentence = berakhirSentence.replace(
                        /%s/g,
                        replaceWith
                      );
                    } else {
                      berakhirSentence = "-";
                    }

                    let timeLeftSentence = `${
                      isOverdue ? "Terlambat" : "Sisa"
                    } ${time_left}`;

                    return (
                      <Link
                        key={index}
                        href={`/tasks/detail/${id}?prevpath=mytask`}
                        className={cardContainerClassName}
                      >
                        <div className="flex flex-col">
                          <div>
                            <ClipboardcheckIconSvg
                              size={50}
                              color={isOverdue ? "#ffffff" : "#35763B"}
                            />
                          </div>
                          <div className="flex flex-col mt-2">
                            <Text color={isOverdue ? "white" : undefined}>
                              {berakhirSentence}
                            </Text>
                            <Progress
                              trailColor={isOverdue ? "#4D4D4D" : "#d8e8da"}
                              strokeColor={isOverdue ? "#ffffff" : "#35763B"}
                              percent={progressPrecentage}
                              showInfo={false}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex flex-col text-right text-black">
                            {isOverdue ? (
                              <p
                                className={`font-bold text-xl mb-0 text-white`}
                              >
                                {name}
                              </p>
                            ) : (
                              <H1>{name}</H1>
                            )}
                            <Label color={isOverdue ? "white" : undefined}>
                              T-000{id}
                            </Label>
                          </div>
                          <div className="flex flex-col mt-4 text-right">
                            <H2 color={isOverdue ? "white" : "primary"}>
                              {timeLeftSentence}
                            </H2>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardSoon;
