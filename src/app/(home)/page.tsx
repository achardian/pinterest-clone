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
    <div className='masonry-layout pb-5 mt-3'>
      {pins && pins.map((pin) => <PinComponent key={pin.id} pin={pin} />)}
    </div>
  );
};

export default Home;
