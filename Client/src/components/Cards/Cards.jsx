import Card from "../Card/Card";


export default function Cards({properties}) {
	console.log("soy prop de cards",properties)
		return (
			<div>
				<h2 className="text-2xl font-extrabold text-gray-900">Properties</h2>
				<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
					{properties.length > 0 ? (
						properties.map((property) => (
							<Card
								key={property._id}
								_id={property._id}
								title={property.title}
								description={property.description}
								price={property.price}
								images={property.images[0]}
							/>
						))
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
			);
}
