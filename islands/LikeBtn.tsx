import { signal, useSignal } from "@preact/signals";

export interface Props {
  productId: string;
}

export default function LikeBtn({ productId }: Props) {
  const liked = useSignal(false);
  console.log(liked);

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    console.log(liked.value);
    liked.value = true;
  };

  return (
    <button
      class={`btn ${liked ? "btn-primary" : "btn-secondary"}`}
      onClick={handleClick}
    > teste
      {liked ? "Liked" : "Like"}
    </button>
  );
}



