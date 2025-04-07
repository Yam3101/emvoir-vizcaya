import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaMailBulk } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-slate-900 text-slate-100 mt-12">
			<div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Columna 1 - Logo y redes */}
					<div className="sm:space-y-2 space-y-4">
						<div className="flex items-center space-x-2">
							<img
								src="./iconNoGroundW.svg"
								alt="Logo de la empresa"
								width={100}
							/>
							<span className="text-xl font-semibold">E&M Voir</span>
						</div>
						<p className="text-slate-300 text-sm">
							Encuentra las mejores ofertas de vuelos y vive experiencias
							inolvidables.
						</p>
						<div className="flex space-x-2">
							<FaFacebookSquare className="text-white" size={30} />
							<FaInstagram className="text-white" size={30} />
							<FaXTwitter className="text-white" size={30} />
						</div>
					</div>

					{/* Columna 2 - Enlaces rápidos */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
						<ul className="space-y-2 text-slate-300">
							<li>
								{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
								<a href="#" className="hover:text-white transition-colors">
									Inicio
								</a>
							</li>
							<li>
								{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
								<a href="#" className="hover:text-white transition-colors">
									Destinos
								</a>
							</li>
							<li>
								{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
								<a href="#" className="hover:text-white transition-colors">
									Ofertas
								</a>
							</li>
							<li>
								{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
								<a href="#" className="hover:text-white transition-colors">
									Blog de viajes
								</a>
							</li>
						</ul>
					</div>

					{/* Columna 3 - Contacto */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Contacto</h3>
						<address className="not-italic text-slate-300 space-y-2">
							<p>Av. Viajes 123, Riviera Maya</p>
							<p>Tel: 55 1234 5678</p>
							<p>Email: contact@EMVoir.com</p>
						</address>
					</div>

					{/* Columna 4 - Newsletter */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Suscríbete</h3>
						<p className="text-slate-300 mb-4 text-sm">
							Recibe nuestras mejores ofertas directamente en tu correo.
						</p>
						<form className="flex">
							<input
								type="email"
								placeholder="Tu correo"
								className="px-3 py-2 bg-slate-700 text-white rounded-l focus:outline-none focus:ring-1 focus:ring-slate-400 w-full"
							/>
							<button
								type="submit"
								className="bg-slate-800 hover:bg-slate-950 text-white px-4 py-2 rounded-r transition-colors"
							>
								<FaMailBulk />
							</button>
						</form>
					</div>
				</div>

				{/* División */}
				<div className="border-t border-slate-600 mt-8 pt-6">
					<div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
						<p>© 2025 E&M Voir. Todos los derechos reservados.</p>
						<div className="flex space-x-4 mt-4 md:mt-0">
							{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
							<a className="hover:text-slate-300 transition-colors">Términos</a>
							{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
							<a className="hover:text-slate-300 transition-colors">
								Privacidad
							</a>
							{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
							<a className="hover:text-slate-300 transition-colors">Cookies</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
