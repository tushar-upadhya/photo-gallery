import { useSortable } from "@dnd-kit/sortable";
import { IImageGallery } from "../../interfaces/global.types";
import { twMerge } from "tailwind-merge";

interface ImageCard extends IImageGallery {
  className?: string;
  onclick?: (id: string | number) => void;
}

const ImageCard = ({
  id,
  slug,
  isSelected,
  onclick,
  className = "",
}: ImageCard) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    index,
  } = useSortable({ id: id });

  return (
    <div
      className={twMerge(
        "relative rounded-lg overflow-hidden border border-gray-300 group z-0  object-cover"
      )}
    >
      <div>
        <img src={slug} alt="" />
      </div>
    </div>
  );
};

export default ImageCard;
