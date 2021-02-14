// const columns = [
//     {
//         dataIndex: 'profil_image',
//     },
//     {
//         title: 'ID',
//         dataIndex: 'user_id',
//         sorter: (a, b) => a.user_id - b.user_id,
//         sortDirections: ['descend', 'ascend'],
//     },
//     {
//         title: 'Nama',
//         dataIndex: 'fullname',
//         filters: [
//             {
//                 text: 'A',
//                 value: 'A'
//             },
//             {
//                 text: 'B',
//                 value: 'B'
//             },
//             {
//                 text: 'C',
//                 value: 'C'
//             },
//             {
//                 text: 'D',
//                 value: 'D'
//             },
//             {
//                 text: 'E',
//                 value: 'E'
//             },
//             {
//                 text: 'F',
//                 value: 'F'
//             },
//             {
//                 text: 'G',
//                 value: 'G'
//             },
//             {
//                 text: 'H',
//                 value: 'H'
//             },
//             {
//                 text: 'I',
//                 value: 'I'
//             },
//             {
//                 text: 'J',
//                 value: 'J'
//             },
//             {
//                 text: 'K',
//                 value: 'K'
//             },
//             {
//                 text: 'L',
//                 value: 'L'
//             },
//             {
//                 text: 'M',
//                 value: 'M'
//             },
//             {
//                 text: 'N',
//                 value: 'N'
//             },
//             {
//                 text: 'O',
//                 value: 'O'
//             },
//             {
//                 text: 'P',
//                 value: 'P'
//             },
//             {
//                 text: 'Q',
//                 value: 'Q'
//             },
//             {
//                 text: 'R',
//                 value: 'R'
//             },
//             {
//                 text: 'S',
//                 value: 'S'
//             },
//             {
//                 text: 'T',
//                 value: 'T'
//             },
//             {
//                 text: 'U',
//                 value: 'U'
//             },
//             {
//                 text: 'V',
//                 value: 'V'
//             },
//             {
//                 text: 'W',
//                 value: 'W'
//             },
//             {
//                 text: 'X',
//                 value: 'X'
//             },
//             {
//                 text: 'Y',
//                 value: 'Y'
//             },
//             {
//                 text: 'Z',
//                 value: 'Z'
//             },
//         ],
//         onFilter: (value, record) => record.fullname.indexOf(value) === 0,
//         sorter: (a, b) => a.fullname.length - b.fullname.length,
//         sortDirections: ['descend', 'ascend'],
//     },
//     {
//         title: 'Email',
//         dataIndex: 'email',
//     },
//     {
//         title: 'No Handphone',
//         dataIndex: 'phone_number',
//     },
//     {
//         dataIndex: 'actionss',
//         render: (text, record, index) => (
//             <>
//                 {
//                     actions[index] ? <>{actions[index]} <a><CopyOutlined /></a> <a><EditOutlined /></a></>
//                         :
//                         null
//                 }
//             </>
//         )
//     }
// ];

// const data = dataListAccount.data.accounts.map((doc, idx) => {
//     return ({
//         user_id: doc.user_id,
//         profile_image: doc.profile_image,
//         fullname: doc.fullname,
//         email: doc.email,
//         phone_number: doc.phone_number
//     })
// })

