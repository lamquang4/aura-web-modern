interface Props {
  isOpened: boolean;
  onOpen: () => void;
}

function Envelope({ isOpened, onOpen }: Props) {
  const fadeClass = isOpened
    ? "opacity-0 transition-opacity duration-1000 delay-1000"
    : "";

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-transparent"
      id="envelope"
    >
      <div className={`absolute top-0 left-0 block ${fadeClass}`}>
        <svg xmlns="http://www.w3.org/2000/svg" height="300" width="300">
          <polygon
            points="0,100 300,100 300,300 0,300"
            style={{ fill: "#FA8B7E", stroke: "none", strokeWidth: 0 }}
          />
        </svg>
      </div>

      <div className={`block absolute top-0 left-0 z-10 ${fadeClass}`}>
        <svg xmlns="http://www.w3.org/2000/svg" height="300" width="300">
          <polygon
            points="0,100 150,200 300,100 300,300 0,300"
            style={{ fill: "#FFB094", stroke: "#FFB094", strokeWidth: 3 }}
          />
        </svg>
      </div>

      <div className={`block absolute top-0 left-0 z-[11] ${fadeClass}`}>
        <svg xmlns="http://www.w3.org/2000/svg" height="300" width="300">
          <polygon
            points={isOpened ? "0,100 150,0 300,100" : "0,100 150,200 300,100"}
            style={{ fill: "#FA8B7E", stroke: "#FA8B7E", strokeWidth: 2 }}
          />
        </svg>
      </div>

      <button
        onClick={onOpen}
        className={`bg-yellow-400 flex items-center justify-center z-[15] w-[25px] h-[25px] rounded-full border-none font-bold text-center cursor-pointer absolute top-[calc(207px-25px)] left-[calc(163px-25px)] ${fadeClass}`}
      />
    </div>
  );
}

export default Envelope;
