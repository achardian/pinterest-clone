import { Pin as PinComponent } from "@/components";
import fetchData from "@/lib/fetch-data";
import { Pin } from "@prisma/client";

const getPins = async () => {
  const data = await fetchData("/pins", "GET");
  return data;
};

const Home = async () => {
  const pins: Pin[] = await getPins();

  return (
    <div className='columns-2 gap-8 space-y-5 md:columns-3 lg:columns-4 xl:columns-5 px-5 pb-5 mt-3'>
      {pins && pins.map((pin) => <PinComponent key={pin.id} pin={pin} />)}
    </div>
  );
};

export default Home;
