"use client"
import React, { ChangeEvent, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


interface User {
  name: string;
  email: string;
  username: string;
  publicPicture: string;
  coverPicture: string;
  stripeId: string;
  stripeSecret: string;
}


const Dashboard = (): JSX.Element => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    username: "",
    publicPicture: "",
    coverPicture: "",
    stripeId: "",
    stripeSecret: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div className="flex items-center justify-center flex-col ">
        
    <form onSubmit={handleSubmit} className="w-full flex items-center justify-center  flex-col">
      <Label>
        Name:
        <Input className="w-1/2 px-32" type="text" name="name" value={user.name} onChange={handleChange} />
      </Label>
      <br />
      <Label>
        Email:
        <Input className="w-1/2" type="email" name="email" value={user.email} onChange={handleChange} />
      </Label>
      <br />
      <Label>
        Username:
        <Input className="w-1/2" type="text" name="username" value={user.username} onChange={handleChange} />
      </Label>
      <br />
      <Label>
        Public Picture:
        <Input className="w-1/2" type="text" name="publicPicture" value={user.publicPicture} onChange={handleChange} />
      </Label>
      <br />
      <Label>
        Cover Picture:
        <Input className="w-1/2" type="text" name="coverPicture" value={user.coverPicture} onChange={handleChange} />
      </Label>
      <br />
      <Label>
        Stripe ID:
        <Input className="w-1/2" type="text" name="stripeId" value={user.stripeId} onChange={handleChange} />
      </Label>
      <br />
      <Label>
        Stripe Secret:
        <Input className="w-1/2" type="text" name="stripeSecret" value={user.stripeSecret} onChange={handleChange} />
      </Label>
      <br />
      <Button type="submit">Submit</Button>
    </form>
    </div>
  );
};

export default Dashboard;

