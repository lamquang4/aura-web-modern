import { motion } from "framer-motion";
import Label from "../../ui/Label";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import { Sketch } from "@uiw/react-color";
import type { DesignStyle, TextStyle } from "../../../types/type";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Bold, Italic } from "lucide-react";

const MAX_CHARS = 200;

const FONTS = [
  "Arial",
  "Times New Roman",
  "Calibri",
  "Verdana",
  "Quicksand",
  "Georgia",
  "Roboto",
  "Oswald",
  "Lato",
  "Open Sans",
  "Montserrat",
  "Pacifico",
  "Dancing Script",
];

interface Props {
  design: DesignStyle;
  onContentChange: (val: string) => void;
  onNameChange: (val: string) => void;
  onStyleChange: (partial: Partial<TextStyle>) => void;
}

function DesignPanel({
  design,
  onNameChange,
  onContentChange,
  onStyleChange,
}: Props) {
  const isOver = design.content.length > MAX_CHARS;

  const formatButtons = [
    {
      icon: <Bold size={18} />,
      active: design.textStyle.fontWeight === "bold",
      onClick: () =>
        onStyleChange({
          fontWeight:
            design.textStyle.fontWeight === "bold" ? "normal" : "bold",
        }),
    },
    {
      icon: <Italic size={18} />,
      active: design.textStyle.fontStyle === "italic",
      onClick: () =>
        onStyleChange({
          fontStyle:
            design.textStyle.fontStyle === "italic" ? "normal" : "italic",
        }),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="w-full lg:w-[400px] bg-white rounded-sm border border-gray-300 shadow-sm p-[15px]"
    >
      <div className="space-y-[15px]">
        <div className="space-y-[5px] w-full">
          <Label className="text-[0.9rem] font-medium">Tên thiệp</Label>
          <Input
            value={design.name}
            onChange={(e) => onNameChange(e.target.value)}
            type="text"
            required
            className="w-full border border-gray-300 rounded-sm p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400"
          />
        </div>

        <div className="space-y-[5px] w-full">
          <Label className="text-[0.9rem] font-medium">Lời chúc</Label>
          <Textarea
            value={design.content}
            onChange={(e) => onContentChange(e.target.value)}
            className={`w-full h-[150px] rounded-sm p-[6px_10px] border border-gray-300 focus:border-gray-400`}
            error={isOver}
            placeholder="Nhập nội dung thiệp..."
          />
          <span
            className={`text-xs ${isOver ? "text-danger font-medium" : ""}`}
          >
            {design.content.length}/{MAX_CHARS} ký tự
          </span>
        </div>

        <div className="space-y-[5px] w-full">
          <Label className="text-[0.9rem] font-medium">Định dạng</Label>
          <div className="flex gap-2">
            {formatButtons.map((btn, i) => (
              <Button
                key={i}
                type="button"
                onClick={btn.onClick}
                className={`w-9 h-9 flex items-center justify-center rounded-sm border ${
                  btn.active ? " border-black" : "border-gray-300"
                }`}
              >
                {btn.icon}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-[5px] w-full">
          <Label className="text-[0.9rem] font-medium">Kiểu chữ</Label>
          <Select
            value={design.textStyle.fontFamily}
            onChange={(e) => onStyleChange({ fontFamily: e.target.value })}
            className="w-full border border-gray-300 rounded-sm p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400"
          >
            {FONTS.map((f) => (
              <option key={f} value={f} style={{ fontFamily: f }}>
                {f}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-[5px] w-full">
          <Label className="text-[0.9rem] font-medium">Màu chữ</Label>
          <Sketch
            color={design.textStyle.fontColor}
            onChange={(color) => onStyleChange({ fontColor: color.hex })}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default DesignPanel;
