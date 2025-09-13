import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaste } from "@fortawesome/free-solid-svg-icons";


import "./index.css";
import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  
  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setUrl(text);
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
          <button type="submit" className="cursor-pointer flex mt-5">
            Raccourcir
          </button>
          <div className="relative mt-5">
            <input
              type="message"
              // value={setUrl}
              // onChange={(e) => setUrl(e.target.value)}
              placeholder="Votre lien court apparaîtra ici..."
              className="rounded-lg border-2 border-blue-500 focus:border-blue-500 w-80 focus:outline-none pl-10"
            />
            {/* <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500"
             onClick={handleCopy}>
              <FontAwesomeIcon icon={faCopy} className="cursor-pointer" />
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
