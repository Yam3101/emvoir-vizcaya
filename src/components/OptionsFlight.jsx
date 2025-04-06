import { useState, useEffect } from "react";
import Yatas from "../components/json/Yatas.json";

const OptionsFlight = ({
	origin,
	destination,
	departureDate,
	returnDate,
	isRoundTrip,
	onClose,
}) => {
	const [selectedFlight, setSelectedFlight] = useState(null);
	const [passengers, setPassengers] = useState(1);
	const [luggage, setLuggage] = useState(0);
	const [flightClass, setFlightClass] = useState("economy");
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [confirmationNumber, setConfirmationNumber] = useState("");
	const [seats, setSeats] = useState([]);
	const [showCurrency, setShowCurrency] = useState("USD");
	const exchangeRate = 17;

	const originAirport = Yatas.airports.find((a) => a.yata === origin);
	const destinationAirport = Yatas.airports.find((a) => a.yata === destination);

	const flights = [
		{
			id: 1,
			airline: "AeroGlobal",
			departureTime: "08:00",
			arrivalTime: "11:00",
			duration: "3h 0m",
			price: 350,
			luggagePrice: 25,
			availableSeats: 24,
		},
		{
			id: 2,
			airline: "SkyWings",
			departureTime: "12:30",
			arrivalTime: "15:45",
			duration: "3h 15m",
			price: 400,
			luggagePrice: 30,
			availableSeats: 12,
		},
		{
			id: 3,
			airline: "OceanAir",
			departureTime: "16:15",
			arrivalTime: "19:30",
			duration: "3h 15m",
			price: 380,
			luggagePrice: 20,
			availableSeats: 8,
		},
		{
			id: 4,
			airline: "GlobalConnect",
			departureTime: "20:00",
			arrivalTime: "23:15",
			duration: "3h 15m",
			price: 320,
			luggagePrice: 35,
			availableSeats: 16,
		},
	];

	const classMultipliers = {
		economy: 1,
		business: 2.5,
		first: 4,
	};

	const convertToMXN = (usdAmount) => {
		return Math.round(usdAmount * exchangeRate);
	};

	const formatPrice = (usdAmount) => {
		if (showCurrency === "USD") {
			return `$${usdAmount} USD`;
			// biome-ignore lint/style/noUselessElse: <explanation>
		} else {
			return `$${convertToMXN(usdAmount)} MXN`;
		}
	};

	const calculateTotalPrice = () => {
		if (!selectedFlight) return 0;

		const basePrice = selectedFlight.price * passengers;
		const luggagePrice = selectedFlight.luggagePrice * luggage * passengers;
		const classPrice = basePrice * (classMultipliers[flightClass] - 1);

		return (basePrice + luggagePrice + classPrice) * (isRoundTrip ? 2 : 1);
	};

	const generateRandomConfirmation = () => {
		const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let result = "";
		for (let i = 0; i < 8; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return result;
	};

	const generateRandomSeats = (count) => {
		const rows = ["A", "B", "C", "D", "E", "F"];
		const result = [];
		for (let i = 0; i < count; i++) {
			const row = rows[Math.floor(Math.random() * rows.length)];
			const number = Math.floor(Math.random() * 30) + 1;
			result.push(`${row}${number}`);
		}
		return result;
	};

	const handleConfirm = () => {
		const confirmation = generateRandomConfirmation();
		setConfirmationNumber(confirmation);
		setSeats(generateRandomSeats(passengers));
		setIsConfirmed(true);
	};

	useEffect(() => {
		if (flights.length > 0) {
			setSelectedFlight(flights[0]);
		}
	}, []);

	return (
		<div className="fixed inset-0 bg-black/90 flex items-center justify-center p-2 sm:p-4 z-50">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
				{!isConfirmed ? (
					<>
						<div className="p-4 sm:p-6">
							<div className="flex justify-between items-center mb-4 sm:mb-6">
								<h3 className="text-lg sm:text-xl font-bold text-slate-900 uppercase">
									{originAirport.city} ({origin}) → {destinationAirport.city} (
									{destination})
								</h3>
								<div className="flex items-center space-x-2 sm:space-x-4">
									<div className="flex items-center space-x-1 sm:space-x-2">
										<span className="text-xs sm:text-sm text-slate-700">
											Moneda:
										</span>
										<select
											value={showCurrency}
											onChange={(e) => setShowCurrency(e.target.value)}
											className="bg-white border border-slate-300 rounded-md py-1 px-1 sm:px-2 text-slate-950 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
										>
											<option value="USD">USD</option>
											<option value="MXN">MXN</option>
										</select>
									</div>
									{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
									<button
										onClick={onClose}
										className="text-slate-900 hover:text-rose-700 duration-200"
									>
										{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 sm:h-6 sm:w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>

							<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
								<div className="lg:col-span-2 space-y-3 sm:space-y-4">
									{flights.map((flight) => (
										// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
										<div
											key={flight.id}
											onClick={() => setSelectedFlight(flight)}
											className={`p-3 sm:p-4 border rounded-md cursor-pointer transition-colors duration-200 ${
												selectedFlight?.id === flight.id
													? "border-slate-800 bg-slate-200"
													: "border-slate-300 hover:bg-slate-50"
											}`}
										>
											<div className="flex justify-between items-center">
												<div>
													<h4 className="font-bold text-sm sm:text-base text-slate-950">
														{flight.airline}
													</h4>
													<div className="flex items-center space-x-2 sm:space-x-4 mt-1 sm:mt-2">
														<div>
															<span className="text-sm sm:text-base text-slate-700">
																{flight.departureTime}
															</span>
															<span className="block text-xs text-slate-500">
																{origin}
															</span>
														</div>
														<div className="flex-1 text-center text-xs sm:text-sm text-slate-500">
															{flight.duration}
															<div className="w-full h-px bg-slate-300 my-1" />
														</div>
														<div>
															<span className="text-sm sm:text-base text-slate-700">
																{flight.arrivalTime}
															</span>
															<span className="block text-xs text-slate-500">
																{destination}
															</span>
														</div>
													</div>
												</div>
												<div className="text-right">
													<span className="text-base sm:text-lg font-bold text-slate-950">
														{formatPrice(flight.price)}
													</span>
													<span className="block text-xs text-slate-500">
														por persona
													</span>
													{showCurrency === "USD" && (
														<span className="block text-xs text-slate-500">
															≈ ${convertToMXN(flight.price)} MXN
														</span>
													)}
													{showCurrency === "MXN" && (
														<span className="block text-xs text-slate-500">
															≈ ${flight.price} USD
														</span>
													)}
												</div>
											</div>
										</div>
									))}
								</div>

								<div className="bg-slate-700 p-3 sm:p-4 rounded-sm">
									<h4 className="font-bold text-sm sm:text-base text-white mb-3 sm:mb-4">
										Detalles de tu reserva
									</h4>

									{selectedFlight && (
										<>
											<div className="space-y-1">
												<div>
													<label
														htmlFor="passengers"
														className="block text-xs sm:text-sm font-medium text-slate-50 mb-1"
													>
														Pasajeros
													</label>
													<select
														id="passengers"
														value={passengers}
														onChange={(e) =>
															setPassengers(Number.parseInt(e.target.value))
														}
														className="w-full bg-slate-800 border border-slate-800 rounded-sm py-2 px-3 text-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800"
													>
														{[1, 2, 3, 4, 5, 6].map((num) => (
															<option key={`pass-${num}`} value={num}>
																{num} {num === 1 ? "pasajero" : "pasajeros"}
															</option>
														))}
													</select>
												</div>

												<div>
													<label
														htmlFor="luggage"
														className="block text-xs sm:text-sm font-medium text-slate-50 mb-1"
													>
														Equipaje (kg por persona)
													</label>
													<select
														id="luggage"
														value={luggage}
														onChange={(e) =>
															setLuggage(Number.parseInt(e.target.value))
														}
														className="w-full bg-slate-800 border border-slate-800 rounded-sm py-2 px-3 text-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800"
													>
														<option value="0">Sin equipaje adicional</option>
														<option value="1">
															+10kg ({formatPrice(selectedFlight.luggagePrice)})
														</option>
														<option value="2">
															+20kg (
															{formatPrice(selectedFlight.luggagePrice * 2)})
														</option>
														<option value="3">
															+30kg (
															{formatPrice(selectedFlight.luggagePrice * 3)})
														</option>
													</select>
												</div>

												<div>
													<label
														htmlFor="flightClass"
														className="block text-xs sm:text-sm font-medium text-slate-50 mb-1"
													>
														Clase
													</label>
													<select
														id="flightClass"
														value={flightClass}
														onChange={(e) => setFlightClass(e.target.value)}
														className="w-full bg-slate-800 border border-slate-800 rounded-sm py-2 px-3 text-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800"
													>
														<option value="economy">Económica</option>
														<option value="business">Business (+150%)</option>
														<option value="first">Primera clase (+300%)</option>
													</select>
												</div>

												<div className="mt-3 pt-2 sm:pt-4 border-t border-slate-300">
													<div className="flex justify-between mb-2">
														<span className="text-xs sm:text-sm text-white">
															Vuelo {isRoundTrip ? "ida y vuelta" : "solo ida"}
														</span>
														<div className="text-right">
															<span className="text-xs sm:text-sm text-white">
																{formatPrice(
																	selectedFlight.price *
																		passengers *
																		(isRoundTrip ? 2 : 1),
																)}
															</span>
															{showCurrency === "USD" && (
																<span className="block text-xs text-slate-300">
																	≈ $
																	{convertToMXN(
																		selectedFlight.price *
																			passengers *
																			(isRoundTrip ? 2 : 1),
																	)}{" "}
																	MXN
																</span>
															)}
															{showCurrency === "MXN" && (
																<span className="block text-xs text-slate-400">
																	≈ $
																	{(
																		selectedFlight.price *
																		passengers *
																		(isRoundTrip ? 2 : 1)
																	).toFixed(2)}{" "}
																	USD
																</span>
															)}
														</div>
													</div>
													<div className="flex justify-between mb-2">
														<span className="text-xs sm:text-sm text-white">
															Equipaje adicional
														</span>
														<div className="text-right">
															<span className="text-xs sm:text-sm text-white">
																{formatPrice(
																	selectedFlight.luggagePrice *
																		luggage *
																		passengers *
																		(isRoundTrip ? 2 : 1),
																)}
															</span>
															{showCurrency === "USD" && (
																<span className="block text-xs text-slate-300">
																	≈ $
																	{convertToMXN(
																		selectedFlight.luggagePrice *
																			luggage *
																			passengers *
																			(isRoundTrip ? 2 : 1),
																	)}{" "}
																	MXN
																</span>
															)}
															{showCurrency === "MXN" && (
																<span className="block text-xs text-slate-300">
																	≈ $
																	{(
																		selectedFlight.luggagePrice *
																		luggage *
																		passengers *
																		(isRoundTrip ? 2 : 1)
																	).toFixed(2)}{" "}
																	USD
																</span>
															)}
														</div>
													</div>
													<div className="flex justify-between mb-2">
														<span className="text-xs sm:text-sm text-white">
															Clase {flightClass}
														</span>
														<div className="text-right">
															<span className="text-xs sm:text-sm text-white">
																+
																{formatPrice(
																	selectedFlight.price *
																		passengers *
																		(classMultipliers[flightClass] - 1) *
																		(isRoundTrip ? 2 : 1),
																)}
															</span>
															{showCurrency === "USD" && (
																<span className="block text-xs text-slate-300">
																	≈ +$
																	{convertToMXN(
																		selectedFlight.price *
																			passengers *
																			(classMultipliers[flightClass] - 1) *
																			(isRoundTrip ? 2 : 1),
																	)}{" "}
																	MXN
																</span>
															)}
															{showCurrency === "MXN" && (
																<span className="block text-xs text-slate-300">
																	≈ +$
																	{(
																		selectedFlight.price *
																		passengers *
																		(classMultipliers[flightClass] - 1) *
																		(isRoundTrip ? 2 : 1)
																	).toFixed(2)}{" "}
																	USD
																</span>
															)}
														</div>
													</div>
													<div className="flex justify-between mt-1 sm:mt-4 pt-2 border-t border-slate-100">
														<span className="font-bold text-sm sm:text-base text-white">
															Total
														</span>
														<div className="text-right">
															<span className="font-bold text-base sm:text-lg text-white">
																{formatPrice(calculateTotalPrice())}
															</span>
															{showCurrency === "USD" && (
																<span className="block text-xs text-slate-300">
																	≈ ${convertToMXN(calculateTotalPrice())} MXN
																</span>
															)}
															{showCurrency === "MXN" && (
																<span className="block text-xs text-slate-400">
																	≈ ${calculateTotalPrice().toFixed(2)} USD
																</span>
															)}
														</div>
													</div>
												</div>
											</div>

											{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
											<button
												onClick={handleConfirm}
												className="w-full mt-4 sm:mt-6 bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-md transition duration-200 text-sm sm:text-base"
											>
												Confirmar reserva
											</button>
										</>
									)}
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="p-4 sm:p-6">
						<div className="flex justify-between items-center mb-4 sm:mb-6">
							<h3 className="text-lg uppercase sm:text-xl font-bold text-slate-800">
								¡Reserva confirmada!
							</h3>
							<div className="flex items-center space-x-2 sm:space-x-4">
								<div className="flex items-center space-x-1 sm:space-x-2">
									<span className="text-xs sm:text-sm text-slate-700">
										Moneda:
									</span>
									<select
										value={showCurrency}
										onChange={(e) => setShowCurrency(e.target.value)}
										className="bg-white border border-slate-300 rounded-md py-1 px-1 sm:px-2 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-500"
									>
										<option value="USD">USD</option>
										<option value="MXN">MXN</option>
									</select>
								</div>
								{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
								<button
									onClick={onClose}
									className="text-slate-500 hover:text-slate-700"
								>
									{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 sm:h-6 sm:w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>

						<div className="bg-slate-100 p-4 sm:p-6 rounded-sm">
							<div className="text-center mb-4 sm:mb-6">
								{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-12 sm:h-16 w-12 sm:w-16 mx-auto text-lime-500 opacity-animated"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<h4 className="text-lg sm:text-xl font-bold uppercase text-slate-800 mt-2 opacity-animated">
									¡Tu vuelo ha sido reservado!
								</h4>
								<p className="text-xs sm:text-sm text-slate-600 mt-1 sm:mt-2">
									Tu reserva ha sido confirmada con éxito. Aquí están los
									detalles de tu vuelo:
								</p>
							</div>

							<div className="space-y-3 sm:space-y-4">
								<div className="flex justify-between">
									<span className="text-xs sm:text-sm text-slate-700">
										Número de confirmación:
									</span>
									<span className="font-bold text-sm sm:text-base text-slate-900">
										{confirmationNumber}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-xs sm:text-sm text-slate-700">
										Aerolínea:
									</span>
									<span className="text-sm sm:text-base text-slate-800">
										{selectedFlight.airline}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-xs sm:text-sm text-slate-700">
										Ruta:
									</span>
									<span className="text-sm sm:text-base text-slate-800">
										{origin} → {destination}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-xs sm:text-sm text-slate-700">
										Fecha de salida:
									</span>
									<span className="text-sm sm:text-base text-slate-800">
										{new Date(departureDate).toLocaleDateString()} a las{" "}
										{selectedFlight.departureTime}
									</span>
								</div>
								{isRoundTrip && (
									<div className="flex justify-between">
										<span className="text-xs sm:text-sm text-slate-700">
											Fecha de regreso:
										</span>
										<span className="text-sm sm:text-base text-slate-800">
											{new Date(returnDate).toLocaleDateString()}
										</span>
									</div>
								)}
								<div className="flex justify-between">
									<span className="text-xs sm:text-sm text-slate-700">
										Pasajeros:
									</span>
									<span className="text-sm sm:text-base text-slate-800">
										{passengers}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-xs sm:text-sm text-slate-700">
										Asientos:
									</span>
									<span className="text-sm sm:text-base text-slate-800">
										{seats.join(", ")}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-xs sm:text-sm text-slate-700">
										Clase:
									</span>
									<span className="text-sm sm:text-base text-slate-800 capitalize">
										{flightClass}
									</span>
								</div>
								<div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-300">
									<div className="flex justify-between">
										<span className="font-bold text-sm sm:text-base text-slate-700">
											Total pagado:
										</span>
										<div className="text-right">
											<span className="font-bold text-base sm:text-lg text-slate-800">
												{formatPrice(calculateTotalPrice())}
											</span>
											{showCurrency === "USD" && (
												<span className="block text-xs text-slate-600">
													≈ ${convertToMXN(calculateTotalPrice())} MXN
												</span>
											)}
											{showCurrency === "MXN" && (
												<span className="block text-xs text-slate-600">
													≈ ${calculateTotalPrice().toFixed(2)} USD
												</span>
											)}
										</div>
									</div>
								</div>
							</div>

							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={onClose}
								className="w-full mt-4 sm:mt-6 bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-md transition duration-200 text-sm sm:text-base"
							>
								Cerrar
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default OptionsFlight;
