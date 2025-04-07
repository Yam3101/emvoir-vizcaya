import React, { useState } from "react";
import discountedFlights from "../components/json/discountedFlights.json";
import {
	FaPlane,
	FaCalendarAlt,
	FaClock,
	FaMoneyBillWave,
	FaTimes,
	FaCheckCircle,
} from "react-icons/fa";

const DiscountedFlights = () => {
	const [selectedFlight, setSelectedFlight] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [reservationData, setReservationData] = useState({
		name: "",
		email: "",
		passengers: 1,
	});

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString("es-ES", options);
	};

	const handleReservationClick = (flight) => {
		setSelectedFlight(flight);
		setShowModal(true);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setReservationData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmitReservation = (e) => {
		e.preventDefault();
		// Aquí iría la lógica para enviar la reserva
		console.log("Reserva enviada:", {
			flight: selectedFlight,
			userData: reservationData,
		});
		// Cerrar modal de reserva
		setShowModal(false);
		// Mostrar modal de confirmación
		setShowConfirmation(true);
		// Resetear datos del formulario
		setReservationData({
			name: "",
			email: "",
			passengers: 1,
		});
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 opacity-animated-1 bg-white">
			<h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
				Ofertas Especiales en Vuelos Internacionales
			</h2>
			<p className="text-lg text-center text-slate-600 mb-8">
				Reserva ahora y aprovecha estos descuentos exclusivos
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{discountedFlights.map((flight) => (
					<div
						key={flight.id}
						className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200"
					>
						<div className="bg-rose-600 text-white px-3 py-1 font-bold text-sm z-10 flex flex-wrap items-center">
							<FaMoneyBillWave className="inline mr-2" />-
							{flight.discountPercentage}% DE DESCUENTO
						</div>
						<div className="h-48">
							<img
								src={flight.image}
								className="w-full h-full object-cover"
								alt={flight.destination}
								loading="lazy"
							/>
						</div>

						<div className="p-4">
							<h3 className="text-xl font-semibold text-slate-800 mb-3">
								<FaPlane className="inline mr-2 text-slate-600" />
								{flight.destination}, {flight.country}
							</h3>

							<div className="space-y-2">
								<div className="flex items-center">
									<span className="text-slate-700 font-medium w-24">
										Aerolínea:
									</span>
									<span className="text-slate-500">
										{flight.airline} ({flight.flightNumber})
									</span>
								</div>
								<div className="flex items-center">
									<span className="text-slate-700 font-medium w-24">
										Horario:
									</span>
									<span className="text-slate-500">
										<FaClock className="inline mr-1" />
										{flight.departureTime} - {flight.arrivalTime}
									</span>
								</div>
								<div className="flex items-center">
									<span className="text-slate-700 font-medium w-24">
										Duración:
									</span>
									<span className="text-slate-500">{flight.duration}</span>
								</div>
							</div>

							<div className="bg-slate-50 p-3 rounded-lg my-4 border border-slate-200">
								<div className="mb-2">
									<span className="text-sm text-slate-500">
										Precio regular:
									</span>
									<div className="flex justify-between line-through text-slate-400">
										<span>${flight.regularPriceUSD} USD</span>
										<span>${flight.regularPriceMXN.toLocaleString()} MXN</span>
									</div>
								</div>

								<div>
									<span className="text-sm text-slate-500">
										Precio con descuento:
									</span>
									<div className="flex justify-between font-bold text-slate-800">
										<span>${flight.discountPriceUSD} USD</span>
										<span>${flight.discountPriceMXN.toLocaleString()} MXN</span>
									</div>
								</div>
							</div>

							<div className="bg-slate-100 text-slate-700 p-2 rounded text-center font-medium mb-4">
								<FaMoneyBillWave className="inline mr-2" />
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
							<button
								onClick={() => handleReservationClick(flight)}
								className="w-full bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded transition-colors duration-300 font-medium"
							>
								Reservar ahora
							</button>
							<div className="text-xs text-center text-slate-500 mt-2 flex flex-wrap items-center justify-center">
								<FaCalendarAlt className="inline mr-1" />
								Oferta válida hasta: {formatDate(flight.dealExpires)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Modal de Reserva */}
			{showModal && selectedFlight && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50 p-4">
					<div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
						<div className="p-6">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-2xl font-bold text-slate-800">
									Reservar vuelo a {selectedFlight.destination}
								</h2>
								{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
								<button
									onClick={() => setShowModal(false)}
									className="text-slate-500 hover:text-slate-700"
								>
									<FaTimes className="h-6 w-6" />
								</button>
							</div>

							<div className="mb-6">
								<div className="flex justify-between mb-2">
									<span className="text-slate-700">Aerolínea:</span>
									<span className="text-slate-600">
										{selectedFlight.airline}
									</span>
								</div>
								<div className="flex justify-between mb-2">
									<span className="text-slate-700">Precio con descuento:</span>
									<span className="text-slate-600">
										${selectedFlight.discountPriceUSD} USD / $
										{selectedFlight.discountPriceMXN.toLocaleString()} MXN
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-slate-700">Fecha límite oferta:</span>
									<span className="text-slate-600">
										{formatDate(selectedFlight.dealExpires)}
									</span>
								</div>
							</div>

							<form onSubmit={handleSubmitReservation}>
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-slate-700 mb-1">
											Nombre completo
										</label>
										<input
											type="text"
											name="name"
											value={reservationData.name}
											onChange={handleInputChange}
											className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-700 mb-1">
											Correo electrónico
										</label>
										<input
											type="email"
											name="email"
											value={reservationData.email}
											onChange={handleInputChange}
											className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-700 mb-1">
											Pasajeros
										</label>
										<select
											name="passengers"
											value={reservationData.passengers}
											onChange={handleInputChange}
											className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
										>
											{[1, 2, 3, 4, 5, 6].map((num) => (
												<option key={num} value={num}>
													{num} {num === 1 ? "pasajero" : "pasajeros"}
												</option>
											))}
										</select>
									</div>
								</div>

								<div className="mt-6 flex space-x-3">
									<button
										type="button"
										onClick={() => setShowModal(false)}
										className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 py-2 px-4 rounded-md transition-colors duration-300 font-medium"
									>
										Cancelar
									</button>
									<button
										type="submit"
										className="flex-1 bg-slate-700 hover:bg-slate-800 text-white py-2 px-4 rounded-md transition-colors duration-300 font-medium"
									>
										Confirmar Reserva
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}

			{/* Modal de Confirmación */}
			{showConfirmation && selectedFlight && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50 p-4">
					<div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
						<div className="p-6 text-center">
							<div className="flex justify-center mb-4">
								<FaCheckCircle className="h-16 w-16 text-green-500" />
							</div>
							<h2 className="text-2xl font-bold text-slate-800 mb-2">
								¡Reserva Confirmada!
							</h2>
							<p className="text-slate-600 mb-4">
								Tu vuelo a {selectedFlight.destination} ha sido reservado
								exitosamente.
							</p>
							<p className="text-slate-500 text-sm mb-6">
								Hemos enviado los detalles de tu reserva a{" "}
								{reservationData.email}
							</p>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={() => setShowConfirmation(false)}
								className="w-full bg-slate-700 hover:bg-slate-800 text-white py-2 px-4 rounded-md transition-colors duration-300 font-medium"
							>
								Aceptar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DiscountedFlights;
