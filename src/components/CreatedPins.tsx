import { Pin } from "@prisma/client";
import { Pin as PinComponent } from ".";

const CreatedPins = ({ createdPins }: { createdPins: Pin[] }) => {
  if (createdPins.length === 0) {
    return (
      <div className='w-full px-5 flex justify-center items-center mt-10 text-center'>
        <h2>
          There is nothing to display! Pin which you create will show up here.
        </h2>
      </div>
    );
  }

  return (
    <div className='masonry-layout py-3 mt-3'>
      {createdPins.map((pin) => (
        <PinComponent pin={pin} />
      ))}
    </div>
  );
};

export default CreatedPins;
