const Card = ({sensorID, receiverNumber, sensorNumber, sensorStatus, temperatureReading, humidityLevel, batteryLevel, signalStrength, readingDate}) => {

    const sensorStatusString = sensorStatus === "1" ? "Disponible" : "Indisponible";

    let temperatureColor = "";
    if (temperatureReading < 10) {
        temperatureColor = "text-blue-500";
    } else if (temperatureReading < 24) {
        temperatureColor = "text-orange-200";
    } else {
        temperatureColor = "text-red-400";
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl cursor-pointer hover:scale-105 duration-500 mt-10 mx-8">
        <figure><img src="https://www.slate.fr/sites/default/files/styles/1200x680/public/photo_article_ciel_bleu.jpg" alt="Sensors" /></figure>
        <div className="card-body">
          <h2 className="card-title">
            Détecteur #{sensorID}
            <div className="badge bg-green-700 text-white">{sensorStatusString}</div>
          </h2>
          <div className="card-actions justify-end">
            <div className={`badge badge-outline ${temperatureColor}`}>{temperatureReading}°C</div> 
            <div className="badge badge-outline">{batteryLevel}%</div>
          </div>
        </div>
      </div>
    );
};

export default Card;
