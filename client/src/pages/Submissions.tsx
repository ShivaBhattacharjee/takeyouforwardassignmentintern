import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Submissions = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [expandStates, setExpandStates] = useState<boolean[]>([]);

  const getAllSubmissions = async () => {
    try {
      const req = await axios.get("http://localhost:8080/api/v1/code");
      const res = req.data;
      setData(res.data);
      setExpandStates(new Array(res.data.length).fill(false)); // Initialize all code blocks to be collapsed initially
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getAllSubmissions();
  }, []);

  const toggleShowFullCode = (index: number) => {
    setExpandStates((prevExpandStates) => {
      const newExpandStates = [...prevExpandStates];
      newExpandStates[index] = !newExpandStates[index];
      return newExpandStates;
    });
  };
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust this format according to your preference
  };
  return (
    <>
      {loading ? (
        <h2 className="flex w-full justify-center min-h-screen items-center text-center">
          Loading.....
        </h2>
      ) : (
        <div className="relative w-full min-h-screen p-4">
          <h1 className="text-3xl font-bold uppercase tracking-wide mb-5">
            Submissions
          </h1>
          {data.length > 0 ? (
            <table className="w-full overflow-x-scroll text-sm text-left rtl:text-right text-black">
              <thead className="text-lg text-gray-700 uppercase bg-gray-50">
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
                {data.map((item, index) => {
                  const codeToDisplay = expandStates[index]
                    ? item?.codes[0]?.code
                    : item?.codes[0]?.code.substring(0, 100);

                  return (
                    <tr className="bg-white border-b w-full" key={index}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap"
                      >
                        {item?.username || "N/A"}
                      </th>
                      <td className="px-6 py-4">
                        {item?.codes[0] ? item?.codes[0].language : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {item?.codes[0] ? item?.codes[0].stdin : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {item?.codes[0] ? formatTimestamp(item?.codes[0].createdAt) : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <textarea
                          value={codeToDisplay || "N/A"}
                          placeholder="The code"
                          className="w-full h-40"
                          disabled
                        ></textarea>
                        {!expandStates[index] && (
                          <button
                            onClick={() => toggleShowFullCode(index)}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                          >
                            Show More
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h1 className="text-center text-3xl flex justify-center items-center min-h-screen font-bold">
              No submissions found
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default Submissions;
