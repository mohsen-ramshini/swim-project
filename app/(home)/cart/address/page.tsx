import React from "react";
import ShoppingStageBar from "../../components/cart/ShoppingStageBar";

const page = () => {
  return (
    <section className="w-full h-screen my-10 flex flex-col justify-center items-center">
      <div className="w-full h-1/4">
        <ShoppingStageBar activeStage={2} />
      </div>
      <div className="bg-yellow-400 w-full h-2/4">box2</div>
      <div className="bg-green-500 w-full h-1/4">box3</div>
    </section>
  );
};

export default page;
