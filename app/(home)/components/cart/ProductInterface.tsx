// "use client";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Trash } from "lucide-react";
// import React, { useState } from "react";
// import ItemCounter from "./ItemCounter";
// import { z } from "zod";
// import { insertBookSchema } from "@/db/schema/book/book";

// type Book = z.infer<typeof insertBookSchema>;

// interface Props {
//   book: Book[];
// }

// const ProductInterface: React.FC<Props> = ({ book }) => {
//   const [itemCount, setItemCount] = useState<number>(0);

//   const handleCount = (count: number) => {
//     setItemCount(count);
//   };

//   return (
//     <section className="w-full h-2/3 flex flex-col">
//       <div className="w-full h-2/3  flex flex-row-reverse justify-end items-center">
//         <div className="w-2/3 h-full flex flex-row-reverse mr-5">
//           <div className="w-1/3  flex justify-end rounded-sm">
//             <Skeleton className="w-full h-full" />
//           </div>
//           <div className="w-1/3 flex justify-end mr-2">
//             <div className="flex flex-col">
//               <p>title</p>
//               <p>desc</p>
//             </div>
//           </div>
//         </div>
//         <div className="w-1/3"></div>
//         <div className="w-1/3 flex justify-end">
//           <div className="flex flex-row-reverse items-baseline gap-2">
//             <div>price</div>
//             <div>
//   <ItemCounter counter={handleCount} />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-full h-1/3 flex justify-center items-end ">
//         <Button variant={"destructive"}>
//           <Trash />
//           حذف همه
//         </Button>
//       </div>
//     </section>
//   );
// };

// export default ProductInterface;
"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import ItemCounter from "./ItemCounter";
import { z } from "zod";
import { insertBookSchema } from "@/db/schema/book/book";

type Book = z.infer<typeof insertBookSchema>;

interface Props {
  book: Book[];
}

const ProductInterface: React.FC<Props> = ({ book }) => {
  const [itemCount, setItemCount] = useState<number>(0);

  const handleCount = (count: number) => {
    setItemCount(count);
  };
  return (
    <section className="w-full h-2/3 flex flex-col">
      {book.length === 0 ? (
        <p className="text-center text-gray-500">هیچ کتابی یافت نشد</p>
      ) : (
        book.map((b) => (
          <div
            key={b.id}
            className="w-full h-2/3 flex flex-row-reverse justify-end items-center border-b py-2"
          >
            {/* Book Info */}
            <div className="w-2/3 h-full flex flex-row-reverse mr-5">
              {/* Book Image */}
              <div className="w-[200px] h-full flex justify-end rounded-sm">
                <Skeleton className="w-full h-full" />
              </div>
              {/* Title & Description */}
              <div className="w-1/3 flex justify-end mr-2">
                <div className="flex flex-col">
                  <p className="font-semibold text-right">{b.title}</p>
                  <p className="text-gray-500 text-sm text-right">
                    {b.description}
                  </p>
                </div>
              </div>
            </div>
            {/* Price & Counter */}
            <div className="w-1/3 flex justify-end">
              <div className="flex flex-row-reverse items-baseline gap-2">
                <div className="font-bold">{b.price} تومان</div>
                <div>
                  <ItemCounter counter={handleCount} />
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Delete All Button */}
      {book.length > 0 && (
        <div className="w-full h-1/3 flex justify-center items-end my-10">
          <Button variant={"destructive"}>
            <Trash />
            حذف همه
          </Button>
        </div>
      )}
    </section>
  );
};

export default ProductInterface;
