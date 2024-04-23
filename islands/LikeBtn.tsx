import { signal, useSignal } from "@preact/signals";
import Icon from "deco-sites/eliasfcampsimples/components/ui/Icon.tsx";
import { total } from "deco-sites/eliasfcampsimples/sdk/useTotalLikes.tsx";
import { invoke } from "deco-sites/eliasfcampsimples/runtime.ts";
import { useEffect } from "preact/hooks";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { ComponentType } from "preact";
import { sendEvent } from "../sdk/analytics.tsx";

export interface Props {
  productId: string;
}

export default function LikeBtn({ productId }: Props) {
  const liked = useSignal(false);
  const quantity = useSignal(0);

  const Toast = ToastContainer as ComponentType;
  

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


    toast.success('Produto curtido!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
    });

    sendEvent({
      name: "post_score",
      params: {
        score: total,
        // level: 5,
        // character: productID,
      },
    });
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
      <Toast />
    </>
  );
}