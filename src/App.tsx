import { useState } from "react";
import {
  DndContext,
  useSensor,
  PointerSensor,
  useSensors,
  KeyboardSensor,
  TouchSensor,
  closestCenter,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import "./App.css";

import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { IImageGallery } from "./interfaces/global.types";
import { initialImageData } from "./data/data";
import ImageCard from "./components/cards/ImageCard";

function App() {
  const [activeItem, setActiveItem] = useState<IImageGallery | null>(null);
  const [galleryData, setGalleryData] = useState(initialImageData);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  const handleDragStart = (e: DragStartEvent) => {
    const { id } = e.active;

    if (!id) return;

    // current item
    const currentItem = galleryData.find((item) => item.id === id);

    setActiveItem(currentItem || null);
  };
  const handleDragEnd = (e: DragEndEvent) => {
    setActiveItem(null);

    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setGalleryData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSelected = () => {};

  return (
    <div className="min-h-screen">
      <div className="container flex flex-col items-center">
        <div className="grid max-w-5xl my-8 bg-white divide-y rounded-lg shadow">
          <header className="text-2xl to-slate-800">ShowCase</header>

          {/* dnd context */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
          <div className="grid grid-cols-2 gap-8 p-8 md:grid-cols-5">
            <SortableContext
              items={galleryData}
              strategy={rectSwappingStrategy}
            >
              {galleryData.map((imageItem) => {
                return (
                  <ImageCard
                    key={imageItem.id}
                    id={imageItem.id}
                    isSelected={imageItem.isSelected}
                    slug={imageItem.slug}
                    onclick={handleSelected}
                  />
                );
              })}
            </SortableContext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
