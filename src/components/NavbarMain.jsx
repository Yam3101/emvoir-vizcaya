import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { MdCorporateFare } from "react-icons/md";

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
				<section className="hidden sm:flex space-x-3">
					<Link to="/" className="hover:text-slate-300 tracking-tight">
						Acerca de Nosotros
					</Link>
					<Link to="/" className="hover:text-slate-300 tracking-tight">
						Contactanos
					</Link>
				</section>
				<section className="sm:hidden flex items-center space-x-3">
					<Link to="/" className="hover:text-slate-300 tracking-tight">
						<MdCorporateFare size={30} />
					</Link>
					<Link to="/" className="hover:text-slate-300 tracking-tight">
						<FaPhoneAlt size={20} />
					</Link>
				</section>
			</section>
		</nav>
	);
};

export default NavbarMain;
