import toast from "react-hot-toast";
import { mockCardDetail } from "../../../mocks/mockCardDetail";
import CardPreview from "./CardPreview";
import { useState } from "react";
import type { DesignStyle } from "../../../types/type";
import DesignPanel from "./DesignPanel";
import DesignCardHeader from "./DesignCardHeader";

function DesignCardContainer() {
  const card = mockCardDetail;
  const [design, setDesign] = useState<DesignStyle>({
    content: card.content,
    name: card.name,
    textStyle: {
      fontFamily: "Quicksand",
      fontColor: "#000000",
      fontWeight: "normal",
      fontStyle: "normal",
    },
  });

  const updateDesign = (partial: Partial<DesignStyle>) => {
    setDesign((prev) => ({ ...prev, ...partial }));
  };

  const isLoadingSave = false;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (design.content.length > 200) {
      toast.error("Nội dung vượt quá 200 ký tự!");
      return;
    }
  };

  return (
    <section className="min-h-screen">
      <DesignCardHeader isLoadingSave={isLoadingSave} />

      <main
        className="flex-1 flex items-start justify-center py-8 px-[15px] md:p-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/bg-design.webp')" }}
      >
        <form
          id="form-design"
          onSubmit={handleSave}
          className="w-full justify-center flex gap-10 flex-wrap"
        >
          <CardPreview
            frontImage={card.frontImage}
            backImage={card.backImage}
            content={design.content}
            textStyle={design.textStyle}
            onContentChange={(content) => updateDesign({ content })}
          />

          <DesignPanel
            design={design}
            onContentChange={(content) => updateDesign({ content })}
            onNameChange={(name) => updateDesign({ name })}
            onStyleChange={(partial) =>
              updateDesign({ textStyle: { ...design.textStyle, ...partial } })
            }
          />
        </form>
      </main>
    </section>
  );
}

export default DesignCardContainer;
