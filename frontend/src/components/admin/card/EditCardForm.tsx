import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputImage from "../ui/InputImage";
import { useInputImage } from "../../../hooks/useInputImage";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Image from "../../ui/Image";
import { useGetCardById, useUpdateCard } from "../../../hooks/queries/useCards";
import Textarea from "../../ui/Textarea";
import {
  updateCardSchema,
  type UpdateCardData,
} from "../../../schemas/cardSchema";
import FieldError from "../../ui/FieldError";

function EditCardForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCardData>({
    resolver: zodResolver(updateCardSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      content: "",
      status: "",
    },
  });

  const { data: cardData, isLoading } = useGetCardById(id ?? "");
  const { mutate: updateCard, isPending: isLoadingUpdate } = useUpdateCard();

  const card = cardData?.data;

  const {
    previewImages: previewFrontImage,
    handlePreviewImage: handlePreviewFrontImage,
    handleRemovePreviewImage: handleRemoveFrontImage,
    handleReorder: handleReorderFront,
    getOrderedFiles: getFrontFiles,
    clearImages: clearFrontImages,
  } = useInputImage(1);

  const {
    previewImages: previewBackImage,
    handlePreviewImage: handlePreviewBackImage,
    handleRemovePreviewImage: handleRemoveBackImage,
    handleReorder: handleReorderBack,
    getOrderedFiles: getBackFiles,
    clearImages: clearBackImages,
  } = useInputImage(1);

  useEffect(() => {
    if (isLoading) return;

    if (!card) {
      toast.error("Thiệp không tìm thấy");
      navigate("/admin/cards");
      return;
    }

    reset({
      name: card.name || "",
      content: card.content || "",
      status: card.status || "",
    });
  }, [isLoading, card, navigate, reset]);

  const onSubmit = (data: UpdateCardData) => {
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" }),
    );

    const frontFiles = getFrontFiles();
    if (frontFiles.length) {
      formData.append("frontImage", frontFiles[0]);
    }

    const backFiles = getBackFiles();
    if (backFiles.length) {
      formData.append("backImage", backFiles[0]);
    }

    updateCard(
      { cardId: id ?? "", data: formData },
      {
        onSuccess: () => {
          clearFrontImages();
          clearBackImages();
        },
      },
    );
  };

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] h-auto">
        <form
          className="flex flex-col gap-7 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-neutral">Chỉnh sửa thiệp</h2>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
              <h5 className="font-bold text-neutral">Hình thiệp</h5>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
                <div className="flex flex-col gap-[15px]">
                  <Label htmlFor="" required>
                    Hình mặt trước
                  </Label>

                  <InputImage
                    InputId="frontImage"
                    previewImages={previewFrontImage}
                    onPreviewImage={handlePreviewFrontImage}
                    onRemovePreviewImage={handleRemoveFrontImage}
                    onReorderImages={handleReorderFront}
                  />

                  <div className="flex gap-3 flex-wrap justify-center">
                    {card?.frontImage && (
                      <Image
                        src={card.frontImage}
                        alt={card.name}
                        className="w-full max-w-[140px] shadow-lg"
                        loading="eager"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-[15px]">
                  <Label htmlFor="" required>
                    Hình mặt sau
                  </Label>

                  <InputImage
                    InputId="backImage"
                    previewImages={previewBackImage}
                    onPreviewImage={handlePreviewBackImage}
                    onRemovePreviewImage={handleRemoveBackImage}
                    onReorderImages={handleReorderBack}
                  />
                  <div className="flex gap-3 flex-wrap justify-center">
                    {card?.backImage && (
                      <Image
                        src={
                          card.backImage ? card.backImage : "/assets/white.png"
                        }
                        alt={card.name}
                        className="w-full max-w-[140px] shadow-lg"
                        loading="eager"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
              <h5 className="font-bold text-neutral">Thông tin chung</h5>

              <div className="flex flex-col gap-1">
                <Label htmlFor="name" required>
                  Tên thiệp
                </Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      id="name"
                      className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400"
                      error={errors.name?.message}
                      {...field}
                    />
                  )}
                />
                <FieldError message={errors.name?.message} />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="content" required>
                  Nội dung
                </Label>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      id="content"
                      className="w-full h-[150px] rounded-sm p-[6px_10px] border border-gray-300 focus:border-gray-400"
                      placeholder="Nhập nội dung thiệp..."
                      error={!!errors.content}
                      {...field}
                    />
                  )}
                />
                <FieldError message={errors.content?.message} />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="status" required>
                  Tình trạng
                </Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="status"
                      className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400"
                      error={errors.status?.message}
                      {...field}
                    >
                      <option value="">Chọn tình trạng</option>
                      <option value="ACTIVE">Hiện</option>
                      <option value="INACTIVE">Ẩn</option>
                    </Select>
                  )}
                />
                <FieldError message={errors.status?.message} />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <Button
              disabled={isLoadingUpdate}
              type="submit"
              className="p-[6px_10px] bg-success text-white font-medium text-center rounded-sm"
            >
              {isLoadingUpdate ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
            <Link
              to="/admin/cards"
              className="p-[6px_10px] bg-danger text-white text-[0.9rem] text-center rounded-sm"
            >
              Trở về
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditCardForm;
