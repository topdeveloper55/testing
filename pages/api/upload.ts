import { withFileUpload, getConfig } from "next-multiparty";
import cloudinary from "cloudinary";
import { v2 as cloudinaryV2 } from "cloudinary";
export const config = getConfig();
cloudinaryV2.config({
  cloud_name: "dty3unqc4",
  api_key: "861635899182923",
  api_secret: "AbeXVaDia8dqjAzZ1_HLVhIMnyw",
});

const profilePictureUploadHandler = withFileUpload(async (req, res) => {
  try {
    const file = req.files[0].filepath;
    const uploadedResponse = await cloudinaryV2.uploader.upload(file, {
      upload_preset: "v249lw5k",
    });
	res.json({ url: uploadedResponse.secure_url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to upload avatar",
    });
  }
});

export default profilePictureUploadHandler;
