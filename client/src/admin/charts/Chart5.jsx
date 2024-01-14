import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { apiCharts } from "../utils/apiCharts.js";
import { useSession } from "../SessionAdminContext.jsx";



const Chart5 = () => {
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
        
        // Creo un array con la cantidad de votos de cada mes
        const votesCount = months.map((month) => {
            // Filtra las votaciones del mes actual
            const votes = data.filter((vote) => vote.previousDay.substring(0, 7) === month);
            return votes.length;
        });
        return {
            months,
            votesCount
        };
    }



    
    // Ahora tienes los datos en el formato: 
    // [{ month: '2024-01', previousAverage: X, currentAverage: Y }, ...]
    


    class Chart extends React.Component {
        render() {
            return (
                <Plot

                    data = {[
                        {
                            x: dataProcessed.months,
                            y: dataProcessed.votesCount,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: '#3834D0' },
                            name: 'Valoración del día'
                        },
                    ]}
                    layout={{
                        width: 720,
                        height: 440,
                        title: 'Media mensual de puntajes del trabajador a lo largo del tiempo',
                        xaxis: {
                            title: 'Último año'
                        },
                        yaxis: {
                            title: 'Cantidad de votos por mes',
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
            <h1>Media mensual de puntajes del trabajador a lo largo del tiempo</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <Chart />
                </div>
            )}
        </div>
    );
};

export default Chart5;
