"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircleIcon } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PaymentPage = ({ username }: { username: string }) => {
  const { toast } = useToast();

  const { data: session, status } = useSession();

  const userEmailforSession = session?.user?.email;
  console.log(userEmailforSession)
  console.log(username)
  // const username = session?.user?.name;
  const [paymentValue, setPaymentValue] = useState(0);
  const [userEmail, setUserEmail] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [donorName, setDonorName] = useState("");
  const [coverImage, setCoverImage] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [paymentUser, setPaymentUser] = useState<{
    message: string;
    amount: number;
    to_username: string;
    map: (items:any) => JSX.Element;
  }>();
  const [isLoading, setIsLoading] = useState(true);

  // const users = [
  //   { username: "johnDoe", id: 1, payment: 1000 },
  //   { username: "janeDoe", id: 2, payment: 2000 },
  //   { username: "bobSmith", id: 3, payment: 3000 },
  //   { username: "aliceJohnson", id: 4, payment: 4000 },
  //   { username: "mikeDavis", id: 5, payment: 5000 },
  // ];
  // fetch donor list
  useEffect(() => {
    const handleUserList = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post("/api/pay-user-list", { username: userEmailforSession });
        const data = response.data;
       
        setPaymentUser(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    handleUserList();
  }, [session?.user?.email]);
  const handleUserList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/pay-user-list", { username: userEmailforSession });
      const data = response.data;
     
      setPaymentUser(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const getDataUser = async () => {
         const response = await axios.post("/api/get-user-data", { username});
       const data = response.data
       
       setProfileImage(data.publicPicture)
       setCoverImage(data.coverPicture)
      }
       getDataUser();

    } catch (error) {
      console.log(error);
    }
  }, [])

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/payment-user", {
        amount: paymentValue,
        recipient_email: userEmail || (session?.user?.email as string),
        donor_email: donorEmail,
        donor_name: donorName,
        message,
      });

      const data = response.data;
      if (data.url) {
        window.location.href = data.url;
        toast({
          title: "Success",
          description: "Payment page redirect",
        });
      }

      // const stripe = await stripePromise;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response.data.message as string,
        variant: "destructive",
      });
    }
  };
  if (status === "loading" ) {
    return   <div className="h-80 w-full flex items-center justify-center">
    <LoaderCircleIcon className="animate-spin flex items-center justify-center w-16 h-16 " />
  </div>
  }
  return (
    <>
      <div className="cover w-full relative text-black">
        <img
          className="w-full h-[350px] object-cover"
          src={coverImage}
          alt=""
        />
        <div className="absolute -bottom-[13%] right-[46%] border-[1px] border-black rounded-full">
          <img
            src={profileImage}
            className="rounded-full"
            alt="logo"
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-col gap-2 my-12">
        <div className="font-bold text-xl text-center">@{username}</div>
        <div className="text-sm font-light text-gray-600">
          We are building a funding app for content creators.
        </div>
        <div className="text-sm text-gray-600">
          9000 members . 200 posts . $15,430/release
        </div>
        <div className=" flex gap-4 text-black w-[80%] mt-6 ">
          <Button onClick={handleUserList}> Click</Button>
          <div className="suppoter  w-1/2 p-10">
            <h1 className="text-2xl font-bold py-4 uppercase">Suppoters </h1>
            {isLoading ? (
              <div className="h-80 w-full flex items-center justify-center">
                <LoaderCircleIcon className="animate-spin flex items-center justify-center w-16 h-16 " />
              </div>
            ) : (
              <ul>
                {paymentUser?.map(
                  (items:any,index: number) => (
                    <div key={index}>
                      <div className="flex items-center justify-between">
                        <div>
                          <li className="py-4 flex gap-2 items-center">
                            <FaRegUserCircle className="w-6 h-6" /> {items.to_username
                            } <span className="border-r border-black w-1 h-5"></span><span>{items.message.split(" ").slice(0, 4).join(" ")}</span>
                          </li>
                        </div>
                        <div><span className="border-r border-black w-1 h-5 mr-2"></span><b>$</b> {items.amount}</div>
                      </div>
                      <div className="border-b border-black"></div>
                    </div>
                  )
                )}
              </ul>
            )}
          </div>
          <div className=" w-1/2 p-10">
            <h1 className="text-2xl uppercase font-bold py-4">
              Make a Payment
            </h1>
            <div className="flex flex-col gap-3">
              {/* create a three input filed first payment amount second username third email and then make a Button */}
              <Input
                onChange={(e) => setDonorName(e.target.value)}
                value={donorName}
                type="text"
                placeholder="Enter Your Name"
                className="p-3 rounded-md"
              />
              <Input
                onChange={(e) => setDonorEmail(e.target.value)}
                value={donorEmail}
                type="text"
                placeholder="Enter Your Email"
                className="p-3 rounded-md"
              />
              <Input
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail || (userEmailforSession as string)}
                type="text"
                disabled={userEmailforSession ? true : false}
                placeholder="Enter Your recipient Email"
                className="p-3 rounded-md"
              />
              <Input
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                type="text"
                placeholder="Message (optional)"
                className="p-3 rounded-md"
              />
              <Input
                id="amount"
                onChange={(e) => setPaymentValue(Number(e.target.value))}
                // value={paymentForm?.amount === null ? undefined : Number(paymentForm?.amount)}
                value={paymentValue}
                type="number"
                placeholder="Amount"
                className="p-3 rounded-md"
              />
              <Button
                className="text-white bg-black hover:bg-slate-800 p-3 rounded-md shadow-xl font-bold"
                onClick={handlePayment}
              >
                Make a Payment
              </Button>
            </div>
            {/* choose for this amount create a button */}
            <div className="flex  gap-3 mt-4">
              <Button
                value={10}
                onClick={(e) => setPaymentValue(10)}
                className="text-white bg-black hover:bg-slate-800 p-3 rounded-md shadow-xl font-bold px-4 py-2"
              >
                10$
              </Button>
              <Button
                value={20}
                onClick={(e) => setPaymentValue(20)}
                className="text-white bg-black hover:bg-slate-800 p-3 rounded-md shadow-xl font-bold px-4 py-2"
              >
                20$
              </Button>
              <Button
                value={30}
                onClick={(e) => setPaymentValue(30)}
                className="text-white bg-black hover:bg-slate-800 p-3 rounded-md shadow-xl font-bold px-4 py-2"
              >
                30$
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
