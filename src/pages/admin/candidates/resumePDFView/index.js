/**
 * This file is used for preview PDF in development,
 * so developer doesn't need to repeatedly download
 * the PDF when adjusting the style/layout
 * */
import { PDFViewer } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ResumePDFTemplate = dynamic(
  () => import("../../../../components/screen/resume/ResumePDFTemplate"),
  {
    ssr: false,
  }
);
const resumePdfView = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = {
    id: 1,
    name: "Yasmin",
    telp: "0812671111",
    email: "yasmiandelia@mitrasolusi.group",
    city: "Bogor",
    province: "Jawa Barat",
    assessment_id: 1,
    created_at: "2023-06-09 10:52:00",
    updated_at: "2023-11-30 22:08:24",
    created_by: 26,
    deleted_at: null,
    owner_id: 26,
    educations: [
      {
        id: 3,
        university: "Universitas India",
        major: "S1 Fakultas Ilmu Komunikasi Komputer",
        gpa: "4.00",
        start_date: null,
        end_date: "2020-06-30",
        graduation_year: "2020-06-13",
        resume_id: 1,
        display_order: 1,
        start_date_format: null,
        end_date_format: "2020-06",
      },
      {
        id: 11,
        university: "test3 ",
        major: "ggg",
        gpa: "3.44",
        start_date: "2016-09-01",
        end_date: "2020-09-30",
        graduation_year: "2020-09-24",
        resume_id: 1,
        display_order: 2,
        start_date_format: "2016-09",
        end_date_format: "2020-09",
      },
      {
        id: 18,
        university: "Harvard",
        major: "S2",
        gpa: "3.33",
        start_date: "2023-01-01",
        end_date: "2025-06-30",
        graduation_year: null,
        resume_id: 1,
        display_order: 3,
        start_date_format: "2023-01",
        end_date_format: "2025-06",
      },
    ],
    experiences: [
      {
        id: 3,
        role: "test update",
        company: "company3",
        start_date: "2023-05-02",
        end_date: null,
        description: "<p>testt</p>",
        resume_id: 1,
        display_order: 1,
      },
      {
        id: 4,
        role: "testt baru update",
        company: "ccc",
        start_date: "2023-06-01",
        end_date: null,
        description:
          '<ul><li>dess</li><li>tess</li><li class="ql-indent-1">tess</li></ul>',
        resume_id: 1,
        display_order: 2,
      },
    ],
    projects: [
      {
        id: 2,
        name: "project 2 upp",
        year: "2021-09-21",
        description: "test lagi",
        resume_id: 1,
        display_order: 1,
      },
      {
        id: 1,
        name: "project 1",
        year: "2020-09-21",
        description: "testt",
        resume_id: 1,
        display_order: 2,
      },
      {
        id: 12,
        name: "proyek pembangunan negeri",
        year: "2020-12-11",
        description:
          '<ul><li>satu</li><li>dua</li></ul><p><u>underline </u><em>italic </em><strong>bold </strong><a href="http://localhost:3000/admin/candidates/1" rel="noopener noreferrer" target="_blank">link</a></p>',
        resume_id: 1,
        display_order: 4,
      },
    ],
    skills: [
      {
        id: 1,
        name: "PHP",
        resume_id: 1,
      },
      {
        id: 2,
        name: "Python",
        resume_id: 1,
      },
      {
        id: 3,
        name: "React",
        resume_id: 1,
      },
      {
        id: 4,
        name: "TailwindCSS",
        resume_id: 1,
      },
      {
        id: 5,
        name: "Javascript",
        resume_id: 1,
      },
    ],
    trainings: [
      {
        id: 3,
        name: "test6",
        organizer: "rrr",
        year: "2020-09-25",
        resume_id: 1,
        display_order: 1,
      },
      {
        id: 2,
        name: "trainq",
        organizer: "comp",
        year: "2020-09-25",
        resume_id: 1,
        display_order: 2,
      },
      {
        id: 7,
        name: "yyy",
        organizer: "yy",
        year: "2021-09-26",
        resume_id: 1,
        display_order: 3,
      },
    ],
    certificates: [
      {
        id: 2,
        name: "cert36",
        organizer: "comp",
        year: "2020-09-25",
        resume_id: 1,
        display_order: 1,
      },
      {
        id: 5,
        name: "rrrw",
        organizer: "hhh",
        year: "2020-09-26",
        resume_id: 1,
        display_order: 2,
      },
    ],
    achievements: [
      {
        id: 1,
        name: "adddtt",
        organizer: "fff",
        year: "2020-09-21",
        resume_id: 1,
        display_order: 1,
      },
      {
        id: 4,
        name: "weewww",
        organizer: "qqqq",
        year: "2020-09-26",
        resume_id: 1,
        display_order: 2,
      },
      {
        id: 5,
        name: "testt",
        organizer: "yyy",
        year: "2020-09-26",
        resume_id: 1,
        display_order: 3,
      },
    ],
    assessment: {
      id: 1,
      name: "Frontend Developer",
      created_at: "2023-06-09 10:51:08",
      updated_at: "2023-06-09 10:51:08",
    },
    assessment_results: [
      {
        id: 43,
        criteria: "HTML",
        value: "",
        resume_id: 1,
      },
      {
        id: 44,
        criteria: "CSS",
        value: "",
        resume_id: 1,
      },
    ],
    summaries: {
      id: 3,
      description:
        '<p>test <strong>bold </strong><em>italic </em><u>underline </u><a href="https://developers.google.com/fonts/docs/developer_api?apix_params=%7B%22sort%22%3A%22ALPHA%22%7D" rel="noopener noreferrer" target="_blank">link</a></p>',
      resume_id: 1,
    },
    profile_image: {
      id: 566,
      // id: 0,
      link: "staging/Resumes/Nemo_Promo_5_okwtzv_1701932893911.jpg",
      description: "profile_image",
    },
  };
  return (
    isClient && (
      <PDFViewer width={"100%"} height={1012}>
        <ResumePDFTemplate dataResume={data} logoStatus={true} />
      </PDFViewer>
    )
  );
};

export default resumePdfView;
