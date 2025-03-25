import NavbarMain from "./components/NavbarMain";
import ReservationForm from "./components/ReservationForm";

const HomePage = () => {
	return (
		<main className="w-screen h-screen overflow-x-hidden flex flex-col">
			<NavbarMain />
			<section className="flex flex-col items-center justify-end bg-stone-950 h-2/3">
				<h1 className="text-2xl text-white dmsans font-semibold tracking-wider animation-opacity1">
					<span className="tracking-wide">
						E<span className="text-xl">&</span>M
					</span>{" "}
					VOIR
				</h1>
				<ReservationForm />
			</section>
		</main>
	);
};

export default HomePage;
