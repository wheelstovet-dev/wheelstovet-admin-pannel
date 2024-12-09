import Image from "next/image";
import cat_loader from '@/public/images/cat_loader.gif'
// import cat_loader from '@/public/images/dog_loader.gif'


export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <Image
          src={cat_loader}
          alt="Loading..."
          className="w-30 h-30 mx-auto"
        />
        <h1 className="text-center font-bold text-4xl  text-gray-700">Loading...</h1>
      </div>
    </div>
  );
}
