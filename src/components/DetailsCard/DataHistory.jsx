/**
 * Component for displaying the data history of a selected sensor.
 *
 * @component
 * @param {Object[]} selectedSensorDatas - The array of selected sensor data objects.
 * @returns {JSX.Element} - The DataHistory component.
 */

const DataHistory = ({selectedSensorDatas}) => {

    return (

        <div className="collapse bg-base-200 rounded-t-none">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">Historique des données</div>
            <div className="collapse-content">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Température</th>
                                <th>Humidité</th>
                                <th>Batterie</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedSensorDatas.map((detail, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-base-200" : ""}>
                                    <th>{detail.readingDate}</th>
                                    <td>{detail.temperatureReading}°C</td>
                                    <td>{detail.humidityLevel === 255 ? "Non communiquée" : `${detail.humidityLevel}%`}</td>
                                    <td>{detail.batteryLevel}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>           

        </div>
    );
};

export default DataHistory;
