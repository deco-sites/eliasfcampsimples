import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";


export interface Props {
  title: string;
  images: ImageWidget[];
  quantity: number;
}

export default function PartialImageGallery({
  images,
  quantity,
  title,
}: Props) {
  return (
    <div className="pt-3 pb-3">
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
        {images.slice(0, quantity).map((image, index) => {
          return (
            <div className="w-40 md:w-72 flex justify-center items-center overflow-hidden rounded md:rounded-xl duration-300 hover:scale-110">
              <Image
                src={image}
                alt={image}
                width={304}
                height={200}
                preload
                loading="eager"
                fetchPriority="high"
              />
            </div>
          );
        })}
      </div>

      {quantity < images.length && (
        <div className="flex justify-center items-center">
          <button
            className="btn btn-primary m-3"
            {...usePartialSection({
              mode: "replace",
              props: { quantity: quantity + 1 },
            })}
          >
            Ver mais
          </button>
        </div>
      )}
    </div>
  );
}
