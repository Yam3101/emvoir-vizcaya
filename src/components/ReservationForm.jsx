import React, { useState } from "react";
import travelOptions from "../components/json/TravelOptions.json";
import { Link } from "react-router-dom";

const ReservationForm = () => {
	const [departureDate, setDepartureDate] = useState("");
	const [returnDate, setReturnDate] = useState("");
	const [passengers, setPassengers] = useState(1);
	const [travelClass, setTravelClass] = useState("Económica");
	const [showModal, setShowModal] = useState(false);
	const [options, setOptions] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [confirmedDestination, setConfirmedDestination] = useState("");

	const countries = [
		{ name: "México", flag: "🇲🇽" },
		{ name: "Estados Unidos", flag: "🇺🇸" },
		{ name: "Canadá", flag: "🇨🇦" },
		{ name: "Francia", flag: "🇫🇷" },
		{ name: "Italia", flag: "🇮🇹" },
		{ name: "Japón", flag: "🇯🇵" },
		{ name: "Reino Unido", flag: "🇬🇧" },
		{ name: "Australia", flag: "🇦🇺" },
		{ name: "Argentina", flag: "🇦🇷" },
		{ name: "Brasil", flag: "🇧🇷" },
	];

	const travelClasses = ["Económica", "Premium", "Negocios", "Primera Clase"];

	const handleSearch = () => {
		if (!selectedCountry || !departureDate || !passengers || !travelClass) {
			setShowAlert(true);
			setTimeout(() => setShowAlert(false), 3000);
			return;
		}

		const filteredOptions = travelOptions.filter((option) =>
			option.country.toLowerCase().includes(selectedCountry.toLowerCase()),
		);
		setOptions(filteredOptions);
		setShowModal(true);
	};

	const handleConfirm = (option) => {
		setConfirmedDestination(option.destination);
		setShowConfirmationModal(true);
		setShowModal(false);
	};

	const closeConfirmationModal = () => {
		setShowConfirmationModal(false);
	};

	return (
		<div className="py-4 md:h-96 flex flex-col justify-end">
			{/* Formulario de reservas */}
			<div className="bg-white py-6 px-8 md:px-8 rounded-lg shadow-md flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 items-end">
				{/* Selección de país */}
				<div className="w-full md:flex-1">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Destino
					</label>
					<select
						className="w-full p-2 border border-gray-300 rounded-md"
						value={selectedCountry}
						onChange={(e) => setSelectedCountry(e.target.value)}
					>
						<option value="">Selecciona un destino</option>
						{countries.map((country, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<option key={index} value={country.name}>
								{country.flag} {country.name}
							</option>
						))}
					</select>
				</div>

				{/* Fechas de salida y regreso */}
				<div className="w-full md:w-auto">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Salida
					</label>
					<input
						type="date"
						className="w-full p-2 border border-gray-300 rounded-md"
						value={departureDate}
						onChange={(e) => setDepartureDate(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-auto">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Regreso
					</label>
					<input
						type="date"
						className="w-full p-2 border border-gray-300 rounded-md"
						value={returnDate}
						onChange={(e) => setReturnDate(e.target.value)}
					/>
				</div>

				{/* Pasajeros y clase de viaje */}
				<div className="w-full md:w-24">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Pasajeros
					</label>
					<input
						type="number"
						min="1"
						max="10"
						className="w-full p-2 border border-gray-300 rounded-md"
						value={passengers}
						onChange={(e) => setPassengers(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-32">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Clase
					</label>
					<select
						className="w-full p-2 border border-gray-300 rounded-md"
						value={travelClass}
						onChange={(e) => setTravelClass(e.target.value)}
					>
						{travelClasses.map((cls, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<option key={index} value={cls}>
								{cls}
							</option>
						))}
					</select>
				</div>

				{/* Botón de búsqueda */}
				<button
					type="button"
					className="w-full md:w-auto bg-sky-800 text-white p-2 rounded-md hover:bg-sky-950 duration-200"
					onClick={handleSearch}
				>
					Buscar
				</button>
			</div>

			{/* Alerta de campos incompletos */}
			{showAlert && (
				<div className="fixed bottom-4 right-4 bg-rose-700 text-white p-4 rounded-lg shadow-lg opacity-animated-2">
					Por favor, completa todos los campos obligatorios.
				</div>
			)}

			{/* Modal de opciones de viaje */}
			{showModal && (
				<div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4">
					<div className="bg-stone-200 rounded-md shadow-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto opacity-animated-1">
						<h2 className="text-xl text-white font-bold p-5 bg-sky-950 sticky top-0">
							VUELOS DISPONIBLES
						</h2>
						<div className="p-4 space-y-4">
							{options.length > 0 ? (
								options.map((option, index) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<div key={index} className="rounded-lg bg-white p-4">
										<h3 className="font-bold text-xl">
											{option.destination}, {option.country}
										</h3>
										<p className="text-sm text-gray-600">
											Aerolínea: {option.airline}
										</p>
										<p className="text-sm text-gray-600">
											Horario: {option.departureTime} - {option.arrivalTime}
										</p>
										<div className="hidden sm:flex flex-col">
											<p className="text-sm text-gray-600">
												Escalas:{" "}
												{option.stops === 0
													? "Directo"
													: `${option.stops} escalas`}
											</p>
											<p className="text-sm text-gray-600">
												Duración: {option.duration}
											</p>
											<p className="text-sm text-gray-600">
												Equipaje: {option.baggage}
											</p>
										</div>
										<div className="sm:hidden flex">
											<details>
												<summary className="text-sm text-gray-600 cursor-pointer">
													Detalles del vuelo
												</summary>
												<p className="text-sm text-gray-600">
													Escalas:{" "}
													{option.stops === 0
														? "Directo"
														: `${option.stops} escalas`}
												</p>
												<p className="text-sm text-gray-600">
													Duración: {option.duration}
												</p>
												<p className="text-sm text-gray-600">
													Equipaje: {option.baggage}
												</p>
											</details>
										</div>
										<div className="flex justify-end items-center mt-4 gap-4">
											<div className="flex flex-col text-right space-y-[-5px]">
												<p className="text-sm text-gray-500">
													{option.costUSD}USD
												</p>
												<p className="font-semibold text-lg">
													{option.costMXN}MXN
												</p>
											</div>
											<button
												type="button"
												className="bg-sky-700 text-white py-2 px-3 rounded-sm hover:bg-sky-900 duration-200"
												onClick={() => handleConfirm(option)}
											>
												Reservar vuelo
											</button>
										</div>
									</div>
								))
							) : (
								<p className="text-center text-gray-600">
									No se encontraron vuelos para este destino.
								</p>
							)}
						</div>
						<button
							type="button"
							className="bg-rose-600 text-white py-2 px-4 m-4 rounded-md hover:bg-rose-700 duration-200"
							onClick={() => setShowModal(false)}
						>
							Cancelar
						</button>
					</div>
				</div>
			)}

			{/* Modal de confirmación */}
			{showConfirmationModal && (
				<div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4">
					<div className="flex flex-col dmsans justify-between items-center bg-white p-6 rounded-md shadow-lg w-full max-w-md opacity-animated-2">
						<h2 className="text-xl font-bold mb-4">Reserva Confirmada</h2>
						<p className="mb-4">
							¡Tu vuelo a{" "}
							<strong className="teachers uppercase">
								{confirmedDestination}
							</strong>{" "}
							ha sido reservado!
						</p>
						<p className="mb-4 text-sm">
							Para más información sobre los detalles de tu reservaciones y
							vuelos contactenos en{" "}
							<Link to="/" className="text-cyan-900 underline">
								Atención al cliente
							</Link>
						</p>
						<button
							type="button"
							className="w-full bg-slate-800 text-white p-2 rounded-sm hover:bg-slate-900	 duration-200"
							onClick={closeConfirmationModal}
						>
							Hecho
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReservationForm;
