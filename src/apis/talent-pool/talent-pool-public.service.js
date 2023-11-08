import QueryString from "qs";

export class TalentPoolPublicService {
  static getAuth = async (linkCode) => {
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/authTalentPoolSharePublic?code=${linkCode}`,
      {
        method: `GET`,
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        return res2;
      });

    return apiRes;
  };

  static getTalentPools = async (queryParams, keyword) => {
    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const apiRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/getTalentPoolSharePublics${payload}&keyword=${keyword || ""}`,
      {
        method: `GET`,
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        return res2;
      });

    return apiRes;
  };

  static getFilters = async (shareId) => {
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTalentPoolSharePublicFilters?share_id=${shareId}`,
      {
        method: `GET`,
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        return res2;
      });

    return apiRes;
  };

  static getResume = async (resumeId) => {
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTalentPoolSharePublic?id=${resumeId}`,
      {
        method: `GET`,
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        return res2;
      });

    return apiRes;
  };

  static getEliminates = async (shareId) => {
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTalentPoolSharePublicCuts?share_id=${shareId}`,
      {
        method: `GET`,
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        return res2;
      });

    return apiRes;
  };

  static eliminate = async (shareId, talentId) => {
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/addTalentPoolSharePublicCut?share_id=${shareId}&talent_id=${talentId}`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        return res2;
      });
    return apiRes;
  };

  static cancelEliminate = async (shareId, talentId) => {
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteTalentPoolSharePublicCut?share_id=${shareId}&talent_id=${talentId}`,
      {
        method: `DELETE`,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        return res2;
      });
    return apiRes;
  };

  static mark = async (talentId) => {
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/markTalentPoolSharePublic`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ talent_id: talentId }),
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        return res2;
      });
    return apiRes;
  };
}
