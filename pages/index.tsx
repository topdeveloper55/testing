import React, { useState, useEffect } from "react";
import axios from "axios";
import { Profile } from "@/components/Profile";
import { ProfileForm } from "@/components/ProfileForm";
import { NextPage } from "next";

const ProfilePage: NextPage = () => {
  const [update, setUpdate] = useState({});
  const getProfileInfo = async () => {
    const response = await axios.post("/api/getProfileInfo");
    setUpdate(response.data);
  };
  useEffect(() => {
    getProfileInfo();
  }, []);
  return (
    <div className="mt-32 container space-x-8 flex justify-center mx-auto">
      <Profile update={update} />
      <ProfileForm getProfileInfo={getProfileInfo}/>
    </div>
  );
};

export default ProfilePage;
