// src/utils/driveHelper.ts

export const getDirectDriveUrl = (
  url: string,
  type: "image" | "video" = "image",
) => {
  if (!url) return "";

  // 1. Check if it is actually a Google Drive link
  if (!url.includes("drive.google.com")) return url;

  // 2. Extract the File ID
  // Matches /d/FILE_ID/ or id=FILE_ID
  const idMatch = url.match(/\/d\/(.*?)\/|id=(.*?)(&|$)/);
  const fileId = idMatch ? idMatch[1] || idMatch[2] : null;

  if (!fileId) return url;

  // 3. Return the correct format based on type
  if (type === "video") {
    // Returns a clean video player URL for iframes
    return `https://drive.google.com/file/d/${fileId}/preview`;
  } else {
    // Returns a direct image download URL for <Image /> tags
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
};
