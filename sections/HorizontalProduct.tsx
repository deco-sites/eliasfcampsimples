import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import LikeBtn from "../islands/LikeBtn.tsx";
import { productFlag } from "../flags/productFlag.ts";
import { useOffer } from "../sdk/useOffer.ts";

export interface Props {
  title: string;
  products?: productFlag
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
  products,
  title,
}: Props) {
  if (!products) {
    return <LoadingFallback />;
  }

  console.log(products);

  function formatCurrency(amount: number, prefix = "R$ ") {
    const value = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
      .format(amount)
      .replace(/R\$\s{1}/g, prefix);
    return value;
  }

  return (
    <div className="max-w-5xl container relative mt-5 mt-5">
      <div className="flex flex-row items-center justify-center text-center mt-4 mb-4">
        <h1 className="text-2xl font-light leading-8 lg:leading-10 text-base-content lg:text-3xl">{title}</h1>
      </div>
      
      {products?.map((product) => {
        const productID = product.productID;
        const imageUrl = product.image;
        const productName = product.name;
        const productDescription = product.description;
        const productUrl = product.url;
        
        const { listPrice, price } = useOffer(product.offers);
        return (
          <div className="flex flex-row gap-4 overflow-x-auto gap-4 lg:gap-8 p-10 md:p-5 bg-white rounded-md mt-2 mb-2 relative">
          <div className="flex flex-col w-full md:w-1/2 items-center">
            <div className="overflow-hidden md:h-52">
              <Image
                className={`w-full h-full hover:scale-110 object-cover transition-transform duration-300 ease-in-out`}
                src={imageUrl[0].url}
                alt={productName}
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="flex flex-col w-full lg:flex-row md:w-1/2 lg:w-2/3 relative">
            <div className="flex flex-col gap-2 w-full lg:w-1/2 content-center items-start">
              <h1 className="text-lg lg:text-xl font-bold">{productName}</h1>
              <p className="text-base-content line-clamp-4">{productDescription}</p>
            </div>
            <div className="flex flex-col gap-2 w-full lg:w-1/2 content-center relative items-start">
              {!!listPrice && <s>{formatCurrency(listPrice)}</s>}

              {!!price && (
                <span className="text-gray-900 font-bold text-center text-xl">
                  {formatCurrency(price)}
                </span>
              )}
              <a
                href={productUrl}
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-primary hover:bg-secondary text-white border font-bold p-2 rounded h-7 btn no-animatio mt-4 md:mt-0">
                  Adicionar ao carrinho
                </button>
              </a>
            </div>
          </div>
          <div className="flex justify-end absolute right-5 top-5">
            <LikeBtn productId={productID} />
          </div>
        </div>
        )})}
      </div>
  );
}
