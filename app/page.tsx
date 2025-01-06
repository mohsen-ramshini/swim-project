"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/admin");
  };
  return (
    <div>
      <Button onClick={handleClick}>Admin Section</Button>
      <div>Home Page</div>
    </div>
  );
};

export default page;
