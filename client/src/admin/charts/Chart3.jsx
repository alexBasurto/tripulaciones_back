import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { apiCharts } from "../utils/apiCharts.js";
import { useSession } from "../SessionAdminContext.jsx";



const Chart3 = () => {
    // 
    const [loading, setLoading] = useState(true);
    const { session } = useSession();
    const [feelingsVotes, setFeelingsVotes] = useState([]);

    useEffect(() => {
        apiCharts(session.idCompany, 2).then((result) => {
            console.log(result);
            const counterOrdered = processData(result);
            console.log(counterOrdered);
            setFeelingsVotes(counterOrdered);
            setLoading(false);
    }
    )}
    , []);

    const processData = (data) => {
        // Contar los votos de cada sentimiento
        const feelingsCount = data.feelings.map((feeling) => {
            const count = data.data.filter((vote) => vote.idFeeling === feeling.idFeeling).length;
            return {
                ...feeling,
                count,
            };
        });
        console.log(feelingsCount);
        // Ordenar feeligsCount de mayor a menor
        const feelingsCountSorted = feelingsCount.sort((a, b) => b.count - a.count);
        
        // Devolver los 5 sentimientos más frecuentes
        feelingsCountSorted.splice(5, feelingsCountSorted.length - 5);

        return {
            feelings: feelingsCountSorted.map((feeling) => feeling.name),
            votes: feelingsCountSorted.map((feeling) => feeling.count),
        };
       
    };
    
    class Chart extends React.Component {
        render() {
            return (
                <Plot

                    data = {[
                        {
                            labels: feelingsVotes.feelings,
                            values: feelingsVotes.votes,
                            name: 'Valoración del día',
                            type: 'pie',
                            hole: 0.4,
                            marker: {
                                colors: ['#3834D0', '#6ECFBC', '#FF80A9', '#FFC466', '#FF7453']
                            }
                            
                        }
                    ]}
                    layout={{
                        width: 720,
                        height: 440,
                        title: 'Conteo de los 5 sentimientos más frecuentes',
                    }}
                />
            );
        }
    }

    return (
        <div>
            <h1>Conteo de sentimientos</h1>
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

export default Chart3;
