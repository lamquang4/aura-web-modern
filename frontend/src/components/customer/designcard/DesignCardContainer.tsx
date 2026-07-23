import toast from "react-hot-toast";
import CardPreview from "./CardPreview";
import { useEffect } from "react";
import DesignPanel from "./DesignPanel";
import DesignCardHeader from "./DesignCardHeader";
import { useGetCardById } from "../../../hooks/queries/useCards";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import {
  useCreateSavedCard,
  useGetSavedCardById,
  useUpdateSavedCard,
} from "../../../hooks/queries/useSavedCards";
import { useGetMe } from "../../../hooks/queries/useUsers";
import { useAppDispatch } from "../../../redux/store";
import { openAuthModal } from "../../../redux/slices/authModalSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  savedCardSchema,
  type SavedCardData,
} from "../../../schemas/savedCardSchema";

function DesignCardContainer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isSavedCardRoute = !!useMatch("/design/savedcard/:id");

  const {
    watch,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SavedCardData>({
    resolver: zodResolver(savedCardSchema),
    mode: "onBlur",
    defaultValues: {
      customName: "",
      customContent: "",
      fontFamily: "Quicksand",
      fontColor: "#000000",
      fontWeight: "normal",
      fontStyle: "normal",
      cardId: "",
    },
  });

  const { data: cardData, isLoading: isLoadingCard } = useGetCardById(
    !isSavedCardRoute ? (id ?? "") : "",
  );
  const card = cardData?.data;

  const { data: accountData } = useGetMe();
  const account = accountData?.data;

  const { data: savedCardData, isLoading: isLoadingSavedCard } =
    useGetSavedCardById(isSavedCardRoute ? (id ?? "") : "");
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
      reset({
        customName: savedCard.customName || "",
        customContent: savedCard.customContent || "",
        fontFamily: savedCard.fontFamily || "Quicksand",
        fontColor: savedCard.fontColor || "#000000",
        fontWeight: savedCard.fontWeight || "normal",
        fontStyle: savedCard.fontStyle || "normal",
        cardId: savedCard.card.cardId || "",
      });
      return;
    }

    if (card) {
      reset((prev) => ({
        ...prev,
        customName: card.name || "",
        customContent: card.content || "",
        cardId: card.cardId || "",
      }));
    }
  }, [isLoading, card, savedCard, navigate, reset]);

  const onSubmit = (data: SavedCardData) => {
    if (!account?.userId) {
      dispatch(openAuthModal("login"));
      toast.error("Bạn phải đăng nhập để lưu thiệp");
      navigate("/");
      return;
    }

    const payload = {
      ...data,
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
          onSubmit={handleSubmit(onSubmit)}
          className="w-full justify-center flex gap-10 flex-wrap"
        >
          <CardPreview
            frontImage={card?.frontImage ?? savedCard?.card.frontImage ?? ""}
            backImage={card?.backImage ?? savedCard?.card.backImage ?? ""}
            content={watch("customContent")}
            fontFamily={watch("fontFamily")}
            fontColor={watch("fontColor")}
            fontWeight={watch("fontWeight")}
            fontStyle={watch("fontStyle")}
            onContentChange={(val) => setValue("customContent", val)}
          />

          <DesignPanel control={control} errors={errors} />
        </form>
      </main>
    </section>
  );
}

export default DesignCardContainer;
