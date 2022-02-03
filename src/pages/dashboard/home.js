import jscookie from "js-cookie";

import Layout from "../../components/layout-dashboard";
import st from "../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

function DashboardIndex({ initProps, dataProfile, sidemenu }) {
  const tok = initProps;
  // const cook = jscookie.get('token')
  // console.log("cookie di dashboard: " + cook)
  return (
    <Layout tok={tok} sidemenu={sidemenu} dataProfile={dataProfile} st={st}>
      {/* <div className="grid grid-cols-3">
                <div className="w-auto h-auto border rounded-xl flex flex-col mx-3">
                    <div className="p-3 flex flex-col border-b">
                        <h1 className="font-bold text-xl mb-0">Total Inventories</h1>
                        <p className="text-sm text-gray-500 mb-0">Total inventories specifically:</p>
                    </div>
                    <div className="flex-col flex">
                        <div className="text-2xl px-5 py-2">
                            Total: 100 units
                        </div>
                        <div className="text-2xl px-5 py-2">
                            Rented: 20 units
                        </div>
                    </div>
                </div>
                <div className="w-auto h-auto border rounded-xl flex flex-col mx-3">
                    <div className="p-3 flex flex-col border-b">
                        <h1 className="font-bold text-xl mb-0">Total Inventories</h1>
                        <p className="text-sm text-gray-500 mb-0">Total inventories specifically:</p>
                    </div>
                    <div className="flex-col flex">
                        <div className="text-2xl px-5 py-2">
                            Total: 100 units
                        </div>
                        <div className="text-2xl px-5 py-2">
                            Rented: 20 units
                        </div>
                    </div>
                </div>
                <div className="w-auto h-auto border rounded-xl flex flex-col mx-3">
                    <div className="p-3 flex flex-col border-b">
                        <h1 className="font-bold text-xl mb-0">Total Inventories</h1>
                        <p className="text-sm text-gray-500 mb-0">Total inventories specifically:</p>
                    </div>
                    <div className="flex-col flex">
                        <div className="text-2xl px-5 py-2">
                            Total: 100 units
                        </div>
                        <div className="text-2xl px-5 py-2">
                            Rented: 20 units
                        </div>
                    </div>
                </div>
            </div> */}
      <h1>Selamat datang di dashboard</h1>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  var initProps = {};
  if (req && req.headers) {
    if (req.headers.cookie) {
      const cookies = req.headers.cookie;
      const cookiesJSON1 = httpcookie.parse(cookies);
      if (!cookiesJSON1.token) {
        return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
        };
      } else {
        if (typeof cookies === "string") {
          const cookiesJSON = httpcookie.parse(cookies);
          initProps = cookiesJSON.token;
        }
        const resources = await fetch(
          `https://boiling-thicket-46501.herokuapp.com/detailProfile`,
          {
            method: `GET`,
            headers: {
              Authorization: JSON.parse(initProps),
            },
          }
        );
        const resjson = await resources.json();
        const dataProfile = resjson;
        return {
          props: {
            initProps,
            dataProfile,
            sidemenu: "1",
          },
        };
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
}

export default DashboardIndex;
