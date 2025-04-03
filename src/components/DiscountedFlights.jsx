import React from "react";
import discountedFlights from "../components/json/discountedFlights.json";

const DiscountedFlights = () => {
	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString("es-ES", options);
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 opacity-animated-1">
			<h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
				Ofertas Especiales en Vuelos Internacionales
			</h2>
			<p className="text-lg text-center text-gray-600 mb-8">
				Reserva ahora y aprovecha estos descuentos exclusivos
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{discountedFlights.map((flight) => (
					<div
						key={flight.id}
						className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
					>
						<div className="relative h-48">
							<img
								src={`/images/${flight.image}`}
								alt={flight.destination}
								className="w-full h-full object-cover"
							/>
							<div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
								-{flight.discountPercentage}%
							</div>
						</div>

						<div className="p-4">
							<h3 className="text-xl font-semibold text-gray-800 mb-3">
								{flight.destination}, {flight.country}
							</h3>

							<div className="space-y-2 mb-4">
								<div className="flex justify-between">
									<span className="text-gray-600 font-medium">Aerolínea:</span>
									<span className="text-gray-800">
										{flight.airline} ({flight.flightNumber})
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 font-medium">Horario:</span>
									<span className="text-gray-800">
										{flight.departureTime} - {flight.arrivalTime}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 font-medium">Duración:</span>
									<span className="text-gray-800">{flight.duration}</span>
								</div>
							</div>

							<div className="bg-gray-50 p-3 rounded-lg mb-4">
								<div className="mb-2">
									<span className="text-sm text-gray-500">Precio regular:</span>
									<div className="flex justify-between line-through text-gray-400">
										<span>${flight.regularPriceUSD} USD</span>
										<span>${flight.regularPriceMXN.toLocaleString()} MXN</span>
									</div>
								</div>

								<div>
									<span className="text-sm text-gray-500">
										Precio con descuento:
									</span>
									<div className="flex justify-between font-bold text-red-500">
										<span>${flight.discountPriceUSD} USD</span>
										<span>${flight.discountPriceMXN.toLocaleString()} MXN</span>
									</div>
								</div>
							</div>

							<div className="bg-blue-50 text-blue-600 p-2 rounded text-center font-medium mb-4">
								Ahorras: ${flight.regularPriceUSD - flight.discountPriceUSD} USD
								($
								{(
									flight.regularPriceMXN - flight.discountPriceMXN
								).toLocaleString()}{" "}
								MXN)
							</div>
						</div>

						<div className="px-4 pb-4">
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-300 font-medium">
								Reservar ahora
							</button>
							<div className="text-xs text-center text-gray-500 mt-2">
								Oferta válida hasta: {formatDate(flight.dealExpires)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default DiscountedFlights;
