import { ReservationDetails } from "@/types/reservation";
import ReservationDialog from "./reservation-dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

function ReservationCard({
  reservations,
}: {
  reservations: ReservationDetails;
}) {
  if (!reservations) {
    return <div>No reservations</div>;
  }

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {reservations.slice(0, 6).map((reservation) => (
            <CarouselItem
              key={reservation.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <ReservationDialog reservation={reservation} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default ReservationCard;
