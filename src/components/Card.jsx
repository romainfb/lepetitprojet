import React, { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({setSensorSelected ,sensorID, receiverNumber, sensorNumber, sensorStatus, temperatureReading, humidityLevel, batteryLevel, signalStrength, readingDate, sensorLibelleParam, setSelectedSensorLibelle}) => {

    const sensorStatusString = sensorStatus === "1" ? "Disponible" : "Indisponible";

    const [sensorLibelle, setSensorLibelle] = useState(sensorLibelleParam ? sensorLibelleParam : `Détecteur ${sensorNumber}`);

    const setParentSensorSelected = (sensorNumber) => {
        setSensorSelected(sensorNumber);
    }

    // Fetch sensor name from the provided URL when the component mounts
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://45.155.171.156:5000/get_libelle=${sensorNumber}`);
          if (response.ok) {
            const data = await response.json();
            setSensorLibelle(data.sensorLibelle);
          } else {
            console.error('Échec de la récupération du nom du capteur');
          }
        } catch (error) {
          console.error('Une erreur s\'est produite lors de la récupération du nom du capteur', error);
        }
      };

      fetchData();
    }, [sensorNumber]);

    const handleKeyDown = async (event) => {
      if (event.key === 'Enter') {
          event.preventDefault();
          event.target.blur(); // Deselect the input field

          if(sensorLibelle === "" || sensorLibelle === null){
            setSensorLibelle(`Détecteur ${sensorNumber}`);
          }

          setSelectedSensorLibelle(sensorLibelle)

          try {
            const response = await fetch(`http://45.155.171.156:5000/rename_sensor=${sensorNumber}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ new_sensor_libelle: sensorLibelle }),
            });
        
            if (response.ok) {
                console.log('Champ sensorLibelle mis à jour avec succès');
            } else {
                console.error('Échec de la mise à jour du champ sensorLibelle');
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la mise à jour du champ sensorLibelle', error);
        }
      }
      
    };

    let temperatureColor = "";
    if (temperatureReading < 10) {
        temperatureColor = "text-blue-500";
    } else if (temperatureReading < 24) {
        temperatureColor = "text-orange-200";
    } else {
        temperatureColor = "text-red-400";
    }


    return (
        <div className="card w-96 bg-base-100 shadow-xl cursor-pointer hover:scale-105 duration-500 mt-10 mx-8" onClick={() => {setParentSensorSelected(sensorNumber)}}>
        <figure><img src="https://www.slate.fr/sites/default/files/styles/1200x680/public/photo_article_ciel_bleu.jpg" alt="Sensors" /></figure>
        <div className="card-body">
          
          <h2 className="card-title">
           <label htmlFor="nameText">&#10000;</label>
            <input
              type="text"
              value={sensorLibelle}
              onChange={(e) => setSensorLibelle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="outline-none bg-transparent"
              id="nameText"
            />
          </h2>
          <div className="card-actions justify-end">
            <div className={`badge badge-outline ${temperatureColor}`}>{temperatureReading}°C</div> 
            <div className="badge badge-outline">{batteryLevel}%</div>
            <div className="badge bg-green-700 text-white">{sensorStatusString}</div>
          </div>
        </div>
      </div>
    );
};

export default Card;
