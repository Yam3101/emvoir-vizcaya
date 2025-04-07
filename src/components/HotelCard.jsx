import { useState } from "react";
import {
	FaMapMarkerAlt,
	FaStar,
	FaHotel,
	FaMoneyBillWave,
	FaBed,
} from "react-icons/fa";
import hotels from "../components/json/hotels.json";
import ReservationModal from "../components/ReservationModal";

const HotelCard = () => {
	const [selectedHotel, setSelectedHotel] = useState(null);

	return (
		<section className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
					Hoteles <span className="text-slate-600">Disponibles</span>
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{hotels.map((hotel) => (
						<div
							key={hotel.id}
							className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 flex flex-col"
						>
							<div className="relative">
								<img
									src={hotel.image}
									alt={hotel.name}
									className="w-full h-56 object-cover"
									loading="lazy"
								/>
								<div className="absolute top-3 right-3 bg-slate-800 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
									<FaStar className="mr-1 text-yellow-400" />
									4.8
								</div>
							</div>

							<div className="p-5 flex-grow">
								<div className="flex justify-between items-start mb-2">
									<h3 className="text-xl font-bold text-slate-800">
										{hotel.name}
									</h3>
									<div className="flex items-center bg-slate-100 px-2 py-1 rounded">
										<FaHotel className="text-slate-600 mr-1" />
										<span className="text-sm font-medium text-slate-700">
											5★
										</span>
									</div>
								</div>

								<div className="flex items-center text-slate-600 mb-3">
									<FaMapMarkerAlt className="mr-2" />
									<span>{hotel.location}</span>
								</div>

								<p className="text-slate-600 mb-4 line-clamp-3">
									{hotel.description}
								</p>

								<div className="border-t border-slate-200 pt-4">
									<div className="flex justify-between items-center mb-4">
										<div className="flex items-center">
											<FaBed className="text-slate-500 mr-2" />
											<span className="text-sm text-slate-600">
												Habitación Estándar
											</span>
										</div>
										<div className="text-right">
											<div className="text-xs text-slate-500">Desde</div>
											<div className="flex items-center justify-end">
												<FaMoneyBillWave className="text-green-500 mr-1" />
												<span className="font-bold text-lg text-slate-800">
													${hotel.priceMXN.toLocaleString()}
												</span>
												<span className="text-sm text-slate-500 ml-1">MXN</span>
											</div>
											<div className="text-xs text-slate-500">
												≈ ${hotel.priceUSD} USD
											</div>
										</div>
									</div>

									{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
									<button
										onClick={() => setSelectedHotel(hotel)}
										className="w-full bg-slate-700 hover:bg-slate-800 text-white py-2 px-4 rounded-md transition-colors duration-300 font-medium flex items-center justify-center"
									>
										Reservar ahora
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{selectedHotel && (
				<ReservationModal
					hotel={selectedHotel}
					closeModal={() => setSelectedHotel(null)}
				/>
			)}
		</section>
	);
};

export default HotelCard;
