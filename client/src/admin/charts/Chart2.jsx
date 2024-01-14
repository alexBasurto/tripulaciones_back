import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { apiCharts } from "../utils/apiCharts.js";
import { useSession } from "../SessionAdminContext.jsx";



const Chart2 = () => {
    // 
    const [loading, setLoading] = useState(true);
    const { session } = useSession();
    const [feelings, setFeelings] = useState([]);
    const [feelingsVotes, setFeelingsVotes] = useState([]);

    useEffect(() => {
        apiCharts(session.idCompany, 2).then((result) => {
            setFeelings(result.feelings);
            const counterOrdered = processData(result.data);
            console.log(counterOrdered);
            setFeelingsVotes(counterOrdered);
            setLoading(false);
    }
    )}
    , []);

    const processData = (data) => {
        /*
                {
            "idVotingFeelings": 117,
            "idFeeling": 1,
            "idVoting": 105
        },
        {
            "idVotingFeelings": 118,
            "idFeeling": 1,
            "idVoting": 106
        }
        */

        // Contar los votos de cada sentimiento
        const feelingsCount = feelings.map((feeling) => {
            const count = data.filter((vote) => vote.idFeeling === feeling.idFeeling).length;
            return {
                ...feeling,
                count,
            };
        });
        console.log(feelingsCount);
        // Ordenar feeligsCount de mayor a menor
        const feelingsCountSorted = feelingsCount.sort((a, b) => b.count - a.count);
        console.log(feelingsCountSorted);

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
                            x: feelingsVotes.feelings,
                            y: feelingsVotes.votes,
                            name: 'Valoración del día',
                            type: 'bar'
                        }
                    ]}
                    layout={{
                        width: 720,
                        height: 440,
                        title: 'Conteo de los 5 sentimientos más frecuentes',
                        xaxis: {
                            title: 'Sentimientos'
                        },
                        yaxis: {
                            title: 'Conteo'
                        }
                    }}
                />
            );
        }
    }

    return (
        <div>
            <h1>Conteo de los 5 sentimientos más frecuentes</h1>
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

export default Chart2;
