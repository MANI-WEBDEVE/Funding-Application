"use client";
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
            value={user.name}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Email:
          <Input
            className="mt-2 w-full"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Username:
          <Input
            className="mt-2 w-full"
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Public Picture:
          <Input
            className="mt-2 w-full"
            type="text"
            name="publicPicture"
            value={user.publicPicture}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Cover Picture:
          <Input
            className="mt-2 w-full"
            type="text"
            name="coverPicture"
            value={user.coverPicture}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Stripe ID:
          <Input
            className="mt-2 w-full"
            type="text"
            name="stripeId"
            value={user.stripeId}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Stripe Secret:
          <Input
            className="mt-2 w-full"
            type="text"
            name="stripeSecret"
            value={user.stripeSecret}
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
