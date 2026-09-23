import { useState, useEffect } from "react";
import CardFlip from "./CardFlip";
import Envelope from "./Envelope";
import SendCardHeader from "./SendCardHeader";
import { useGetSavedCardById } from "../../../hooks/queries/useSavedCards";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { fireConfetti } from "../../../utils/confetti";

function SendCardContainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isOpened, setIsOpened] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const { data: savedCardData, isLoading } = useGetSavedCardById(id ?? "");
  const savedCard = savedCardData?.data;

  useEffect(() => {
    if (isLoading) return;
    if (!savedCard) {
      toast.error("Thiệp không tìm thấy");
      navigate("/cards");
    }
  }, [isLoading, savedCard, navigate]);

  useEffect(() => {
    if (!isOpened) {
      setShowCard(false);
      setIsFlipped(false);
      setShowButtons(false);
      return;
    }

    const t0 = setTimeout(() => setShowCard(true), 600); // khớp với exit duration của envelope
    const t1 = setTimeout(() => setIsFlipped(true), 1400); // hiện mặt trước 800ms trước khi lật
    const t2 = setTimeout(() => setShowButtons(true), 2100); // flip 700ms xong + buffer nhẹ

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpened]);

  const handleOpenCard = () => {
    setIsOpened(true);
    fireConfetti();
  };

  const handleReset = () => {
    setIsOpened(false);
  };

  return (
    <>
      <SendCardHeader showButtons={showButtons} onReset={handleReset} />

      <main
        className="relative h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/bg-design.webp')" }}
      >
        <Envelope isOpened={isOpened} onOpen={() => handleOpenCard()} />

        <AnimatePresence>
          {showCard && savedCard && (
            <motion.div
              key="card"
              className="h-full w-full"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <CardFlip card={savedCard} isFlipped={isFlipped} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

export default SendCardContainer;
