import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  name: string;
  description: string;
  image: ImageWidget;
  price: number;
  url: string;
}

export function ErrorFallback(error: Error) {
  return (
    <div className="w-full max-w-5xl flex sm:flex-col md:flex-row items-start md:items-center gap-6 my-12 p-6 rounded-xl mt-2 bg-red-200 mx-auto">
      <div className="w-full md:w-1/3 flex justify-center md:justify-start">
        <img
          src="/path/to/new/image.png"
          alt="New Image"
          className="w-48 md:w-48"
        />
      </div>
      <div className="w-full md:w-2/3 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="text-gray-900 font-bold">New Title</h2>
          <p className="mt-2 text-gray-600 text-sm line-clamp-4">
            New description text goes here.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <a href="/culturas">
            <button className="bg-blue-500 text-white border font-bold p-2 rounded h-7 btn no-animatio mt-4 md:mt-0">
              Learn more
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div className="text-center flex justify-center mt-6 mb-6">
      <h2>carregando...</h2>
      <span class="loading loading-spinner" />
    </div>
  );
}

export default function HorizontalProduct({
  name,
  description,
  image,
  price,
  url,
}: Props) {
return (
    <div className="max-w-screen-xl flex container gap-4 flex-row lg:gap-8 p-10 bg-white rounded-md mt-2 mb-2 items-center">
        <div className="flex flex-col flex-shrink-0 lg:w-1/3 items-center">
            <div className="overflow-hidden h-36 sm:h-48">
            <Image 
                className={`w-full h-full hover:scale-110 object-cover transition-transform duration-300 ease-in-out`} 
                src={image} 
                alt={name}
                width={100}
                height={100}
                />
            </div>

        </div>
        <div className="flex flex-col w-full lg:flex-row lg:w-2/3 items-center">
            <div className="flex flex-col gap-2 w-full lg:w-1/2 content-center">
                <h1 className="text-lg lg:text-xl font-bold">{name}</h1>
                <p className="text-base-content line-clamp-4">{description}</p>
            </div>
            <div className="flex flex-col gap-2 w-full lg:w-1/2 content-center">
                <h2 className="text-lg lg:text-xl font-bold">R${price}</h2>
                <a
                    href={url}
                    className="text-primary underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className="bg-primary text-white border font-bold p-2 rounded h-7 btn no-animatio mt-4 md:mt-0">
                        Adicionar ao carrinho
                    </button>
                </a>
            </div>
        </div>
    </div>
);
}