const fs = require('fs');
const path = require('path');

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

function generateVotingData(startDate, endDate) {
  let data = '';
  let idVoting = 1;

  for (let date = new Date(startDate); date <= new Date(endDate); date.setDate(date.getDate() + 1)) {
    const currentDay = formatDate(date);
    const previousDay = formatDate(new Date(date.getTime() - 86400000));

    const currentDayScore = getScore({ '1': 0.1, '2': 0.1, '3': 0.4, '4': 0.25, '5': 0.15 });
    const previousDayScore = getScore({ '1': 0.15, '2': 0.15, '3': 0.5, '4': 0.1, '5': 0.1 });

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
