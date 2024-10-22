"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
interface User {
  name: string;
  email: string;
  username: string;
  publicPicture: string;
  coverPicture: string;
  stripeId: string;
}

const Dashboard = (): JSX.Element => {
  const router = useRouter();
  const {toast} = useToast()
  const { data: session } = useSession();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    username: "",
    publicPicture: "",
    coverPicture: "",
    stripeId: "",
  });
  const [userInfo, setUserInfo] = useState<User>({
    name: "",
    email: "",
    username: "",
    publicPicture: "",
    coverPicture: "",
    stripeId: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const username: string = user.username;
  const oldUserName = session?.user?.name;
  const userEmail = session?.user?.email;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/update-user-profile", {
        newUsername: username,
        oldUserName,
        name: user.name,
        email: userEmail,
        publicPicture: user.publicPicture,
        coverPicture: user.coverPicture,
        stripeId: user.stripeId,
      });
      const data = response.data;

      toast({
        title: data.title,
        description: data.message
      })

      if (data.title === "Success") {
        router.push(`/${username}`)
      }
     
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response.data.message
      })
    }
  };

  useEffect(() => {
    const getDataUser = async () => {
      try {
        const response = await axios.post("/api/get-user-data", {
          username: oldUserName,
        });
        const data = response.data;
        setUserInfo({
          name: data?.name,
          username: data?.username,
          publicPicture: data?.publicPicture,
          coverPicture: data?.coverPicture,
          stripeId: data?.stripeId,
          email: data?.email, // Include email in case you want to use it elsewhere
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (oldUserName) {
      getDataUser();
    }
  }, [oldUserName]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-xl w-full max-w-lg flex flex-col space-y-4"
      >
        <Label>
          Name:
          <Input
            className="mt-2 w-full"
            type="text"
            name="name"
            value={user.name} // Updated: If user.name is not set, use userInfo.name
            onChange={handleChange}
          />
        </Label>

        <Label>
          Email:
          <Input
            className="mt-2 w-full"
            type="email"
            name="email"
            value={userEmail!} // Email is disabled, no changes needed
            disabled
          />
        </Label>

        <Label>
          Username:
          <Input
            className="mt-2 w-full"
            type="text"
            name="username"
            value={user.username } 
           
            // Updated: Default to userInfo.username
            onChange={handleChange}
          />
        </Label>

        <Label>
          Public Picture:
          <Input
            className="mt-2 w-full"
            type="text"
            name="publicPicture"
         
            value={user.publicPicture } // Updated: Default to userInfo.publicPicture
            onChange={handleChange}
          />
        </Label>

        <Label>
          Cover Picture:
          <Input
            className="mt-2 w-full"
            type="text"
            name="coverPicture"
           
            value={user.coverPicture } // Updated: Default to userInfo.coverPicture
            onChange={handleChange}
          />
        </Label>

        <Label>
          Stripe ID:
          <Input
            className="mt-2 w-full"
            type="text"
            name="stripeId"
        
            value={user.stripeId} // Updated: Default to userInfo.stripeId
            onChange={handleChange}
          />
        </Label>

        <Button className="mt-4 w-full" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Dashboard;
