import { signal, useSignal } from "@preact/signals";
import Icon from "deco-sites/eliasfcampsimples/components/ui/Icon.tsx";
import { total } from "deco-sites/eliasfcampsimples/sdk/useTotalLikes.tsx";
import { invoke } from "deco-sites/eliasfcampsimples/runtime.ts";
import { useEffect } from "preact/hooks";

export interface Props {
  productId: string;
}

export default function LikeBtn({ productId }: Props) {
  const liked = useSignal(false);
  const quantity = useSignal(0);
  

  useEffect(() => {
    const updateTotals = async () => {
        const totalLikesProduct = await invoke["site"].loaders
        .totalLikesProduct({ productId });

        const totalLikes = await invoke["site"].loaders
        .totalLikes();

        total.value = totalLikes.total;

        quantity.value = totalLikesProduct.product;
    };

    updateTotals();
    setInterval(updateTotals, 30000);
  }, []);

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    liked.value = true;
    quantity.value += 1;

    const like = await invoke["site"].actions.sendLikes({
        productId: productId,
    });

    const totalLikes = await invoke["site"].loaders
      .totalLikes();

    total.value = totalLikes.total;

    quantity.value = like.product;
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={!liked.value ? "text-gray-500" : "text-green-500"}
      >
        {!liked.value
          ? <Icon id="MoodSmile" width={24} height={24} />
          : <Icon id="MoodCheck" width={24} height={24} />}
        <span className="text-black">{quantity.value}</span>
        <span className="sr-only"> {total}</span>
      </button>
    </>
  );
}