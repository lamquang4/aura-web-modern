import toast from "react-hot-toast";
import CardPreview from "./CardPreview";
import { useEffect, useState } from "react";
import type { DesignStyle } from "../../../types/type";
import DesignPanel from "./DesignPanel";
import DesignCardHeader from "./DesignCardHeader";
import { useGetCardById } from "../../../hooks/queries/useCards";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateSavedCard,
  useGetSavedCardById,
  useUpdateSavedCard,
} from "../../../hooks/queries/useSavedCards";
import { useGetMe } from "../../../hooks/queries/useUsers";
import { useAppDispatch } from "../../../redux/store";
import { openAuthModal } from "../../../redux/slices/authModalSlice";

function DesignCardContainer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [design, setDesign] = useState<DesignStyle>({
    content: "",
    name: "",
    textStyle: {
      fontFamily: "Quicksand",
      fontColor: "#000000",
      fontWeight: "normal",
      fontStyle: "normal",
    },
  });

  const { data: cardData, isLoading: isLoadingCard } = useGetCardById(id ?? "");
  const card = cardData?.data;

  const { data: accountData } = useGetMe();
  const account = accountData?.data;

  const { data: savedCardData, isLoading: isLoadingSavedCard } =
    useGetSavedCardById(id ?? "");
  const savedCard = savedCardData?.data;

  const { mutate: createSavedCard, isPending: isLoadingCreate } =
    useCreateSavedCard();
  const { mutate: updateSavedCard, isPending: isLoadingUpdate } =
    useUpdateSavedCard();

  const isLoading = isLoadingCard || isLoadingSavedCard;
  const isLoadingSave = isLoadingCreate || isLoadingUpdate;

  useEffect(() => {
    if (isLoading) return;

    if (!card && !savedCard) {
      toast.error("Thiệp không tìm thấy");
      navigate("/cards");
      return;
    }

    if (savedCard) {
      setDesign({
        name: savedCard.customName || "",
        content: savedCard.customContent || "",
        textStyle: {
          fontFamily: savedCard.fontFamily || "Quicksand",
          fontColor: savedCard.fontColor || "#000000",
          fontWeight: savedCard.fontWeight || "normal",
          fontStyle: savedCard.fontStyle || "normal",
        },
      });
      return;
    }

    if (card) {
      setDesign((prev) => ({
        ...prev,
        name: card.name || "",
        content: card.content || "",
      }));
    }
  }, [isLoading, card, savedCard, navigate]);

  const updateDesign = (partial: Partial<DesignStyle>) => {
    setDesign((prev) => ({ ...prev, ...partial }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!account?.userId) {
      dispatch(openAuthModal("login"));
      toast.error("Bạn phải đăng nhập để lưu thiệp");
      navigate("/");
      return;
    }

    if (design.content.length > 200) {
      toast.error("Nội dung không vượt quá 200 ký tự");
      return;
    }

    const payload = {
      customName: design.name,
      customContent: design.content,
      fontFamily: design.textStyle.fontFamily,
      fontWeight: design.textStyle.fontWeight,
      fontStyle: design.textStyle.fontStyle,
      fontColor: design.textStyle.fontColor,
      cardId: savedCard?.card.cardId ?? id ?? "",
    };

    if (savedCard) {
      updateSavedCard({ savedCardId: id ?? "", data: payload });
    } else {
      createSavedCard(payload);
    }
  };

  return (
    <section className="min-h-screen">
      <DesignCardHeader isLoadingSave={isLoadingSave} />

      <main
        className="flex-1 flex items-start justify-center py-8 px-[15px] md:p-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/bg-design.webp')" }}
      >
        <form
          id="form-design"
          onSubmit={handleSubmit}
          className="w-full justify-center flex gap-10 flex-wrap"
        >
          <CardPreview
            frontImage={card?.frontImage ?? savedCard?.card.frontImage ?? ""}
            backImage={card?.backImage ?? savedCard?.card.backImage ?? ""}
            content={design.content}
            textStyle={design.textStyle}
            onContentChange={(content) => updateDesign({ content })}
          />

          <DesignPanel
            design={design}
            onContentChange={(content) => updateDesign({ content })}
            onNameChange={(name) => updateDesign({ name })}
            onStyleChange={(partial) =>
              updateDesign({ textStyle: { ...design.textStyle, ...partial } })
            }
          />
        </form>
      </main>
    </section>
  );
}

export default DesignCardContainer;
