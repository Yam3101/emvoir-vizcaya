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
		<div className="py-4 px-10">
			<div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-end">
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
					className="w-full md:w-auto bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
					onClick={handleSearch}
				>
					Buscar
				</button>
			</div>

			{showAlert && (
				<div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
					Por favor, completa todos los campos.
				</div>
			)}

			{showModal && (
				<div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4">
					<div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 max-h-[80vh] overflow-y-auto">
						<h2 className="text-xl font-bold mb-4">Opciones de Viaje</h2>
						{options.length > 0 ? (
							options.map((option, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<div key={index} className="mb-4">
									<h3 className="font-semibold">
										{option.destination}, {option.country}
									</h3>
									<p>Costo: {option.cost}</p>
									<p>Vuelo: {option.flight}</p>
									<p>Tours: {option.tours.join(", ")}</p>
									<button
										type="button"
										className="mt-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
										onClick={() => handleConfirm(option)}
									>
										Confirmar Reserva
									</button>
								</div>
							))
						) : (
							<p>No se encontraron opciones para este destino.</p>
						)}
						<button
							type="button"
							className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
							onClick={() => setShowModal(false)}
						>
							Cerrar
						</button>
					</div>
				</div>
			)}

			{showConfirmationModal && (
				<div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4">
					<div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3">
						<h2 className="text-xl font-bold mb-4">Reserva Confirmada</h2>
						<p>
							Tu reserva para <strong>{confirmedDestination}</strong> ha sido
							confirmada.
						</p>
						<button
							type="button"
							className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
							onClick={closeConfirmationModal}
						>
							Cerrar
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReservationForm;
