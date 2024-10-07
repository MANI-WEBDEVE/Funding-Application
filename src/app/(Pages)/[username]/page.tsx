"use client";
import PaymentPage from "@/components/PaymentPage";

import React from "react";
const page = ({ params }: { params: { username: string } }): JSX.Element => {
  

  return (
    <>
     <PaymentPage username={params.username} />
    </>
  );
};

export default page;
{/* <FaRegUserCircle /> */}