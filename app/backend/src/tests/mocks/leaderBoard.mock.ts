const matches1 = [
  {
    "id": 3,
    "homeTeamId": 4,
    "homeTeamGoals": 3,
    "awayTeamId": 11,
    "awayTeamGoals": 0,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Corinthians"
    },
    "awayTeam": {
      "teamName": "Napoli-SC"
    }
  },
  {
    "id": 7,
    "homeTeamId": 12,
    "homeTeamGoals": 2,
    "awayTeamId": 6,
    "awayTeamGoals": 2,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Palmeiras"
    },
    "awayTeam": {
      "teamName": "Ferroviária"
    }
  },
  {
    "id": 14,
    "homeTeamId": 14,
    "homeTeamGoals": 2,
    "awayTeamId": 16,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Santos"
    },
    "awayTeam": {
      "teamName": "São Paulo"
    }
  },
  {
    "id": 18,
    "homeTeamId": 12,
    "homeTeamGoals": 4,
    "awayTeamId": 5,
    "awayTeamGoals": 2,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Palmeiras"
    },
    "awayTeam": {
      "teamName": "Cruzeiro"
    }
  },
  {
    "id": 22,
    "homeTeamId": 4,
    "homeTeamGoals": 3,
    "awayTeamId": 3,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Corinthians"
    },
    "awayTeam": {
      "teamName": "Botafogo"
    }
  },
  {
    "id": 32,
    "homeTeamId": 14,
    "homeTeamGoals": 5,
    "awayTeamId": 11,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Santos"
    },
    "awayTeam": {
      "teamName": "Napoli-SC"
    }
  },
  {
    "id": 38,
    "homeTeamId": 14,
    "homeTeamGoals": 2,
    "awayTeamId": 4,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Santos"
    },
    "awayTeam": {
      "teamName": "Corinthians"
    }
  },
  {
    "id": 40,
    "homeTeamId": 12,
    "homeTeamGoals": 4,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Palmeiras"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
];

const homeTeams = [
  {
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": 100,
  },
  {
    "name": "Palmeiras",
    "totalPoints": 7,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 10,
    "goalsOwn": 5,
    "goalsBalance": 5,
    "efficiency": 77.78,
  },
  {
    "name": "Corinthians",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 6,
    "goalsOwn": 1,
    "goalsBalance": 5,
    "efficiency": 100,
  },
];

const matches2 = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 17,
    "homeTeamId": 1,
    "homeTeamGoals": 2,
    "awayTeamId": 8,
    "awayTeamGoals": 3,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Avaí/Kindermann"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 18,
    "homeTeamId": 12,
    "homeTeamGoals": 4,
    "awayTeamId": 5,
    "awayTeamGoals": 2,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Palmeiras"
    },
    "awayTeam": {
      "teamName": "Cruzeiro"
    }
  },
  {
    "id": 22,
    "homeTeamId": 4,
    "homeTeamGoals": 3,
    "awayTeamId": 3,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Corinthians"
    },
    "awayTeam": {
      "teamName": "Botafogo"
    }
  },
  {
    "id": 45,
    "homeTeamId": 5,
    "homeTeamGoals": 1,
    "awayTeamId": 3,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Cruzeiro"
    },
    "awayTeam": {
      "teamName": "Botafogo"
    }
  },
]

const awayTeams = [
  {
    "name": "Grêmio",
    "totalPoints": 4,
    "totalGames": 2,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 4,
    "goalsOwn": 3,
    "goalsBalance": 1,
    "efficiency": 66.67,
  },
  {
    "name": "Botafogo",
    "totalPoints": 1,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 2,
    "goalsOwn": 4,
    "goalsBalance": -2,
    "efficiency": 16.67,
  },
  {
    "name": "Cruzeiro",
    "totalPoints": 0,
    "totalGames": 1,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 2,
    "goalsOwn": 4,
    "goalsBalance": -2,
    "efficiency": 0,
  },
];

const matches3 = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 17,
    "homeTeamId": 1,
    "homeTeamGoals": 2,
    "awayTeamId": 8,
    "awayTeamGoals": 3,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Avaí/Kindermann"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
];

const allTeams = [
  {
    "name": "Grêmio",
    "totalPoints": 4,
    "totalGames": 2,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 4,
    "goalsOwn": 3,
    "goalsBalance": 1,
    "efficiency": 66.67,
  },
  {
    "name": "São Paulo",
    "totalPoints": 1,
    "totalGames": 1,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 1,
    "goalsOwn": 1,
    "goalsBalance": 0,
    "efficiency": 33.33,
  },
  {
    "name": "Avaí/Kindermann",
    "totalPoints": 0,
    "totalGames": 1,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 2,
    "goalsOwn": 3,
    "goalsBalance": -1,
    "efficiency": 0,
  },
];

export default {
  matches1,
  matches2,
  matches3,
  homeTeams,
  awayTeams,
  allTeams,
};
