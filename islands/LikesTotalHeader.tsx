import Icon from "deco-sites/eliasfcampsimples/components/ui/Icon.tsx";
import { total } from "deco-sites/eliasfcampsimples/sdk/useTotalLikes.tsx";

function VoteTotalsHeader() {
return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 min-w-12 sm:min-w-14 relative">
        <Icon id="Friends" width={24} height={24} />
        <span className="absolute flex justify-center w-6 h-6 top-2.5 right-0 bg-white rounded-full shadow-sm p-1">
            <span className="text-xs font-thin">{total.value}</span>
        </span>
    </div>
);
}

export default VoteTotalsHeader;