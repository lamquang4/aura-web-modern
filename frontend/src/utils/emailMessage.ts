export function buildEmailMessage(cardId: string, cardName?: string) {
  const shareLink = `${window.location.origin}/send/${cardId}`;

  const subject = cardName
    ? `💌 Một tấm thiệp "${cardName}" gửi tặng bạn`
    : "💌 Một tấm thiệp dành tặng bạn";

  const text = [
    "Xin chào bạn thân mến,",
    "",
    "Mình gửi bạn một tấm thiệp cùng những lời chúc tốt đẹp nhất.",
    "Bạn hãy mở thiệp tại đường dẫn bên dưới nhé:",
    shareLink,
    "",
    "Thân mến.",
  ].join("\n");

  return {
    subject,
    text,
  };
}
