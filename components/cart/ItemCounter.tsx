import { Button } from "@/components/ui/button";
import { Minus, Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface ItemCounterProps {
  counter: (count: number) => void;
}

const ItemCounter: React.FC<ItemCounterProps> = ({ counter }) => {
  const [count, setCount] = useState<number>(1);

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    counter(count);
  }, [count, counter]);

  return (
    <div className="flex flex-row-reverse items-center gap-2 border-2 rounded-sm p-5">
      <Button onClick={increaseCount}>+</Button>
      <span>{count}</span>
      <Button onClick={decreaseCount}>
        {count === 1 ? <Trash /> : <Minus />}
      </Button>
    </div>
  );
};

export default ItemCounter;
