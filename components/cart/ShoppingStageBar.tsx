import { cn } from "@/lib/utils";
import {
  Check,
  CreditCard,
  LocateFixedIcon,
  ShoppingBasket,
} from "lucide-react";
import React from "react";
import { Progress } from "@/components/ui/progress";

const stages = [
  { id: 1, label: "سبد خرید", icon: ShoppingBasket },
  { id: 2, label: "آدرس", icon: LocateFixedIcon },
  { id: 3, label: "پرداخت", icon: CreditCard },
  { id: 4, label: "وضعیت", icon: Check },
];

interface Props {
  activeStage: number;
}

const ShoppingStageBar: React.FC<Props> = ({ activeStage }) => {
  const progressValue =
    ((stages.length - activeStage) / (stages.length - 1)) * 100;

  return (
    <aside className="w-full h-full flex flex-col justify-center items-center py-6">
      <div className="w-3/5 flex flex-row-reverse justify-between items-center relative">
        {stages.map(({ id, label, icon: Icon }) => (
          <div key={id} className="flex flex-col items-center z-10">
            <div
              className={cn(
                "rounded-full w-16 h-16 flex justify-center items-center transition-all",
                activeStage >= id || id === 1
                  ? "bg-secondary text-white"
                  : "bg-gray-300 text-gray-700"
              )}
            >
              <Icon />
            </div>
            <span
              className={cn(
                "mt-2",
                activeStage >= id || id === 1
                  ? "text-secondary"
                  : " text-gray-700"
              )}
            >
              {label}
            </span>
          </div>
        ))}

        <div className="absolute top-9 left-0 w-full -translate-y-1/2">
          <Progress value={progressValue} className="h-2 bg-secondary" />
        </div>
      </div>
    </aside>
  );
};

export default ShoppingStageBar;
