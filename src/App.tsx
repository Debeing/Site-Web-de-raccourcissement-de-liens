import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaste } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { useState, useRef} from "react";
import QRCodeStyling from "qr-code-styling";

const REBRANDLY_API_KEY = "62d2ff527f494e39af0170f7dfb37817"; 

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  }

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setUrl(text);
  }

  const handleShorten = async () => {
    if (!url) return;
    try {
      // 1. Générer le lien court Rebrandly
      const response = await fetch("https://api.rebrandly.com/v1/links", {
        method: "POST",
        headers: {
          "apikey": REBRANDLY_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ destination: url })
      });
      const data = await response.json();
      setShortUrl(data.shortUrl || "Erreur Rebrandly");
      // 2. Générer le QR code avec logo
      if (data.shortUrl && qrRef.current) {
        const qrCodeStyling = new QRCodeStyling({
          width: 150,
          height: 150,
          data: data.shortUrl,
          image: "/Logo.png", // Chemin vers ton logo
          dotsOptions: { color: "#090909ff", type: "rounded" },
          imageOptions: { crossOrigin: "anonymous", margin: 5 }
        });
        qrRef.current.innerHTML = "";
        qrCodeStyling.append(qrRef.current);
      } else if (qrRef.current) {
        qrRef.current.innerHTML = "";
      }
    } catch {
      setShortUrl("Erreur réseau");
      if (qrRef.current) qrRef.current.innerHTML = "";
    }
  };

  return (
    <div>
      <nav className="flex d-flex m-5 align-center">
        <img src="/Logo.png" alt="Logo" className="w-30 h-30" />
      </nav>
      <div className="w-200 h-100 eric mt-[-25px] mx-auto rounded-lg flex justify-center items-center">
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
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2  text-blue-500"
             onClick={handleCopy}>
              <FontAwesomeIcon icon={faCopy} className="cursor-pointer" />
            </span>
          </div>
          <div className="mt-[-20px] text-center">
            <p className="mt-10">📷 QR Code avec logo</p>
            <div ref={qrRef} className="flex justify-center mt-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
