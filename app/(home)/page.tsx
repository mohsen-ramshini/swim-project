"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/admin");
    console.log("clicked");
  };
  return (
    <div>
      <div>Home Page</div>
      <Button onClick={handleClick}>Admin Section</Button>
    </div>
  );
};

export default page;
