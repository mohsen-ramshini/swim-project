import React from "react";
import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";

const LoadingComponent = () => {
  return (
    <div className="mx-auto lg:w-[1080px] my-10">
      <Card className="border-none">
        <CardContent>
          <div className="h-[500px] w-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingComponent;
