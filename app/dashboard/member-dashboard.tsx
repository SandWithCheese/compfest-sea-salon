import { ReservationDetails } from "@/types/reservation";
import { Session } from "next-auth";
import ReservationCard from "./reservation-card";
import Link from "next/link";
import AccountDetails from "./account-details";

function MemberDashboard({
  currentReservations,
  pastReservations,
  session,
}: {
  currentReservations: ReservationDetails | null;
  pastReservations: ReservationDetails | null;
  session: Session;
}) {
  return (
    <main className="flex min-h-[calc(100vh-97px)] flex-col gap-8 px-6 py-12 sm:px-16">
      <h1 className="font-belleza text-5xl" data-aos="fade-up">
        Hello, {session.name}!
      </h1>

      <div className="flex flex-col gap-8">
        {/* Current Reservations */}
        <section className="flex flex-col gap-4" data-aos="fade-up">
          <div className="flex items-baseline justify-between">
            <p className="font-belleza text-2xl">Your Reservations</p>
            <Link
              href="/dashboard/reservations?page=1"
              className="hover:underline"
            >
              View All
            </Link>
          </div>

          {currentReservations && currentReservations.length > 0 ? (
            <ReservationCard reservations={currentReservations} />
          ) : (
            <p>You have no current reservations.</p>
          )}
        </section>

        {/* Past Reservations */}
        <section className="flex flex-col gap-4" data-aos="fade-up">
          <div className="flex items-baseline justify-between">
            <p className="font-belleza text-2xl">Your History</p>
            <Link href="/dashboard/history?page=1" className="hover:underline">
              View All
            </Link>
          </div>

          {pastReservations && pastReservations.length > 0 ? (
            <ReservationCard reservations={pastReservations} />
          ) : (
            <p>You have no past reservations.</p>
          )}
        </section>

        {/* Account Details */}
        <section className="flex flex-col gap-8" data-aos="fade-up">
          <AccountDetails session={session} />
        </section>
      </div>
    </main>
  );
}

export default MemberDashboard;
