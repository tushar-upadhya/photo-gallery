import { twMerge } from "tailwind-merge";
import { IImageGallery } from "../interfaces/globalInterFace";

interface IImageCard extends Partial<IImageGallery> {
  className?: string;
  onClick?: (id: string | number) => void;
}

const ImageOverlayCard = ({ slug, className = "" }: IImageCard) => {
  return (
    <div
      className={twMerge(
        "rounded-lg overflow-hidden border border-gray-300 group flex items-center justify-center h-full",
        className
      )}
    >
      <img
        src={slug || "/assets/images/image-1.webp"}
        alt={slug}
        className="block object-cover w-full h-full"
      />
    </div>
  );
};

export default ImageOverlayCard;
