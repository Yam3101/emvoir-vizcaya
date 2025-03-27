const ReservationModal = ({ hotel, closeModal }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<h2 className="text-2xl font-bold mb-4">Reservar en {hotel.name}</h2>
				<p className="text-gray-600 mb-2">{hotel.location}</p>
				<p className="font-semibold">
					Precio: MXN {hotel.price_mxn} / USD {hotel.price_usd}
				</p>

				<form className="mt-4">
					<label className="block text-sm font-medium">Nombre:</label>
					<input type="text" className="w-full border p-2 rounded-lg mb-2" />

					<label className="block text-sm font-medium">
						Correo Electrónico:
					</label>
					<input type="email" className="w-full border p-2 rounded-lg mb-2" />

					<label className="block text-sm font-medium">Fecha de Entrada:</label>
					<input type="date" className="w-full border p-2 rounded-lg mb-2" />

					<label className="block text-sm font-medium">Fecha de Salida:</label>
					<input type="date" className="w-full border p-2 rounded-lg mb-4" />

					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
						Confirmar Reserva
					</button>
				</form>

				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
					onClick={closeModal}
				>
					Cerrar
				</button>
			</div>
		</div>
	);
};

export default ReservationModal;
