import { Pin } from "@prisma/client";
import { Pin as PinComponent } from ".";

const CreatedPins = ({ createdPins }: { createdPins: Pin[] }) => {
  return (
    <div className='masonry-layout py-3 mt-3'>
      {createdPins.map((pin) => (
        <PinComponent pin={pin} />
      ))}
    </div>
  );
};

export default CreatedPins;
