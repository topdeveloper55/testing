import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UPDATE_PROFILE_FORM_SCHEMA,
  UPDATE_PROFILE_TRPC_SCHEMA,
} from "../lib/validation-schemas/profile";
import axios from "axios";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
interface ProfileFormData {
  name: string;
  avatar: FileList;
  description: string;
}
export function ProfileForm(props: any) {
  const [error, setError] = useState("");
  // TODO: ensure the form is typesafe
  const form = useForm<ProfileFormData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UPDATE_PROFILE_FORM_SCHEMA),
  });

  const updateProfile = form.handleSubmit(async (formData) => {
    if (formData.name.length < 8 || formData.name.length > 24)
      setError("Input correct name");
    else if (
      formData.description.length < 5 ||
      formData.description.length > 256
    )
      setError("Input correct bio");
    else {
      try {
        const avatarUrl = await uploadAvatar(formData.avatar[0]);
        const updatedProfile = {
          name: formData.name,
          avatar: avatarUrl,
          description: formData.description,
        };

        // TODO: submit the updated profile data to the server
        const response = await axios.post("/api/update", {
          updatedProfile,
        });
        console.log("response---->", response);
        props.getProfileInfo();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const uploadAvatar = async (avatar: File): Promise<string> => {
    console.log("avatar--->", avatar.size);
    if (avatar.size > 1 * 1024 * 1024) {
      setError("your avatar size is big");
      return "";
    } else {
      const formData = new FormData();
      formData.append("avatar", avatar);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload avatar");
      }
      const { url } = await response.json();
      return url;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={updateProfile}
        className="space-y-8 max-w-md w-full border rounded-md px-8 py-10"
      >
        <h2 className="text-xl">Profile form</h2>

        <Input id="name" {...form.register("name")}></Input>

        <Input id="avatar" type={"file"} {...form.register("avatar")}></Input>

        <Textarea id="description" {...form.register("description")}></Textarea>
        <div className="flex flex-col">
          <Label className="mb-2 text-red-700">{error}</Label>
          <Button type="submit">Update Profile</Button>
        </div>
      </form>
    </Form>
  );
}
