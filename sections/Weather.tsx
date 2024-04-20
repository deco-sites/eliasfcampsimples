import weather from "apps/weather/loaders/temperature.ts";
import type { SectionProps } from "deco/types.ts";

export interface Props {
  text: string;
  longitude: number;
  latitude: number;
}

export const loader = async (props: Props, req: Request) => {
  const { longitude, latitude } = props;
  const temperature = await weather({
    lat: latitude,
    long: longitude,
  }, req);
  return { ...props, temperature };
};

export default function localWeather(
  { text, temperature }: SectionProps<typeof loader>,
) {
  console.log(temperature);
  return (
    <div className="fixed bottom-4 right-4 w-auto h-auto">
      <div className="h-28 w-28 flex flex-col items-center justify-center rounded-full bg-secondary text-white">
        <h1 className="text-sm ">{text}</h1>
        <h2 className="text-xl font-bold">{temperature?.celsius} °C</h2>
      </div>
    </div>
  );
}
