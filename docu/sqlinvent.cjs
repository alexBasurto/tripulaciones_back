const fs = require('fs');
const path = require('path');

// Configuración de las probabilidades por mes
const scoreProbabilities = {
  '2023-01': { currentDay: { '1': 0.05, '2': 0.40, '3': 0.30, '4': 0.15, '5': 0.10 }, previousDay: { '1': 0.10, '2': 0.45, '3': 0.25, '4': 0.10, '5': 0.10 } },
  '2023-02': { currentDay: { '1': 0.05, '2': 0.35, '3': 0.35, '4': 0.15, '5': 0.10 }, previousDay: { '1': 0.10, '2': 0.40, '3': 0.30, '4': 0.10, '5': 0.10 } },
  '2023-03': { currentDay: { '1': 0.05, '2': 0.30, '3': 0.35, '4': 0.20, '5': 0.10 }, previousDay: { '1': 0.10, '2': 0.35, '3': 0.30, '4': 0.15, '5': 0.10 } },
  '2023-04': { currentDay: { '1': 0.05, '2': 0.25, '3': 0.40, '4': 0.20, '5': 0.10 }, previousDay: { '1': 0.10, '2': 0.30, '3': 0.35, '4': 0.15, '5': 0.10 } },
  '2023-05': { currentDay: { '1': 0.05, '2': 0.20, '3': 0.40, '4': 0.25, '5': 0.10 }, previousDay: { '1': 0.10, '2': 0.25, '3': 0.35, '4': 0.20, '5': 0.10 } },
  '2023-06': { currentDay: { '1': 0.05, '2': 0.15, '3': 0.40, '4': 0.30, '5': 0.10 }, previousDay: { '1': 0.10, '2': 0.20, '3': 0.35, '4': 0.25, '5': 0.10 } },
  '2023-07': { currentDay: { '1': 0.05, '2': 0.10, '3': 0.45, '4': 0.30, '5': 0.10 }, previousDay: { '1': 0.10, '2': 0.15, '3': 0.40, '4': 0.25, '5': 0.10 } },
  '2023-08': { currentDay: { '1': 0.05, '2': 0.05, '3': 0.50, '4': 0.30, '5': 0.10 }, previousDay: { '1': 0.10, '2': 0.10, '3': 0.45, '4': 0.25, '5': 0.10 } },
  '2023-09': { currentDay: { '1': 0.10, '2': 0.40, '3': 0.30, '4': 0.15, '5': 0.05 }, previousDay: { '1': 0.15, '2': 0.45, '3': 0.25, '4': 0.10, '5': 0.05 } },
  '2023-10': { currentDay: { '1': 0.10, '2': 0.30, '3': 0.35, '4': 0.15, '5': 0.10 }, previousDay: { '1': 0.15, '2': 0.35, '3': 0.30, '4': 0.10, '5': 0.10 } },
  '2023-11': { currentDay: { '1': 0.05, '2': 0.25, '3': 0.35, '4': 0.25, '5': 0.10 }, previousDay: { '1': 0.10, '2': 0.30, '3': 0.30, '4': 0.20, '5': 0.10 } },
  '2023-12': { currentDay: { '1': 0.05, '2': 0.20, '3': 0.30, '4': 0.30, '5': 0.15 }, previousDay: { '1': 0.10, '2': 0.25, '3': 0.30, '4': 0.25, '5': 0.10 } },
  '2024-01': { currentDay: { '1': 0.05, '2': 0.15, '3': 0.25, '4': 0.35, '5': 0.20 }, previousDay: { '1': 0.10, '2': 0.20, '3': 0.25, '4': 0.30, '5': 0.15 } }
};


function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function getScore(distribution) {
  const rand = Math.random();
  let cumulative = 0;
  for (const score in distribution) {
    cumulative += distribution[score];
    if (rand <= cumulative) return score;
  }
}

function getMonthlyDistribution(date) {
  const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  return scoreProbabilities[yearMonth] || scoreProbabilities['2023-01']; // Default a enero 2023 si no se encuentra
}

function generateVotingData(startDate, endDate) {
  let data = '';
  let idVoting = 1;

  for (let date = new Date(startDate); date <= new Date(endDate); date.setDate(date.getDate() + 1)) {
    const currentDay = formatDate(date);
    const previousDay = formatDate(new Date(date.getTime() - 86400000));

    const monthlyDistribution = getMonthlyDistribution(date);
    const currentDayScore = getScore(monthlyDistribution.currentDay);
    const previousDayScore = getScore(monthlyDistribution.previousDay);

    data += `INSERT INTO \`tripulaciones\`.\`tbVoting\`(\`idVoting\`, \`idEmployee\`,\`idCompany\`,\`previousDay\`,\`previousDayScore\`,\`currentDay\`,\`currentDayScore\`) VALUES (${idVoting}, 1, 1, '${previousDay}', ${previousDayScore}, '${currentDay}', ${currentDayScore});\n`;

    if (idVoting % 3 === 0) {
      const numEntries = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numEntries; i++) {
        const idFeeling = Math.floor(Math.random() * 34) + 1;
        const idReason = Math.floor(Math.random() * 12) + 1;
        data += `INSERT INTO \`tripulaciones\`.\`tbVotingFeelings\`(\`idFeeling\`,\`idVoting\`) VALUES (${idFeeling}, ${idVoting});\n`;
        data += `INSERT INTO \`tripulaciones\`.\`tbVotingReasons\`(\`idVoting\`,\`idReason\`) VALUES (${idVoting}, ${idReason});\n`;
      }
    }
    idVoting++;
  }

  return data;
}

const startDate = '2023-01-01';
const endDate = '2024-01-16';

const sqlData = generateVotingData(startDate, endDate);
console.log("Cantidad de datos generados: ", sqlData.length);

const filePath = path.join(__dirname, 'voting_insert_script.sql');
fs.writeFileSync(filePath, sqlData);

console.log(`Script SQL generado en: ${filePath}`);
