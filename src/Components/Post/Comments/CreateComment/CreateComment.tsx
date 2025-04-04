import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { FormEventHandler, ReactEventHandler } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePost } from "../../../../store/PostContext";
import { useTheme } from "../../../../store/themeContext";
type createCommentProps = {
  userProfileImage: string | null;
  postID: number;
};

const CreateComment = ({ userProfileImage, postID }: createCommentProps) => {
  //   const { data: createCommentData, isLoading: isCreatingComment } = useQuery({
  //     queryKey: ["comment"],
  //     queryFn: async () => {
  //       const CreatedComment = await createComment(postID,register);
  //       return CreatedComment;
  //     },
  //   });
  const { createComment } = usePost();
  type commentType = {
    comment_content: string;
  };
  const commentSchema = z.object({
    comment_content: z.string().min(1),
  });
  const { register, handleSubmit } = useForm<commentType>({
    resolver: zodResolver(commentSchema),
  });
  const onCreateComment = async (data: commentType) => {
    const CreateComment = await createComment(postID, data);
    console.log(data);
    return CreateComment;
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(onCreateComment)();
    }
  };
  const { theme } = useTheme();
  const inputTextStyle = {
    backgroundColor: "inherit", // Dark background
    color: "white", // White text
    border: "1px solid #34495e", // Border color
    borderRadius: "4px", // Rounded corners // Padding inside the input
    padding: "2px",
    outline: "none", // Remove default outline
    width: "100%", // Full width
  };

  // Additional sx prop styles for Material-UI specific customization
  const textFieldSx = {
    "& .MuiInputBase-root": {
      color: "white", // Text color inside the input
    },
    "& .MuiFilledInput-root": {
      backgroundColor: "#2c3e50", // Background color for filled variant
    },
    "& .MuiFilledInput-underline:before": {
      borderBottom: "1px solid #34495e", // Bottom border color before focus
    },
    "& .MuiFilledInput-underline:after": {
      borderBottom: `2px solid ${theme === "dark" ? "white" : "black"}`, // Bottom border color after focus
    },
    "& .MuiInputLabel-root": {
      color: "#95a5a6", // Label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#1abc9c", // Label color when focused
    },
  };
  return (
    <div>
      <div className="row-[3/4] flex items-center bg-inherit ">
        <picture className="size-10 overflow-hidden rounded-full">
          <img className="h-full w-full" src={userProfileImage} alt="" />
        </picture>
        <form
          className={`p-2 ${theme === "dark" ? "text-white" : "text-black"}`}
          onSubmit={handleSubmit(onCreateComment)}
        >
          <TextField
            variant="filled"
            type="text"
            {...register("comment_content")}
            onKeyDown={handleKeyPress}
            // className="h-5/6 rounded-md border border-slate-500 text-white"
            placeholder="Write your comment..."
            name="comment_content"
            style={inputTextStyle}
            size="small"
            sx={textFieldSx}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
