import { motion } from "framer-motion";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import Label from "../../ui/Label";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import { Sketch } from "@uiw/react-color";
import type { SavedCardData } from "../../../schemas/savedCardSchema";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import FieldError from "../../ui/FieldError";
import { Bold, Italic } from "lucide-react";
import { FONTS, MAX_CHARS } from "../../../constants/constants";

interface Props {
  control: Control<SavedCardData>;
  errors: FieldErrors<SavedCardData>;
}

function DesignPanel({ control, errors }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="w-full lg:w-[400px] bg-white rounded-sm border border-gray-300 shadow-sm p-[15px]"
    >
      <div className="space-y-[15px]">
        <div className="space-y-[5px] w-full">
          <Label htmlFor="customName">Tên thiệp</Label>
          <Controller
            name="customName"
            control={control}
            render={({ field }) => (
              <Input
                id="customName"
                {...field}
                type="text"
                error={errors.customName?.message}
                className="w-full border border-gray-300 rounded-sm p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400"
              />
            )}
          />
          <FieldError message={errors.customName?.message} />
        </div>

        <div className="space-y-[5px] w-full">
          <Label htmlFor="customContent">Lời chúc</Label>
          <Controller
            name="customContent"
            control={control}
            render={({ field }) => {
              const isOver = field.value.length > MAX_CHARS;
              return (
                <div>
                  <Textarea
                    id="customContent"
                    {...field}
                    className="w-full h-[150px] rounded-sm p-[6px_10px] border border-gray-300 focus:border-gray-400"
                    error={isOver || !!errors.customContent}
                    placeholder="Nhập nội dung thiệp..."
                  />

                  <FieldError message={errors.customContent?.message} />

                  <span className={`${isOver ? "text-danger" : ""}`}>
                    {field.value.length}/{MAX_CHARS} ký tự
                  </span>
                </div>
              );
            }}
          />
        </div>

        <div className="space-y-[5px] w-full">
          <Label>Định dạng</Label>
          <div className="flex gap-2">
            <Controller
              name="fontWeight"
              control={control}
              render={({ field }) => (
                <Button
                  type="button"
                  onClick={() =>
                    field.onChange(field.value === "bold" ? "normal" : "bold")
                  }
                  className={`w-8 h-8 flex items-center justify-center rounded-sm border ${
                    field.value === "bold" ? "border-black" : "border-gray-300"
                  }`}
                >
                  <Bold size={18} />
                </Button>
              )}
            />
            <Controller
              name="fontStyle"
              control={control}
              render={({ field }) => (
                <Button
                  type="button"
                  onClick={() =>
                    field.onChange(
                      field.value === "italic" ? "normal" : "italic",
                    )
                  }
                  className={`w-8 h-8 flex items-center justify-center rounded-sm border ${
                    field.value === "italic"
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  <Italic size={18} />
                </Button>
              )}
            />
          </div>
        </div>

        <div className="space-y-[5px] w-full">
          <Label htmlFor="fontFamily">Kiểu chữ</Label>
          <Controller
            name="fontFamily"
            control={control}
            render={({ field }) => (
              <Select
                id="fontFamily"
                {...field}
                className="w-full border border-gray-300 rounded-sm p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400"
              >
                {FONTS.map((f) => (
                  <option key={f} value={f} style={{ fontFamily: f }}>
                    {f}
                  </option>
                ))}
              </Select>
            )}
          />
        </div>

        <div className="space-y-[5px] w-full">
          <Label>Màu chữ</Label>
          <Controller
            name="fontColor"
            control={control}
            render={({ field }) => (
              <Sketch
                color={field.value}
                onChange={(color) => field.onChange(color.hex)}
              />
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default DesignPanel;
