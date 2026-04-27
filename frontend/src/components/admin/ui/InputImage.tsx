import { memo, useEffect, useState } from "react";
import Image from "../../ui/Image";
import ImageViewer from "../../ui/ImageViewer";
import { ReactSortable } from "react-sortablejs";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { CircleX } from "lucide-react";
import Label from "../../ui/Label";
type SortableImage = {
  id: string;
  url: string;
};

type Props = {
  InputId: string;
  previewImages: string[];
  onPreviewImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePreviewImage: (index: number) => void;
  onReorderImages: (orderedUrls: string[]) => void;
};

function InputImage({
  InputId,
  previewImages,
  onPreviewImage,
  onRemovePreviewImage,
  onReorderImages,
}: Props) {
  const [openViewer, setOpenViewer] = useState(false);
  const [viewerImage, setViewerImage] = useState("");
  const [sortableItems, setSortableItems] = useState<SortableImage[]>([]);

  useEffect(() => {
    setSortableItems((prev) => {
      if (prev.length === previewImages.length) return prev;
      return previewImages.map((url) => ({ id: url, url }));
    });
  }, [previewImages]);

  const handleOpenViewer = (image: string) => {
    setViewerImage(image);
    setOpenViewer(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    const syntheticEvent = {
      target: { files, value: "" },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onPreviewImage(syntheticEvent);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Label
        htmlFor={InputId}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex flex-col p-[15px] items-center justify-center w-full min-h-70 h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
      >
        {!previewImages.length ? (
          <div className="flex flex-col items-center justify-center text-[#ADB0BB]">
            <svg
              className="w-12 h-12 mb-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>

            <p className="mb-2 font-semibold">Bấm để tải, kéo hoặc thả</p>
            <p>PNG, JPG, WEBP</p>
          </div>
        ) : (
          <ReactSortable
            list={sortableItems}
            setList={(newItems) => {
              setSortableItems(newItems);
              onReorderImages(newItems.map((item) => item.url));
            }}
            animation={200}
            className={`${
              previewImages.length === 1
                ? "flex justify-center items-center"
                : "grid md:grid-cols-4 grid-cols-2 items-center"
            } gap-3 h-70 overflow-y-auto`}
          >
            {sortableItems.map((item, index) => (
              <div
                className=" relative"
                key={item.id}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleOpenViewer(item.url);
                  }}
                >
                  <Image
                    source={item.url}
                    alt={`preview-${index}`}
                    className="w-[150px]"
                    loading="eager"
                  />
                </div>

                <div className="absolute top-[6px] right-[6px]">
                  <Button
                    type="button"
                    className="bg-white flex justify-center items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onRemovePreviewImage(index);
                    }}
                  >
                    <CircleX size={25} />
                  </Button>
                </div>
              </div>
            ))}
          </ReactSortable>
        )}

        <Input
          id={InputId}
          type="file"
          className="hidden"
          name="image"
          accept=".png,.jpg,.webp"
          multiple
          onChange={(e) => onPreviewImage(e)}
        />
      </Label>

      {openViewer && (
        <ImageViewer
          image={viewerImage}
          open={openViewer}
          onClose={() => setOpenViewer(false)}
        />
      )}
    </div>
  );
}

export default memo(InputImage);
