import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Star } from "lucide-react";

import { ReviewWithUser } from "@/types/reviews";

function ReviewsCard({ review }: { review: ReviewWithUser }) {
  return (
    <Card className="rounded-3xl" data-aos="fade-up">
      <CardHeader>
        <CardTitle>{review.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{review.comment}</p>
      </CardContent>
      <CardFooter>
        <p className="flex items-center gap-2">
          Rating:{" "}
          <span className="flex gap-1">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} size={18} className="fill-primary text-primary" />
            ))}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}

export default ReviewsCard;
