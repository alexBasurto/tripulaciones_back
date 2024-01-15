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
    const [numberOfComments, setNumberOfComments] = useState(0);

    useEffect(() => {
        apiCharts(session.idCompany, 4).then((result) => {
            const data = processData(result.data);
            setDataProcessed(data);
            setLoading(false);
    }
    )}
    , []);

    const processData = (data) => {

        setNumberOfComments(data.length);

        // 1. Array con los ultimos 12 meses en formato YYYY-MM
        const months = Array.from({ length: 12 }, (_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            return date.toISOString().substring(0, 7);
        });
        
        // Creo un array con la cantidad de comentarios de cada mes
        const commentsCount = months.map((month) => {
            // Filtra los comentarios del mes actual
            const votes = data.filter((vote) => vote.date.substring(0, 7) === month);
            return votes.length;
        });
        return {
            months,
            commentsCount
        };
    }

    class Chart extends React.Component {
        render() {
            return (
                <Plot

                    data = {[
                        {
                            x: dataProcessed.months,
                            y: dataProcessed.commentsCount,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: '#3834D0' },
                            name: 'Valoración del día'
                        },
                    ]}
                    layout={{
                        width: 720,
                        height: 440,
                        title: 'Cantidad de comentarios por mes | Último año',
                        xaxis: {
                            title: 'Último año'
                        },
                        yaxis: {
                            title: 'Cantidad de comentarios por mes',
                        },
                        annotations: [
                            {
                                text: `Votos totales: ${numberOfComments}`,
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
                    <h1>Cantidad de comentarios por mes | Último año</h1>
                    <Chart />
                </div>
            )}
        </div>
    );
};

export default Chart5;
