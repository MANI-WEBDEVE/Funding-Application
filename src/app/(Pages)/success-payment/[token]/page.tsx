"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";

const page = ({ params }: { params: { token: string } }) => {
  const { toast } = useToast();
  const { data: session } = useSession();
    console.log(session)
  const handlePayment = async () => {
    try {
      const response = await axios.post("/api/success-pay", {
        token: params.token,
      });
      const userdata = await response.data;
      console.log(userdata);
      if (userdata) {
        toast({
          title: "Payment Success",
          description: userdata.message,
        });
        setTimeout(() => {
          window.location.href = `${process.env.NEXT_PUBLIC_URL}/${session?.user?.name}`
        }, 3000);
      } else {
        toast({
          title: "Payment Failed",
          description: userdata.message,
        });
      }
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <h1 className="text-3xl font-bold">Payment Success</h1>
      <Button onClick={handlePayment} className="mt-4 p-3">
        Click and Check Payment Success
      </Button>
    </div>
  );
};

export default page;
