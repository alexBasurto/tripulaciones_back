import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { apiCharts } from "../utils/apiCharts.js";
import { useSession } from "../SessionAdminContext.jsx";



const Chart1 = () => {
    // 
    const [loading, setLoading] = useState(true);
    const { session } = useSession();
    const [dataProcessed, setDataProcessed] = useState([]);
    const [numberOfVotes, setNumberOfVotes] = useState(0);

    useEffect(() => {
        apiCharts(session.idCompany, 1).then((result) => {
            const data = processData(result);
            setDataProcessed(data);
            setLoading(false);
    }
    )}
    , []);

    const processData = (data) => {
        setNumberOfVotes(data.length);
        // 1. Array con los ultimos 12 meses en formato YYYY-MM
        const months = Array.from({ length: 12 }, (_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            return date.toISOString().substring(0, 7);
        });
        
        // 3. Crear un array con la puntuacion media de cada mes
        // Revisa cada votación. Tener en cuenta que las votaciones están en fecha YYYY-MM-DD
        const previousAverage = months.map((month) => {
            // Filtra las votaciones del mes actual
            const votes = data.filter((vote) => vote.previousDay.substring(0, 7) === month);
            if (votes.length === 0) {
                return 0;
            }
            // Calcula la media de las puntuaciones
            const average = votes.reduce((total, vote) => total + vote.previousDayScore, 0) / votes.length;
            return average;
        });

        const currentAverage = months.map((month) => {
            // Filtra las votaciones del mes actual
            const votes = data.filter((vote) => vote.currentDay.substring(0, 7) === month);
            if (votes.length === 0) {
                return 0;
            }
            // Calcula la media de las puntuaciones
            const average = votes.reduce((total, vote) => total + vote.currentDayScore, 0) / votes.length;
            return average;
        });
            return {
                months,
                previousAverage,
                currentAverage
            };
    };
    
    // Ahora tienes los datos en el formato: 
    // [{ month: '2024-01', previousAverage: X, currentAverage: Y }, ...]
    


    class Chart extends React.Component {
        render() {
            return (
                <Plot

                    data = {[
                        {
                            x: dataProcessed.months,
                            y: dataProcessed.previousAverage,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: '#3834D0' },
                            name: 'Valoración del día'
                        },
                        {
                            x: dataProcessed.months,
                            y: dataProcessed.currentAverage,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: '#FF7453' },
                            name: 'Espectativa del día'
                        }
                    ]}
                    layout={{
                        width: 720,
                        height: 440,
                        title: 'Media mensual de puntajes del trabajador a lo largo del tiempo',
                        xaxis: {
                            title: 'Meses último año'
                        },
                        yaxis: {
                            title: 'Puntuación Media',
                            range: [0, 5]
                        },
                        annotations: [
                            {
                                text: `Votos totales: ${numberOfVotes}`,
                                showarrow: false,
                                arrowhead: 7,
                                x: 1,
                                y: 1,
                                xref: "paper",
                                yref: "paper",
                                xanchor: "right",
                                yanchor: "top",
                            },
                        ],
                    }}
                />
            );
        }
    }

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
                ) : (
                    <div className="chart-container">
                    <h1>Media mensual de puntajes del trabajador a lo largo del tiempo</h1>
                    <Chart />
                </div>
            )}
        </div>
    );
};

export default Chart1;
