import { useState, useEffect } from "react";
import CardFlip from "./CardFlip";
import Envelope from "./Envelope";
import SendCardHeader from "./SendCardHeader";
import { useGetSavedCardById } from "../../../hooks/queries/useSavedCards";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function SendCardContainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isOpened, setIsOpened] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const { data: savedCardData, isLoading } = useGetSavedCardById(id ?? "");
  const savedCard = savedCardData?.data;

  useEffect(() => {
    if (isLoading) return;

    if (!savedCard) {
      toast.error("Thiệp không tìm thấy");
      navigate("/cards");
      return;
    }
  }, [isLoading, savedCard, navigate]);

  useEffect(() => {
    if (!isOpened) {
      setShowButtons(false);
      return;
    }
    const t1 = setTimeout(() => setIsFlipped(true), 1600);
    const t2 = setTimeout(() => setShowButtons(true), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpened]);

  const handleReset = () => {
    setIsOpened(false);
    setIsFlipped(false);
  };

  const handleOpenEnvelop = () => {
    setIsOpened(true);
  };

  return (
    <>
      <SendCardHeader showButtons={showButtons} onReset={handleReset} />

      <main
        className="relative h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/bg-design.webp')" }}
      >
        {!isOpened && (
          <Envelope isOpened={isOpened} onOpen={handleOpenEnvelop} />
        )}

        {isOpened && <CardFlip card={savedCard!} isFlipped={isFlipped} />}
      </main>
    </>
  );
}

export default SendCardContainer;
