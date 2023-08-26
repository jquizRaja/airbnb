"use client";
import React from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavourite from "../hooks/useFavourite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavourited, toggeleFavourited } = useFavourite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggeleFavourited}
      className="
    relative
    hover:opacity-80
    transition
    cursor-pointer
    "
    >
      <AiOutlineHeart
        size={28}
        className="
        fill-white
        absolute
        -top-[2px]
        -right-[2px]
       "
      />
      <AiFillHeart
        size={26}
        className={hasFavourited ? "fill-orange-500" : "fill-black"}
      />
    </div>
  );
};

export default HeartButton;
