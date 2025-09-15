import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const AnimeList = ({ title, images, id }) => {
  return (
    <Link href={`/anime/${id}`}>
      <Card className="m-2 cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-300">
        <CardContent className="p-4 text-center">
          <Image
            src={images}
            alt={title}
            width={200}
            height={300}
            className="mx-auto rounded max-h-64 object-cover"
          />
          <h2 className="mt-2 md:text-xl font-semibold">{title}</h2>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AnimeList;
