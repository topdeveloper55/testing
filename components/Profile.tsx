import { trpc } from "@/lib/trpc";
import React, { useState, useEffect } from "react";
import { FC } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
export const Profile = (props: any) => {
  //const query = trpc.profile.getProfile.useQuery(); // TODO: fix the error
  //I have used this query in parent component(index.tsx)
  const query = trpc.profile.getProfile.useQuery();
  return (
    <div className="space-y-8 max-w-md w-full border rounded-md px-8 py-10">
      <h2 className="text-xl">Profile Info</h2>
      {props.status === false ? (
        <>
          <Avatar>
            <AvatarImage src={query.data?.avatar} alt="Avatar" />
          </Avatar>
          <div className="flex flex-col">
            <Label>{query.data?.name}</Label>
            <Label>{query.data?.description}</Label>
          </div>
        </>
      ) : (
        <>
          <Avatar>
            <AvatarImage src={props.update.avatar} alt="Avatar" />
          </Avatar>
          <div className="flex flex-col">
            <Label>{props.update.name}</Label>
            <Label>{props.update.description}</Label>
          </div>
        </>
      )}
    </div>
  );
};
