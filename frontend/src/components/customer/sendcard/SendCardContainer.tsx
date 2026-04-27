import { useState, useEffect } from "react";
import CardFlip from "./CardFlip";
import Envelope from "./Envelope";
import SendCardHeader from "./SendCardHeader";
import { useGetSavedCardById } from "../../../hooks/queries/useSavedCards";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

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

    const t0 = setTimeout(() => setShowCard(true), 700);
    const t1 = setTimeout(() => setIsFlipped(true), 1500);

    const t2 = setTimeout(() => setShowButtons(true), 2400);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpened]);

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
        <Envelope isOpened={isOpened} onOpen={() => setIsOpened(true)} />

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
