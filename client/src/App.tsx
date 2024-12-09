import { Icon } from "@iconify/react";
import axios from "axios";
import { useState } from "react";

function App() {

  const [inputUrl, setInputUrl] = useState("");
  const [outputUrl, setOutputUrl] = useState("");
  const [error, setError] = useState("");

  async function generateUrl() {
    try {
      if(inputUrl.length <= 0) {
        setError("URL is required.");
        return ;
      }

      const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
      if(!urlRegex.test(inputUrl)){
        setError("URL is invalid pattern.");
        return ;
      }

      const res = await axios.post("/api", { longUrl: inputUrl });
      setOutputUrl(res.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  function copyUrl() {
    navigator.clipboard.writeText(outputUrl);
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen w-screen bg-slate-300">

      <header className="w-full p-4 text-xl text-center bg-teal-500 text-gray-50">
        <h1>BomSLap - Short URL</h1>
      </header>

      <main>

        <section className="mb-4">
          <div className="w-full flex flex-col">
            <input 
              className="px-4 py-2 border-dashed border-2 border-teal-500 w-4/5 rounded-md mx-auto my-2 focus:ring-0 focus:outline-0"
              placeholder="Enter your url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
            <button
              className="px-4 py-2 border-dashed border-2 border-gray-50 w-4/5 rounded-md mx-auto my-2 bg-teal-500 text-gray-50"
              onClick={generateUrl}
            >
              GENERATE
            </button>
            <div className="w-4/5 mx-auto text-red-400">
              {error}
            </div>
          </div>
        </section>

        <section>
          <div className="w-full flex flex-col">
            <input 
              className="px-4 py-2 border-dashed border-2 border-teal-500 w-4/5 rounded-md mx-auto my-2 focus:ring-0 focus:outline-0"
              value={outputUrl}
              onChange={(e) => setOutputUrl(e.target.value)}
              readOnly
            />
            <button
              className="px-4 py-2 border-dashed border-2 border-gray-50 w-4/5 rounded-md mx-auto my-2 bg-teal-500 text-gray-50"
              onClick={copyUrl}
            >
              COPY
            </button>
          </div>
        </section>

      </main>

      <footer className="w-full p-4 bg-teal-500 text-gray-50">
        <a
          className="flex gap-2"
          href="https://github.com/sompakorn-lap/bomslap-shorturl"
        >
          <Icon icon="mdi:github" width={24} height={24}/>
          <span>GITHUB</span>
        </a>
      </footer>

    </div>
  );
}

export default App;