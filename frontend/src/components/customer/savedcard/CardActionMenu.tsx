import {
  Copy,
  Eye,
  Mail,
  MessageCircleMore,
  Pencil,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteSavedCard } from "../../../hooks/queries/useSavedCards";
import { buildEmailMessage } from "../../../utils/emailMessage";
import type { DropdownMenuItem } from "../../ui/DropdownMenu";
import DropdownMenu from "../../ui/DropdownMenu";

interface Props {
  cardId: string;
  cardName: string;
  onClose: () => void;
}

function CardActionMenu({ cardId, cardName, onClose }: Props) {
  const { mutate: deleteSavedCard, isPending: isLoadingDelete } =
    useDeleteSavedCard();

  function handleOpenEmailShare(cardId: string, cardName?: string) {
    const { subject, text } = buildEmailMessage(cardId, cardName);

    const gmailUrl =
      `https://mail.google.com/mail/u/0/?view=cm&fs=1` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(text)}`;

    window.open(gmailUrl, "_blank");
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/send/${cardId}`);
    toast.success("Sao chép link thành công");
    onClose();
  };

  const handleDeleteSavedCard = () => {
    deleteSavedCard(cardId);
    onClose();
  };

  const handleShareEmail = () => {
    handleOpenEmailShare(cardId, cardName);
    onClose();
  };

  const items: DropdownMenuItem[] = [
    {
      label: "Chỉnh sửa thiệp lưu",
      icon: <Pencil size={18} />,
      href: `/design/savedcard/${cardId}`,
      onClick: onClose,
      textColor: "text-info",
    },
    {
      label: "Xóa thiệp lưu",
      icon: <Trash2 size={18} />,
      onClick: handleDeleteSavedCard,
      disabled: isLoadingDelete,
      textColor: "text-danger",
    },
    {
      label: "Xem trước gửi thiệp",
      icon: <Eye size={18} />,
      href: `/send/${cardId}`,
      onClick: onClose,
    },
    {
      label: "Sao chép link gửi",
      icon: <Copy size={18} />,
      onClick: handleCopyLink,
    },
    {
      label: "Chia sẻ Messenger",
      icon: <MessageCircleMore size={18} />,
      href: "https://m.me/",
      target: "_blank",
      onClick: onClose,
    },
    {
      label: "Chia sẻ Gmail",
      icon: <Mail size={18} />,
      onClick: handleShareEmail,
    },
  ];

  return (
    <div className="absolute top-[40px] right-[8px] z-20">
      <DropdownMenu items={items} horizontal="right" vertical="bottom" />
    </div>
  );
}

export default CardActionMenu;
