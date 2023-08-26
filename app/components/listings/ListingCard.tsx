"use client";
import { SafeListing, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = " ",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endData);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
     col-span-1
     cursor-pointer
     group
    "
    >
      <div
        className="
       flex 
       flex-col
       gap-2
       w-full
       mt-10
       md:-mb-12
      "
      >
        <div
          className="
      aspect-square
      w-full
      relative
      overflow-hidden
      rounded-xl
      "
        >
          <Image
            fill
            src={data.imageSrc}
            alt="Listing"
            className="
         object-cover
         h-full
         w-full
         group-hover:scale-110
         transition
        "
          />
          <div
            className="
         absolute
         top-3
         right-3
        "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div
          className="font-semibold text-lg text-center
           justify-center"
        >
          {location?.region} {location?.label}
        </div>
        <div
          className="
         font-light 
         text-neutral-500
         text-center
        justify-center
        "
        >
          {reservationDate || data.category}
        </div>
        <div
          className="
         flex
         flex-row
         items-center
         gap-1
         text-center
        justify-center
        "
        >
          <div
            className="
           font-semibold
           text-center
           justify-center
          "
          >
            ${price}
          </div>
          {!reservation && <div className="font-light">Night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;