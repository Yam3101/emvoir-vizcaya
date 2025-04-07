import { useState } from "react";
import {
	FaTimes,
	FaCheckCircle,
	FaUser,
	FaEnvelope,
	FaCalendarAlt,
	FaHotel,
	FaMoneyBillWave,
} from "react-icons/fa";

const ReservationModal = ({ hotel, closeModal }) => {
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		checkIn: "",
		checkOut: "",
		guests: 1,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleConfirmReservation = (e) => {
		e.preventDefault();
		setShowConfirmation(true);
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50 p-4">
			{!showConfirmation ? (
				<div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
					<div className="p-6">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl font-bold text-slate-800">
								Reservar en <span className="text-slate-600">{hotel.name}</span>
							</h2>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={closeModal}
								className="text-slate-500 hover:text-slate-700"
							>
								<FaTimes className="h-6 w-6" />
							</button>
						</div>

						<div className="flex items-center text-slate-600 mb-3">
							<FaHotel className="mr-2" />
							<span>{hotel.location}</span>
						</div>

						<div className="flex items-center text-slate-600 mb-6">
							<FaMoneyBillWave className="mr-2" />
							<span>
								${hotel.priceMXN.toLocaleString()} MXN / ${hotel.priceUSD} USD
							</span>
						</div>

						<form onSubmit={handleConfirmReservation}>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-slate-700 mb-1">
										Nombre completo
									</label>
									<div className="relative">
										<FaUser className="absolute left-3 top-3 text-slate-400" />
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleChange}
											className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
											required
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-700 mb-1">
										Correo electrónico
									</label>
									<div className="relative">
										<FaEnvelope className="absolute left-3 top-3 text-slate-400" />
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
											required
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-slate-700 mb-1">
											Fecha de entrada
										</label>
										<div className="relative">
											<FaCalendarAlt className="absolute left-3 top-3 text-slate-400" />
											<input
												type="date"
												name="checkIn"
												value={formData.checkIn}
												onChange={handleChange}
												className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
												required
											/>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-slate-700 mb-1">
											Fecha de salida
										</label>
										<div className="relative">
											<FaCalendarAlt className="absolute left-3 top-3 text-slate-400" />
											<input
												type="date"
												name="checkOut"
												value={formData.checkOut}
												onChange={handleChange}
												className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
												required
											/>
										</div>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-700 mb-1">
										Huéspedes
									</label>
									<select
										name="guests"
										value={formData.guests}
										onChange={handleChange}
										className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
									>
										{[1, 2, 3, 4, 5].map((num) => (
											<option key={num} value={num}>
												{num} {num === 1 ? "huésped" : "huéspedes"}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className="mt-6 flex space-x-3">
								<button
									type="button"
									onClick={closeModal}
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
			) : (
				<div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
					<div className="p-6 text-center">
						<FaCheckCircle className="mx-auto text-green-500 text-5xl mb-4" />
						<h2 className="text-2xl font-bold text-slate-800 mb-2">
							¡Reserva Confirmada!
						</h2>
						<p className="text-slate-600 mb-4">
							Tu reserva en <span className="font-semibold">{hotel.name}</span>{" "}
							ha sido registrada exitosamente. Hemos enviado los detalles a tu
							correo electrónico.
						</p>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={() => {
								setShowConfirmation(false);
								closeModal();
							}}
							className="w-full bg-slate-700 hover:bg-slate-800 text-white py-2 px-4 rounded-md transition-colors duration-300 font-medium"
						>
							Finalizar
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReservationModal;
