export interface CouponProps {
  text: string;
  coupon: string;
}

const Coupon = ({ text, coupon }: CouponProps) => {
  return (
    <section class="bg-base-100">
      <div class="xl:container xl:mx-auto mx-5 md:mx-10 py-10 md:py-24">
        <div class="flex flex-col gap-6 items-center text-center">
          <h1 class="font-bold text-base-content text-[40px] leading-[120%]">
            {text}
          </h1>
          <p class="text-base-content text-[18px]">{coupon}</p>
        </div>
      </div>
    </section>
  );
};

export default Coupon;
