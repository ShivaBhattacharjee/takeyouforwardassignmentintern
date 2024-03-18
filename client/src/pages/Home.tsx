import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [stdin, setStdin] = useState<string>("");
  const [sourceCode, setSourceCode] = useState<string>("");
  const [SubmitLoading, setSubmitLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value); 
    console.log(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        username: username,
        language: language,
        stdin: stdin,
        sourceCode: sourceCode,
      };
      console.log(data);
      if (!data.username || !data.language || !data.stdin || !data.sourceCode) {
        return toast.error("Please fill all the fields");
      }
      setSubmitLoading(true);
      const req = await axios.post("http://localhost:8080/api/v1/code", data);
      const res = req.data;
      toast.success(
        res?.message || "Your code has been submitted successfully"
      );
      console.log(res);
      navigate("/submissions");
    } catch (err:any) {
      toast.error(err?.response?.data?.message || "Something went wrong")
      console.log(err);
    } finally {
      setSubmitLoading(false);
    }
  };


  return (
    <div className="flex w-full lg:w-1/4 lg:m-auto p-4 justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg w-full flex flex-col gap-4 border-2 border-black/10 rounded-lg p-4"
      >
        <h1 className=" text-2xl font-bold text-center">Submit your code</h1>
        <label htmlFor="username" className=" opacity-50 font-semibold text-md">
          Enter your username
        </label>
        <input
          type="text"
          required
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="bg-transparent border-2 border-black/20 p-4 rounded-lg focus:border-black focus:outline-none outline-none duration-200"
        />
        <label htmlFor="language" className=" opacity-50 font-semibold text-md">
          Enter your preffered language
        </label>
        <select
          className="bg-transparent border-2 border-black/20 p-4 rounded-lg focus:border-black focus:outline-none outline-none duration-200"
          name="language"
          onChange={handleLanguageChange}
          required
        >
          <option value="">Select Language</option>
          <option value="JAVASCRIPT">Javascript</option>
          <option value="PYTHON">Python</option>
        </select>
        <label htmlFor="stdin" className=" opacity-50 font-semibold text-md">
          Enter your standard input (stdin)
        </label>
        <textarea
          required
          onChange={(e) => setStdin(e.target.value)}
          className=" border-2 p-2 outline-none focus:outline-black focus:border-none h-20 border-black/20 rounded-lg"
        ></textarea>
        <label htmlFor="stdin" className=" opacity-50 font-semibold text-md">
          Enter your source code
        </label>
        <textarea
          onChange={(e) => setSourceCode(e.target.value)}
          required
          className=" border-2 p-2 outline-none focus:outline-black focus:border-none h-36 border-black/20 rounded-lg"
        ></textarea>
        <button className=" bg-black w-full text-white p-4 rounded-lg hover:bg-white border-black hover:border-2 hover:text-black duration-200">
          {SubmitLoading ? "Submitting..." : "Submit"}
        </button>
        <span className=" text-center opacity-70 text-sm">
          Developed by{" "}
          <a
            href="https://github.com/shivabhattacharjee"
            target="_blank"
            className=" text-blue-600 font-bold"
          >
            Shiva
          </a>{" "}
          for TYF Intern Project
        </span>
      </form>
    </div>
  );
};

export default Home;
