import { Pin } from "@prisma/client";
import { Pin as PinComponent } from ".";

const SavedPins = ({ savedPins }: { savedPins: Pin[] }) => {
  return (
    <div className='masonry-layout py-3 mt-3'>
      {savedPins.map((pin) => (
        <PinComponent pin={pin} />
      ))}
    </div>
  );
};

export default SavedPins;
