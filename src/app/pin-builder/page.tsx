"use client";

import { Loader } from "@/components";
import cloudinaryUpload from "@/lib/cloudinary-upload";
import getImageSize from "@/lib/get-image-size";
import { UploadCloud, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

const PinBuilder = () => {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState("");
  const [imgHeight, setImgHeight] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [pinData, setPinData] = useState({
    title: "",
    description: "",
    destination: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.item(0);
    const fileReader = new FileReader();
    if (imgFile) {
      fileReader.readAsDataURL(imgFile);
      fileReader.onload = (ev) => {
        setImgUrl(ev.target?.result as string);
      };
      setFile(imgFile);
    }
  };

  const handlePinDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPinData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (pinData.title && pinData.description && imgUrl) {
        const imageUrl = file ? await cloudinaryUpload(file) : imgUrl;
        const res = await fetch("/api/pin", {
          method: "POST",
          body: JSON.stringify({
            title: pinData.title.toLowerCase(),
            description: pinData.description,
            destination: pinData.destination,
            tags,
            imageUrl,
            imageHeight: imgHeight,
            imageWidth: imgWidth,
            userId: session?.user.id,
          }),
        });

        const data = await res.json();
        toast.success(data);
      } else {
        toast.error("Make sure you fill all fields!");
      }
    } catch (error) {
      toast.error("Something went Wrong, failed to create pin!");
    } finally {
      setIsLoading(false);
      setPinData({
        title: "",
        description: "",
        destination: "",
      });
      setImgUrl("");
      setTag("");
      setTags([]);
    }
  };

  if (!session?.user) {
  }

  useEffect(() => {
    if (imgUrl) {
      getImageSize(imgUrl, setImgHeight, setImgWidth);
    }
  }, [imgUrl]);

  return (
    <div className='w-full h-screen bg-gray-200 dark:bg-gray-950 flex items-center justify-center'>
      <div className='w-full h-fit lg:w-3/5 p-5 bg-white dark:bg-gray-900 rounded-lg flex flex-col lg:flex-row gap-5'>
        <div className='flex-1'>
          <div className='w-full h-[450px] bg-gray-100 dark:bg-gray-800 p-3 rounded-lg'>
            <div className='w-full h-full rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-900 flex items-center justify-center'>
              {imgUrl ? (
                <div className='relative w-full h-full'>
                  <Image
                    src={imgUrl}
                    alt='pin-img'
                    fill
                    className='object-contain'
                  />
                  <button
                    onClick={() => setImgUrl("")}
                    className='absolute top-2 right-2 p-2 rounded-full text-gray-400 bg-gray-200 dark:bg-gray-900'
                  >
                    <X />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className='flex flex-col justify-center items-center text-gray-500 w-full h-full'
                >
                  <UploadCloud />
                  Click to upload
                </button>
              )}
            </div>
          </div>
          <input
            type='url'
            onChange={(e) => setImgUrl(e.target.value)}
            value={imgUrl}
            placeholder='add image url'
            className='mt-3 w-full rounded-full outline-none border-none py-2 px-3 bg-gray-100 dark:bg-gray-800'
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className='w-full lg:w-3/5 flex flex-col lg:pr-5'
        >
          <input
            type='file'
            onChange={handleFileChange}
            hidden
            ref={fileInputRef}
            accept='image/*'
          />
          <input
            type='text'
            placeholder='Add title'
            className='create-input text-3xl font-bold p-2 lg:mt-5'
            name='title'
            onChange={handlePinDataChange}
            value={pinData.title}
          />
          <div className='flex items-center gap-3 my-10 px-3'>
            <Image
              src={session?.user.image as string}
              alt='user-img'
              width={40}
              height={40}
              className='rounded-full'
            />
            <p>{session?.user.name}</p>
          </div>
          <input
            type='text'
            placeholder='Tell people what your pin is about'
            className='create-input text-basis p-2'
            name='description'
            onChange={handlePinDataChange}
            value={pinData.description}
          />
          <div className='mt-10'>
            <div className='flex flex-wrap gap-2 items-center'>
              {tags.map((tag) => (
                <div className='flex text-sm capitalize items-center gap-2 py-1 px-3 rounded-full text-white bg-red-400'>
                  {tag}
                  <button
                    onClick={() =>
                      setTags(tags.filter((oldTag) => oldTag !== tag))
                    }
                    className=''
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
            <input
              type='text'
              onChange={(e) => setTag(e.target.value)}
              value={tag}
              placeholder='Add tag'
              className='create-input mt-2'
            />
            <button
              type='button'
              className='mt-3 text-white bg-red-600 hover:bg-red-500 rounded-full px-3 py-1'
              onClick={() =>
                setTags((prevTags) => [...prevTags, tag.toLowerCase()])
              }
            >
              Add
            </button>
          </div>
          <input
            type='url'
            placeholder='Add destination link'
            className='create-input text-basis p-2 lg:mt-auto'
            name='destination'
            onChange={handlePinDataChange}
            value={pinData.destination}
          />
          <button type='reset' hidden></button>
          <button
            disabled={isLoading}
            className='px-5 py-2 mt-3 ml-auto disabled:bg-red-400 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center gap-2'
          >
            {isLoading && <Loader />}
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default PinBuilder;
