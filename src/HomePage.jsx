import NavbarMain from "./components/NavbarMain";
import ReservationForm from "./components/ReservationForm";
import HotelCard from "./components/HotelCard";
import DiscountedFlights from "./components/DiscountedFlights";
import Footer from "./components/Footer";

const HomePage = () => {
	return (
		<main className="w-screen h-screen overflow-x-hidden flex flex-col bg-slate-100">
			<NavbarMain />
			<section className="flex flex-col items-center justify-end bg-stone-950">
				<ReservationForm />
			</section>
			<HotelCard />
			<DiscountedFlights />
			<Footer />
		</main>
	);
};

export default HomePage;
