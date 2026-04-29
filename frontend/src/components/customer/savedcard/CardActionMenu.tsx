import { Link } from "react-router-dom";
import {
  Copy,
  Eye,
  Mail,
  MessageCircleMore,
  Pencil,
  Trash2,
} from "lucide-react";
import { useDeleteSavedCard } from "../../../hooks/queries/useSavedCards";
import toast from "react-hot-toast";

interface CardActionMenuProps {
  cardId: string;
  onClose: () => void;
}

function CardActionMenu({ cardId, onClose }: CardActionMenuProps) {
  const { mutate: deleteSavedCard, isPending: isLoadingDelete } =
    useDeleteSavedCard();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/send/${cardId}`);
    toast.success("Sao chép link thành công");
    onClose();
  };

  const handleDeleteSavedCard = () => {
    deleteSavedCard(cardId);

    onClose();
  };

  return (
    <div className="absolute top-[40px] right-[8px] bg-white shadow-md rounded-sm z-20 p-0 w-[200px]">
      <Link
        className="p-[16px_14px] hover:bg-gray-100 w-full"
        to={`/design/${cardId}`}
        onClick={onClose}
      >
        <div className="flex items-center gap-2 font-medium text-info">
          <Pencil size={18} />
          <span>Chỉnh sửa thiệp lưu</span>
        </div>
      </Link>

      <Link
        className="p-[16px_14px] hover:bg-gray-100 w-full"
        to={`/send/${cardId}`}
        onClick={onClose}
      >
        <div className="flex items-center gap-2 font-medium">
          <Eye size={18} /> <span>Xem trước gửi thiệp</span>
        </div>
      </Link>

      <button
        className="p-[16px_14px] hover:bg-gray-100 w-full"
        onClick={handleCopyLink}
      >
        <div className="flex items-center gap-2 font-medium">
          <Copy size={18} />
          <span>Sao chép link gửi</span>
        </div>
      </button>

      <Link
        className="p-[16px_14px] hover:bg-gray-100 w-full"
        to="https://m.me/"
        target="_blank"
        onClick={onClose}
      >
        <div className="flex items-center gap-2 font-medium">
          <MessageCircleMore size={18} /> <span>Chia sẻ Messenger</span>
        </div>
      </Link>

      <Link
        className="p-[16px_14px] hover:bg-gray-100"
        to={`https://mail.google.com/mail/u/0/?view=cm&fs=1&su=Gửi thiệp`}
        target="_blank"
        onClick={onClose}
      >
        <div className="flex items-center gap-2 font-medium">
          <Mail size={18} /> <span>Chia sẻ Gmail</span>
        </div>
      </Link>

      <button
        className="p-[16px_14px] hover:bg-gray-100 text-danger w-full"
        onClick={handleDeleteSavedCard}
        disabled={isLoadingDelete}
      >
        <div className="flex items-center gap-2 font-medium">
          <Trash2 size={18} /> <span> Xóa thiệp lưu</span>
        </div>
      </button>
    </div>
  );
}

export default CardActionMenu;
