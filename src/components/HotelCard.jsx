import { useState } from "react";
import hotels from "../components/json/hotels.json";
import ReservationModal from "../components/ReservationModal";

const HotelCard = () => {
	const [selectedHotel, setSelectedHotel] = useState(null);

	return (
		<section className="p-6">
			<h2 className="text-3xl font-bold text-center mb-6 uppercase dmsans">
				Hoteles Disponibles
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{hotels.map((hotel) => (
					<div
						key={hotel.id}
						className="bg-white hover:shadow-sm hover:shadow-slate-800 text-slate-800 duration-200 rounded-md overflow-hidden flex flex-col justify-between"
					>
						<img
							src={`/images/${hotel.image}`}
							alt={hotel.name}
							className="w-full h-48 object-cover"
						/>
						<div className="px-4 pb-6">
							<h3 className="text-xl font-semibold">{hotel.name}</h3>
							<p className="text-slate-900">{hotel.location}</p>
							<p className="text-slate-800">{hotel.description}</p>
							<div className="flex flex-wrap items-center justify-end space-x-2">
								<p className="font-bold flex flex-col space-y-[-7px] text-right">
									<h4 className="text-sm text-slate-800">
										{hotel.priceUSD}USD
									</h4>
									<h4 className="text-lg">{hotel.priceMXN}MXN</h4>
								</p>
								{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
								<button
									className="w-40 px-1 py-2 text-slate-800 hover:text-white border-2 rounded-sm hover:bg-slate-800 hover:border-slate-800 duration-200 hover:font-medium"
									onClick={() => setSelectedHotel(hotel)}
								>
									Reservar
								</button>
							</div>
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
		</section>
	);
};

export default HotelCard;
