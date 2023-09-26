import { Pin as PinComponent } from "@/components";
import fetchData from "@/lib/fetch-data";
import { Pin } from "@prisma/client";

const getPinsBySearch = async (text: string) => {
  const data = await fetchData(`/search?query=${text}`, "GET");
  return data;
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { query } = searchParams;
  const pins: Pin[] = await getPinsBySearch(query as string);

  if (pins.length === 0 && query !== undefined) {
    return (
      <div className='w-full flex justify-center items-center text-center'>
        <h1 className='text-2xl font-bold mt-20'>
          Cannot find any pin that match with {query}!
        </h1>
      </div>
    );
  }

  return (
    <div className='masonry-layout'>
      {pins.map((pin) => (
        <PinComponent key={pin.id} pin={pin} />
      ))}
    </div>
  );
};

export default SearchPage;
