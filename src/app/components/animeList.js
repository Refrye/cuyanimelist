import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ title, images, id }) => {
  return (
    <Link href={`/anime/${id}`}>
      <div className="bg-yellow-500 rounded-lg shadow-md p-4 m-2 text-center cursor-pointer hover:scale-105 transition-transform duration-300">
        <Image 
          src={images} 
          alt={title} 
          width={200} 
          height={300} 
          className="mx-auto rounded"
        />
        <h2 className="mt-2 md:text-xl text-white font-semibold">{title}</h2>
      </div>
    </Link>
  );
};

export default AnimeList;
