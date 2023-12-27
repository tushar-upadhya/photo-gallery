import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { nanoid } from "nanoid";
import { IImageGallery } from "../interfaces/globalInterFace";
import ImageIcon from "./icons/ImageIcon";
import Modal from "./modal/Modal";
import CloseIcon from "./icons/CloseIcon";

interface IAddImageCard {
  setGalleryData: React.Dispatch<React.SetStateAction<IImageGallery[]>>;
}

const AddImageCard = ({ setGalleryData }: IAddImageCard) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // get image url from input
    const imageUrl = event.currentTarget["image-url"].value;

    if (!imageUrl) return;

    setGalleryData((prev) => [
      ...prev,
      {
        id: nanoid(),
        slug: imageUrl,
        isSelected: false,
      },
    ]);

    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={twMerge(
          "rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-500 aspect-square p-8 bg-slate-200"
        )}
      >
        <ImageIcon />
        <p className="text-xs font-semibold md:text-base whitespace-nowrap">
          Add Images
        </p>
      </button>
      <Modal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        modalId="addImageModal"
      >
        <form
          className="relative py-12 px-6 bg-neutral-50 rounded w-[680px] max-w-[95vw] max-h-[95vh]"
          onSubmit={handleImageSubmit}
        >
          <CloseIcon
            onClick={() => setIsModalOpen(false)}
            width={31}
            className="absolute text-red-600 transition-all cursor-pointer top-4 right-4 hover:text-red-700"
          />
          <h2 className="mb-8 text-2xl font-semibold text-center">
            Add New Image URL
          </h2>
          <input
            type="url"
            name="image-url"
            className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent "
            placeholder="https://example.com/image.png"
          />
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-8 py-2.5 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors duration-500"
            >
              Add Image
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddImageCard;
