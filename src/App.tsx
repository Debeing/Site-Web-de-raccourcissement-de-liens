import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaste } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  }

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setUrl(text);
  }

  const BITLY_TOKEN = "d23aacfad3d3dbfd4ed81cb0a1ef7f4484e0cdce"; 
  const handleShorten = async () => {
    if (!url) return;
    try {
      const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${BITLY_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ long_url: url })
      });
      const data = await response.json();
      setShortUrl(data.link || "Erreur Bitly");
    } catch {
      setShortUrl("Erreur réseau");
    }
  }

  return (
    <div>
      <nav className="flex d-flex m-5 align-center">
        <img src="/Logo.png" alt="Logo" className="w-20 h-20" />
      </nav>
      <div className="w-200 h-100 eric  mx-auto rounded-lg flex justify-center items-center">
        <div className="">
          <h1>Créer un lien court</h1>
          <div className="relative">
            <input
              type="url"
               value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Coler votre URL ici...  "
              className="rounded-lg border-2 border-blue-500 focus:border-blue-500 w-80 focus:outline-none pl-10"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500"
             onClick={handlePaste}>
              <FontAwesomeIcon icon={faPaste} className="cursor-pointer" />
            </span>
          </div>
          <button
            type="button"
            className="cursor-pointer flex mt-5"
            onClick={handleShorten}
          >
            Raccourcir
          </button>
          <div className="relative mt-5">
            <input
              type="text"
              value={shortUrl}
              readOnly
              placeholder="Votre lien court apparaîtra ici..."
              className="rounded-lg border-2 border-blue-500 focus:border-blue-500 w-80 focus:outline-none pl-10"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500"
             onClick={handleCopy}>
              <FontAwesomeIcon icon={faCopy} className="cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
