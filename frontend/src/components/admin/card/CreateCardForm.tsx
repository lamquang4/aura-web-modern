import { useState } from "react";
import InputImage from "../ui/InputImage";
import { useInputImage } from "../../../hooks/useInputImage";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

function CreateCardForm() {
  const [data, setData] = useState({
    name: "",
    content: "",
    status: "",
  });

  const {
    previewImages: previewFrontImage,
    handlePreviewImage: handlePreviewFrontImage,
    handleRemovePreviewImage: handleRemoveFrontImage,
    handleReorder: handleReorderFront,
    clearImages: clearFrontImages,
  } = useInputImage(1);

  const {
    previewImages: previewBackImage,
    handlePreviewImage: handlePreviewBackImage,
    handleRemovePreviewImage: handleRemoveBackImage,
    handleReorder: handleReorderBack,
    clearImages: clearBackImages,
  } = useInputImage(1);

  const isLoading = false;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setData({
      name: "",
      content: "",
      status: "",
    });
    clearFrontImages();
    clearBackImages();
  };
  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] h-auto">
        <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
          <h2 className="text-neutral">Thêm thiệp</h2>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
              <h5 className="font-bold text-neutral">Hình mặt trước</h5>

              <InputImage
                InputId="frontImage"
                previewImages={previewFrontImage}
                onPreviewImage={handlePreviewFrontImage}
                onRemovePreviewImage={handleRemoveFrontImage}
                onReorderImages={handleReorderFront}
                blockIndex={0}
              />
            </div>

            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
              <h5 className="font-bold text-neutral">Hình mặt sau</h5>

              <InputImage
                InputId="backImage"
                previewImages={previewBackImage}
                onPreviewImage={handlePreviewBackImage}
                onRemovePreviewImage={handleRemoveBackImage}
                onReorderImages={handleReorderBack}
                blockIndex={0}
              />
            </div>

            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
              <h5 className="font-bold text-neutral">Thông tin chung</h5>

              <div className="flex flex-col gap-1">
                <Label htmlFor="" required>
                  Tên thiệp
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="" className="text-[0.9rem] font-medium">
                  Tình trạng
                </Label>
                <Select
                  name="status"
                  required
                  onChange={handleChange}
                  value={data.status}
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                >
                  <option value="">Chọn tình trạng</option>
                  <option value="ACTIVE">Hiện</option>
                  <option value="INACTIVE">Ẩn</option>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <Button
              disabled={isLoading}
              type="submit"
              className="p-[6px_10px] bg-success text-white text-[0.9rem] font-medium text-center rounded-sm"
            >
              {isLoading ? "Đang thêm..." : "Thêm"}
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

export default CreateCardForm;
