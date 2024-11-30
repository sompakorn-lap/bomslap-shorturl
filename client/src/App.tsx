import { valibotResolver } from "@hookform/resolvers/valibot";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";

const UrlShcema = v.object({
  longUrl: v.pipe(
    v.string(),
    v.url()
  )
});

type UrlType = v.InferOutput<typeof UrlShcema>;

function App() {

  const [shortUrl, setShortUrl] = useState("");

  const { register, handleSubmit } = useForm<UrlType>({
    resolver: valibotResolver(UrlShcema)
  });

  function copyUrl(){
    navigator.clipboard.writeText(shortUrl);
  }

  async function onSubmit(data: UrlType){
    try {
      const res = await axios.post("/api", data);
      setShortUrl(res.data);
    }
    catch (err) {}
  }

  return (
    <main className="w-screen min-h-screen bg-slate-300">

      <section className="w-full py-2 bg-teal-500 flex">
        <h1 className="text-xl mx-auto text-gray-50">BomSLap - Short URL</h1>
      </section>
      
      <section className="w-full my-5">
        <form
          className="w-full flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="px-4 py-2 border-dashed border-4 border-teal-500 w-4/5 rounded-md mx-auto my-2 focus:ring-0 focus:outline-0"
            placeholder="Enter your url"
            {...register("longUrl")}
          />
          <button
            className="px-4 py-2 border-dashed border-4 border-gray-50 w-4/5 rounded-md mx-auto my-2 bg-teal-500 text-gray-50"
            type="submit"
          >
            GENERATE
          </button>
        </form>
      </section>

      <section className="w-full my-5">
        <div className="w-full flex flex-col">
          <input
            className="px-4 py-2 border-dashed border-4 border-teal-500 w-4/5 rounded-md mx-auto my-2 focus:ring-0 focus:outline-0"
            value={shortUrl}
            readOnly
          />
          <button
            className="px-4 py-2 border-dashed border-4 border-gray-50 w-4/5 rounded-md mx-auto my-2 bg-teal-500 text-gray-50"
            onClick={copyUrl}
          >
            COPY
          </button>
        </div>
      </section>

    </main>
  );
}

export default App;