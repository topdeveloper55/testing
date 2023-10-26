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
  // TODO: ensure the form is typesafe
  const form = useForm<ProfileFormData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UPDATE_PROFILE_FORM_SCHEMA),
  });
  const [error, setError] = useState([]);
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);
  const updateProfile = form.handleSubmit(async (formData) => {
    setLoading(true);
    setError([]);
    setFileError("");
    try {
      const avatarUrl = await uploadAvatar(formData.avatar[0]);
      if (avatarUrl !== "") {
        const updatedProfile = {
          name: formData.name,
          avatar: avatarUrl,
          description: formData.description,
        };
        try {
          UPDATE_PROFILE_FORM_SCHEMA.parse(updatedProfile);
          // TODO: submit the updated profile data to the server
          const response = await axios.post("/api/update", {
            updatedProfile,
          });
          props.getProfileInfo();
          setLoading(false);
        } catch (error: any) {
          const errorMessages = error.errors.map((err: any) => err.message);
          setError(errorMessages);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  });

  const uploadAvatar = async (avatar: File): Promise<string> => {
    const data = { imageFile: avatar };
    try {
      UPDATE_PROFILE_FORM_SCHEMA.parse(data);
      // TODO: submit the updated profile data to the server
      const formData = new FormData();
      formData.append("avatar", avatar);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw "Failed to upload avatar";
      }
      const { url } = await response.json();
      return url;
    } catch (error: any) {
      setFileError(error);
      setLoading(false);
      // const errorMessages = error.errors.map((err: any) => err.message);
      // console.log(errorMessages);
      // setError(errorMessages);
      return "";
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
          <div className="mb-2">
            {error
              ? error.map((item, index) => <p key={index}>{item}</p>)
              : null}
            {fileError ? <p>{fileError}</p> : null}
          </div>
          <Button type="submit">
            {loading ? (
              <>
                <div>
                  <video
                    src="/loading.mp4"
                    className="w-[30px]"
                    autoPlay
                    muted
                    loop
                  ></video>
                </div>
              </>
            ) : (
              <>
                Update Profile
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
