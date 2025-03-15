import React from "react";

const CollaborationPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl  text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          فراخوان همکاری
        </h1>
        <p className="text-gray-600 mb-6 text-xl">
          جهت مشاوره در خصوص طراحی تمرین بدنسازی تغذیه و موضوعات مربوط به شنای
          همگانی و قهرمانی با این شماره تماس بگیرید
        </p>
        <div className="text-lg font-semibold text-gray-700">
          📞 شماره تماس{" "}
          <span className="text-blue-600 flex flex-col">0903-234-2677</span>
        </div>
      </div>
    </div>
  );
};

export default CollaborationPage;
