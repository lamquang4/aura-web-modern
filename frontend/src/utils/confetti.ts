import confetti from "canvas-confetti";

const colors = ["#FA8B7E", "#FFB094", "#FFD966"];

export const fireConfetti = () => {
  confetti({
    particleCount: 90,
    spread: 75,
    origin: { x: 0.5, y: 0.55 },
    colors,
  });
};

export const fireCannon = () => {
  confetti({
    particleCount: 100,
    angle: 90,
    spread: 45,
    startVelocity: 55,
    origin: { x: 0.5, y: 1 },
    colors,
  });
};

export const fireStars = () => {
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { x: 0.5, y: 0.55 },
    shapes: ["star"],
    colors: ["#FFD966", "#FFB094", "#FA8B7E"],
    scalar: 1.2,
  });
};
