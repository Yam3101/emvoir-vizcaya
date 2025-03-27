import { useState } from "react";
import hotels from "../components/json/hotels.json";
import ReservationModal from "../components/ReservationModal";

const HotelCard = () => {
	const [selectedHotel, setSelectedHotel] = useState(null);

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold text-center mb-6">
				Hoteles Disponibles
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{hotels.map((hotel) => (
					<div
						key={hotel.id}
						className="bg-white shadow-lg rounded-lg overflow-hidden"
					>
						<img
							src={`/images/${hotel.image}`}
							alt={hotel.name}
							className="w-full h-48 object-cover"
						/>
						<div className="p-4">
							<h3 className="text-xl font-semibold">{hotel.name}</h3>
							<p className="text-gray-600">{hotel.location}</p>
							<p className="text-gray-800 font-bold">
								MXN {hotel.priceMXN} / USD {hotel.priceUSD}
							</p>
							<p className="text-gray-500">{hotel.description}</p>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
								onClick={() => setSelectedHotel(hotel)}
							>
								Reservar
							</button>
						</div>
					</div>
				))}
			</div>

			{selectedHotel && (
				<ReservationModal
					hotel={selectedHotel}
					closeModal={() => setSelectedHotel(null)}
				/>
			)}
		</div>
	);
};

export default HotelCard;
