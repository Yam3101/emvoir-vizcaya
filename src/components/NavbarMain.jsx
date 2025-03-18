import { useState } from "react";
import { Link } from "react-router-dom";

const NavbarMain = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="bg-gray-900 text-white p-4">
			<section className="flex justify-between items-center">
				<Link to="/">
					<h1 className="text-2xl dmsans font-semibold tracking-wider animation-opacity1">
						<span className="tracking-wide">
							E<span className="text-xl">&</span>M
						</span>{" "}
						VOIR
					</h1>
				</Link>
				<section className="hidden sm:flex gap-2">
					<Link to="/" className="hover:text-stone-200">
						HOTELES
					</Link>
					<Link to="/" className="hover:text-stone-200">
						OFERTAS
					</Link>
					<Link to="/" className="hover:text-stone-200">
						RENTA DE AUTOS
					</Link>
					<Link to="/" className="hover:text-stone-200">
						TOURS
					</Link>
					<Link to="/" className="hover:text-stone-200">
						CONTACTANOS
					</Link>
				</section>
				<button
					className="md:hidden text-xl font-semibold"
					type="button"
					onClick={() => setIsOpen(!isOpen)}
				>
					☰
				</button>
				{isOpen && (
					<section className="bg-black/90 h-screen w-screen fixed top-0 left-0 flex justify-center items-start">
						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							className="absolute top-4 right-4 font-black text-white text-xl"
						>
							⛌
						</button>
						<div className="flex flex-col justify-start items-center bg-gray-900 w-72  mt-12">
							<Link
								to="/"
								className="text-center py-4 flex justify-center items-center w-full hover:bg-stone-950"
							>
								HOTELES
							</Link>

							<Link
								to="/"
								className="text-center py-4 flex justify-center items-center w-full hover:bg-stone-950"
							>
								OFERTAS
							</Link>
							<Link
								to="/"
								className="text-center py-4 flex justify-center items-center w-full hover:bg-stone-950"
							>
								RENTA DE AUTOS
							</Link>
							<Link
								to="/"
								className="text-center py-4 flex justify-center items-center w-full hover:bg-stone-950"
							>
								TOURS
							</Link>
							<Link
								to="/"
								className="text-center py-4 flex justify-center items-center w-full hover:bg-stone-950"
							>
								CONTACTANOS
							</Link>
						</div>
					</section>
				)}
			</section>
		</nav>
	);
};

export default NavbarMain;
