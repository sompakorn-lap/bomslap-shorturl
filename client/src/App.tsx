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
    <main>
      
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Enter your url" {...register("longUrl")}/>
          <button type="submit">generate</button>
        </form>
      </section>

      <section>
        <input value={shortUrl} readOnly/>
        <button onClick={copyUrl}>copy</button>
      </section>

    </main>
  );
}

export default App;