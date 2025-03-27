import NavbarMain from "./components/NavbarMain";
import ReservationForm from "./components/ReservationForm";
import HotelCard from "./components/HotelCard";

const HomePage = () => {
	return (
		<main className="w-screen h-screen overflow-x-hidden flex flex-col">
			<NavbarMain />
			<section className="flex flex-col items-center justify-end bg-stone-950 h-2/3">
				<ReservationForm />
			</section>
			<HotelCard />
		</main>
	);
};

export default HomePage;
