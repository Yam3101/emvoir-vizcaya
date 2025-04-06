import { useState } from "react";
import Yatas from "../components/json/Yatas.json";
import OptionsFlight from "../components/OptionsFlight";

const ReservationForm = () => {
	const [originCountry, setOriginCountry] = useState("");
	const [destinationCountry, setDestinationCountry] = useState("");
	const [origin, setOrigin] = useState("");
	const [destination, setDestination] = useState("");
	const [departureDate, setDepartureDate] = useState("");
	const [returnDate, setReturnDate] = useState("");
	const [isRoundTrip, setIsRoundTrip] = useState(true);
	const [showOptions, setShowOptions] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			origin &&
			destination &&
			departureDate &&
			(isRoundTrip ? returnDate : true)
		) {
			setShowOptions(true);
		}
	};

	// Get unique countries for dropdowns
	const countries = [
		...new Set(Yatas.airports.map((airport) => airport.country)),
	];

	// Filter airports by selected country
	const originAirports = originCountry
		? Yatas.airports.filter((airport) => airport.country === originCountry)
		: Yatas.airports;

	const destinationAirports = destinationCountry
		? Yatas.airports.filter(
				(airport) =>
					airport.country === destinationCountry && airport.yata !== origin,
			)
		: Yatas.airports.filter((airport) => airport.yata !== origin);

	return (
		<div className="bg-white text-slate-800 p-6 rounded-lg max-w-4xl mx-6 my-3 md:mx-auto border border-slate-200">
			<h2 className="text-2xl font-bold mb-6 text-slate-800">
				Reserva tu vuelo
			</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="originCountry"
							className="block text-sm font-medium text-slate-700 mb-1"
						>
							País de origen
						</label>
						<select
							id="originCountry"
							value={originCountry}
							onChange={(e) => {
								setOriginCountry(e.target.value);
								setOrigin(""); // Reset origin when country changes
							}}
							className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
						>
							<option value="">Todos los países</option>
							{countries.map((country) => (
								<option key={`country-origin-${country}`} value={country}>
									{country}
								</option>
							))}
						</select>
					</div>

					<div>
						<label
							htmlFor="destinationCountry"
							className="block text-sm font-medium text-slate-700 mb-1"
						>
							País de destino
						</label>
						<select
							id="destinationCountry"
							value={destinationCountry}
							onChange={(e) => {
								setDestinationCountry(e.target.value);
								setDestination(""); // Reset destination when country changes
							}}
							className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
						>
							<option value="">Todos los países</option>
							{countries.map((country) => (
								<option key={`country-dest-${country}`} value={country}>
									{country}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="origin"
							className="block text-sm font-medium text-slate-700 mb-1"
						>
							Origen
						</label>
						<select
							id="origin"
							value={origin}
							onChange={(e) => setOrigin(e.target.value)}
							className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
							required
						>
							<option value="">Selecciona un origen</option>
							{originAirports.map((airport) => (
								<option key={`origin-${airport.yata}`} value={airport.yata}>
									{airport.airport} ({airport.yata}) - {airport.city}
								</option>
							))}
						</select>
					</div>

					<div>
						<label
							htmlFor="destination"
							className="block text-sm font-medium text-slate-700 mb-1"
						>
							Destino
						</label>
						<select
							id="destination"
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
							className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
							required
							disabled={!origin}
						>
							<option value="">Selecciona un destino</option>
							{destinationAirports.map((airport) => (
								<option key={`dest-${airport.yata}`} value={airport.yata}>
									{airport.airport} ({airport.yata}) - {airport.city}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="departureDate"
							className="block text-sm font-medium text-slate-700 mb-1"
						>
							Fecha de salida
						</label>
						<input
							type="date"
							id="departureDate"
							value={departureDate}
							onChange={(e) => setDepartureDate(e.target.value)}
							className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
							required
						/>
					</div>

					{isRoundTrip && (
						<div>
							<label
								htmlFor="returnDate"
								className="block text-sm font-medium text-slate-700 mb-1"
							>
								Fecha de regreso
							</label>
							<input
								type="date"
								id="returnDate"
								value={returnDate}
								onChange={(e) => setReturnDate(e.target.value)}
								className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
								required={isRoundTrip}
								disabled={!isRoundTrip}
							/>
						</div>
					)}
				</div>

				<div className="flex items-center space-x-2">
					<input
						type="checkbox"
						id="roundTrip"
						checked={isRoundTrip}
						onChange={(e) => setIsRoundTrip(e.target.checked)}
						className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded"
					/>
					<label
						htmlFor="roundTrip"
						className="text-sm font-medium text-slate-700"
					>
						Viaje redondo
					</label>
				</div>

				<button
					type="submit"
					className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
				>
					Buscar vuelos
				</button>
			</form>

			{showOptions && (
				<OptionsFlight
					origin={origin}
					destination={destination}
					departureDate={departureDate}
					returnDate={returnDate}
					isRoundTrip={isRoundTrip}
					onClose={() => setShowOptions(false)}
				/>
			)}
		</div>
	);
};

export default ReservationForm;
