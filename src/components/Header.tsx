import { IImageGallery } from "../interfaces/globalInterFace";
import CheckboxIcon from "./icons/CheckboxIcon";
import EmptyCheckboxIcon from "./icons/EmptyCheckboxIcon";

interface IHeaderProps {
  onDelete: (selectedItems: IImageGallery[]) => void;
  galleryData: IImageGallery[];
}

const Header = ({ onDelete, galleryData }: IHeaderProps) => {
  const selectedItems = galleryData.filter((item) => item.isSelected);

  return (
    <div className="flex items-center justify-between gap-4 p-5 bg-black">
      {selectedItems.length > 0 ? (
        <>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 md:text-2xl">
            {selectedItems.length > 0 ? (
              <CheckboxIcon className="text-white" />
            ) : (
              <EmptyCheckboxIcon />
            )}
            <span>
              {selectedItems.length > 1
                ? `${selectedItems.length} Files Selected`
                : `${selectedItems.length} File Selected`}
            </span>
          </h2>
          <button
            className="text-base font-semibold text-yellow-50 md:text-lg hover:underline"
            onClick={
              selectedItems.length > 0
                ? () => onDelete(selectedItems)
                : () => {}
            }
          >
            {/* if one file then show Delete File otherwise Delete Files */}
            {selectedItems.length > 1 ? `Delete Files` : "Delete File"}
          </button>
        </>
      ) : (
        <p className="text-2xl font-semibold text-yellow-50">Showcase</p>
      )}
    </div>
  );
};

export default Header;
