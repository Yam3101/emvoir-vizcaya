import NavbarMain from "./components/NavbarMain";
import ReservationForm from "./components/ReservationForm";

const HomePage = () => {
	return (
		<main className="w-screen h-screen overflow-x-hidden flex flex-col">
			<NavbarMain />
			<h1 className="text-red-600">Welcome to the HomePage</h1>
			<ReservationForm />
		</main>
	);
};

export default HomePage;
