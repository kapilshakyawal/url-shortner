import React, { useState } from "react";

import copy from "copy-to-clipboard";

let result;
const Home = () => {
  const [CopyText, setCopyText] = useState();
  const [Input, setInput] = useState({
    longUrl: "",
  });
  const handleInput = (e) => {
    setInput({ ...Input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Input),
    };
    await fetch("http://localhost:9000/urlshort", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.success);
        result = data;
        console.log(result.success)
        setCopyText(data.url.shortUrl);
      });
  };

  const copyText = () => {
    copy(result.url.shortUrl);
  };

  return (
    <section className=" dark:bg-gray-900 h-screen pt-10">
      <form
        className="flex justify-center align-middle flex-col w-screen"
        action="#"
      >
        <span className="flex justify-center align-middle text-5xl mb-10 text-white font-bold">
          URL SHORTNER
        </span>
        <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white flex min-w-full justify-evenly flex-wrap">
          <input
            onChange={handleInput}
            type="email"
            name="longUrl"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white w-full mx-15"
            placeholder="name@company.com"
            required
          />
        </div>
          <button
            onClick={handleSubmit}
            className="bg-white text-xl px-10 py-2 rounded-lg text-gray-900 font-bold m-10 min-w-fit"
          >
            GET
          </button>
      </form>

      {result ?( <div className="flex justify-center align-middle flex-col items-center">
        <div  className="bg-white text-2xl text-blue-900 px-10 py-3 rounded-xl" >
          <span className="text-blue-900 font-bold">{CopyText}</span>
        </div>
        <div>
          <button onClick={copyText} className="text-white bg-blue-500 px-5 py-3 rounded-full mt-5 font-bold focus:bg-green-400">
            Copy to clipboard the link
          </button>
        </div>
      </div>): "" }
      
      {/* </div> */}
      {/* <div> */}
    </section>
  );
};
export default Home;
