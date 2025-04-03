import React from "react";

const Footer = () => {
	return (
		<footer className="bg-slate-800 text-slate-100 mt-12">
			<div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Columna 1 - Logo y redes */}
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<img
								src="/images/logo.png"
								alt="Logo de la empresa"
								className="h-10 w-auto"
							/>
							<span className="text-xl font-semibold">TravelPlus</span>
						</div>
						<p className="text-slate-300 text-sm">
							Encuentra las mejores ofertas de vuelos y vive experiencias
							inolvidables.
						</p>
						<div className="flex space-x-4">
							<a
								// biome-ignore lint/a11y/useValidAnchor: <explanation>
								href="#"
								className="text-slate-300 hover:text-white transition-colors"
							>
								<img
									src="/icons/facebook.svg"
									alt="Facebook"
									className="h-6 w-6"
								/>
							</a>
							<a
								// biome-ignore lint/a11y/useValidAnchor: <explanation>
								href="#"
								className="text-slate-300 hover:text-white transition-colors"
							>
								<img
									src="/icons/twitter.svg"
									alt="Twitter"
									className="h-6 w-6"
								/>
							</a>
							<a
								// biome-ignore lint/a11y/useValidAnchor: <explanation>
								href="#"
								className="text-slate-300 hover:text-white transition-colors"
							>
								<img
									src="/icons/instagram.svg"
									alt="Instagram"
									className="h-6 w-6"
								/>
							</a>
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
							<p>Av. Viajes 123, CDMX</p>
							<p>Tel: 55 1234 5678</p>
							<p>Email: info@travelplus.com</p>
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
								className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-r transition-colors"
							>
								OK
							</button>
						</form>
					</div>
				</div>

				{/* División */}
				<div className="border-t border-slate-700 mt-8 pt-6">
					<div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
						<p>© 2025 TravelPlus. Todos los derechos reservados.</p>
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
