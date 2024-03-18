import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Submissions = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]); // [ {username: "username", language: "language", stdin: "stdin", sourceCode: "sourceCode", timestamp: "timestamp"}]
  const getAllSubmissions = async () => {
    try {
      const req = await axios.get("http://localhost:8080/api/v1/code");
      const res = req.data;
      console.log(res);
      setData(res.data);
      setLoading(false);
      console.log(res);
      console.log(data);
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    getAllSubmissions();
  }, []);
  return (
    <>
      {loading ? (
        <h2 className="flex w-full justify-center min-h-screen items-center text-center">
          Loading.....
        </h2>
      ) : (
        <div className="relative w-full min-h-screen p-4 ">
          <h1 className=" text-3xl font-bold uppercase tracking-wide mb-5">
            Submissions
          </h1>
          {data.length > 0 ? (
            <table className="w-full overflow-x-scroll  text-sm text-left  rtl:text-right text-black ">
              <thead className="text-lg text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Code Language
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stdin
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Timestamp of submission
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Source Code
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr className="bg-white border-b w-full " key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-black whitespace-nowrap "
                    >
                      {item?.username || "N/A"}
                    </th>
                    <td className="px-6 py-4">{item?.codes[0] ? item?.codes[0].language : "N/A" }</td>
                    <td className="px-6 py-4">{item?.codes[0] ? item?.codes[0].stdin : "N/A" }</td>
                    <td className="px-6 py-4">{item?.codes[0] ? item?.codes[0].createdAt : "N/A" }</td>
                    <td className=" px-6 py-4 "><textarea value={item?.codes[0] ? item?.codes[0].code : "N/A" } placeholder="The code" className=" w-full" disabled></textarea></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1 className=" text-center text-3xl flex justify-center items-center min-h-screen font-bold">
              No submissions found
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default Submissions;
