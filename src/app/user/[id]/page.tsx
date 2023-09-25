import CreatedPins from "@/components/CreatedPins";
import SavedPins from "@/components/SavedPins";
import fetchData from "@/lib/fetch-data";
import { Pin, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const getUserData = async (id: string) => {
  const data = await fetchData(`/user/${id}`, "GET");

  return data;
};

const UserPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { variant } = searchParams;

  const {
    user,
    createdPins,
    savedPins,
  }: { user: User; createdPins: Pin[]; savedPins: Pin[] } = await getUserData(
    params.id
  );

  return (
    <div className='px-5 py-10'>
      <div className='flex flex-col items-center justify-center gap-3'>
        <Image
          src={user.image as string}
          alt='user-img'
          width={60}
          height={60}
          className='rounded-full'
        />
        <h2 className='text-xl font-bold'>{user.name}</h2>
        <p className='text-gray-400'>@{user.email?.split("@")[0]}</p>
      </div>
      <div className='flex gap-3 items-center justify-center mt-20 font-semibold'>
        <Link
          href={`/user/${user.id}?variant=created`}
          className={`${
            variant === "created" && "border-b-2 border-red-600 rounded-none"
          } p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md`}
        >
          Created
        </Link>
        <Link
          href={`/user/${user.id}?variant=saved`}
          className={`${
            variant === "saved" && "border-b-2 border-red-600 rounded-none"
          } p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md`}
        >
          Saved
        </Link>
      </div>
      {variant === "created" && <CreatedPins createdPins={createdPins} />}
      {variant === "saved" && <SavedPins savedPins={savedPins} />}
    </div>
  );
};

export default UserPage;
