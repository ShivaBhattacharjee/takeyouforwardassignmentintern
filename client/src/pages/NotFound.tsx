import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center items-center">
      <h1 className=" text-3xl md:text-8xl font-bold tracking-widest">404</h1>
      <p className=" opacity-70 text-lg  text-center font-medium">The page you are looking for couldn't be found</p>
      <Link to={"/"} className=" bg-black text-white p-4 rounded-lg w-1/2 lg:w-56 text-center font-bold">Home</Link>
    </div>
  );
};

export default NotFound;
