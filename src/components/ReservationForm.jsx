import React, { useState } from "react";
import travelOptions from "./travelOptions.json";

const ReservationForm = () => {
	const [arrival, setArrival] = useState("");
	const [departure, setDeparture] = useState("");
	const [guests, setGuests] = useState(2);
	const [rooms, setRooms] = useState(1);
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

	const handleSearch = () => {
		if (!selectedCountry || !arrival || !departure || !guests || !rooms) {
			setShowAlert(true);
			setTimeout(() => setShowAlert(false), 3000); // Oculta la alerta después de 3 segundos
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
		<div className="py-4">
			<div className="bg-white py-6 px-8 rounded-lg shadow-md flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-end">
				<div className="w-full md:flex-1 flex flex-wrap items-center">
					<label className="block text-sm font-medium text-gray-700">
						País
					</label>
					<select
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						value={selectedCountry}
						onChange={(e) => setSelectedCountry(e.target.value)}
					>
						<option value="">Selecciona un país</option>
						{countries.map((country, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<option key={index} value={country.name}>
								{country.flag} {country.name}
							</option>
						))}
					</select>
				</div>
				<div className="w-full md:w-auto">
					<label className="block text-sm font-medium text-gray-700">
						Llegada
					</label>
					<input
						type="date"
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						value={arrival}
						onChange={(e) => setArrival(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-auto">
					<label className="block text-sm font-medium text-gray-700">
						Salida
					</label>
					<input
						type="date"
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						value={departure}
						onChange={(e) => setDeparture(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-24">
					<label className="block text-sm font-medium text-gray-700">
						Huéspedes
					</label>
					<input
						type="number"
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						value={guests}
						onChange={(e) => setGuests(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-24">
					<label className="block text-sm font-medium text-gray-700">
						Habitaciones
					</label>
					<input
						type="number"
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						value={rooms}
						onChange={(e) => setRooms(e.target.value)}
					/>
				</div>
				<button
					type="button"
					className="w-full md:w-auto hover:bg-sky-950 bg-sky-800 text-white p-2 rounded-md duration-200"
					onClick={handleSearch}
				>
					Buscar
				</button>
			</div>

			{showAlert && (
				<div className="fixed bottom-4 right-4 bg-rose-700 text-white p-4 rounded-lg shadow-lg">
					Por favor, completa todos los campos.
				</div>
			)}

			{showModal && (
				<div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 opacity-animated">
					<div className="bg-white rounded-md shadow-lg md:w-3/5 max-h-[80vh] overflow-y-auto opacity-animated-1">
						<h2 className="text-xl text-white font-bold p-6 bg-sky-950 sticky top-0">
							DESTINOS DISPONIBLES
						</h2>
						<div className="p-6 flex flex-col gap-2">
							{options.length > 0 ? (
								options.map((option, index) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={index}
										className="border-2 border-stone-300 rounded-lg p-4"
									>
										<div className="sm:flex hidden flex-col">
											<h3 className="font-bold text-2xl dmsans">
												{option.destination}, {option.country}
											</h3>
											<h4 className="text-[15px]">
												Tours y visitas en {option.tours.join(", ")}
											</h4>
											<h4 className="text-[15px]">
												Hospedaje: {option.hoteles.join(", ")}
											</h4>
											<h4 className="text-[15px]">
												Actividades: {option.actividades.join(", ")}
											</h4>
											<h4 className="text-[15px]">
												Servicios extra: {option.extras.join(", ")}
											</h4>
											<h4 className="text-sm text-stone-500">
												Vuelo: {option.flight}
											</h4>
										</div>
										{/* Section for phone user */}
										<div className="flex flex-col sm:hidden">
											<h3 className="font-bold text-2xl dmsans">
												{option.destination}, {option.country}
											</h3>
											<h4 className="text-[15px]">
												Tours y visitas en {option.tours.join(", ")}
											</h4>
											<h4 className="text-[15px]">
												Actividades: {option.actividades.join(", ")}
											</h4>
											<h4 className="text-[15px]">
												Hospedaje: {option.hoteles.join(", ")}
											</h4>
											<h4 className="text-[15px]">
												Servicios extra: {option.extras.join(", ")}
											</h4>
											<h4 className="text-sm text-stone-500">
												Vuelo: {option.flight}
											</h4>
										</div>
										<section className="flex flex-wrap items-center justify-end space-x-3">
											<h2>Desde:</h2>
											<div className="flex flex-col space-y-[-5px]">
												<h5 className="text-sm text-right text-sky-950 font-semibold">
													{option.costUSD}USD
												</h5>
												<h4 className="font-semibold text-xl">
													{option.costMXN}MXN
												</h4>
											</div>
											<button
												type="button"
												className="bg-sky-700 text-white py-2 px-4 rounded-sm hover:bg-sky-900 duration-200"
												onClick={() => handleConfirm(option)}
											>
												Reservar
											</button>
										</section>
									</div>
								))
							) : (
								<p>No se encontraron opciones para este destino.</p>
							)}
						</div>
						<button
							type="button"
							className="mx-6 mb-6 bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 duration-200"
							onClick={() => setShowModal(false)}
						>
							Cancelar
						</button>
					</div>
				</div>
			)}

			{showConfirmationModal && (
				<div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4">
					<div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 opacity-animated-1">
						<h2 className="text-xl font-bold mb-4">Reserva Confirmada</h2>
						<p>
							¡Tu reserva para <strong>{confirmedDestination}</strong> ha sido
							confirmada!
						</p>
						<button
							type="button"
							className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 duration-200"
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
