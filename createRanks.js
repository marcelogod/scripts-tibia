const ranks = [
  "&2Nori &l3&2",
  "&2Nori &l2&2",
  "&2Nori &l1&2",
  "&aKelp &l3&a",
  "&aKelp &l2&a",
  "&aKelp &l1&a",
  "&bSpirulina &l3&b",
  "&bSpirulina &l2&b",
  "&bSpirulina &l1&b",
  "&1Wakame &l3&1",
  "&1Wakame &l2&1",
  "&1Wakame &l1&1",
  "&aSeaweed &l3&a",
  "&aSeaweed &l2&a",
  "&aSeaweed &l1&a",
  "&2Chlorella &l3&2",
  "&2Chlorella &l2&2",
  "&2Chlorella &l1&2",
  "&cDulse &l3&c",
  "&cDulse &l2&c",
  "&cDulse &l1&c",
  "&eAgar &l3&e",
  "&eAgar &l2&e",
  "&eAgar &l1&e",
  "&5Laver &l3&5",
  "&5Laver &l2&5",
  "&5Laver &l1&5",
  "&6Irishmoss &l3&6",
  "&6Irishmoss &l2&6",
  "&6Irishmoss &l1&6",
  "&4Arame &l3&4",
  "&4Arame &l2&4",
  "&4Arame &l1&4",
  "&4Bladderwrack &l3&4",
  "&4Bladderwrack &l2&4",
  "&4Bladderwrack &l1&4",
  "&dCarrageen &l3&d",
  "&dCarrageen &l2&d",
  "&dCarrageen &l1&d",
  "&dGracilaria &l3&d",
  "&dGracilaria &l2&d",
  "&dGracilaria &l1&d",
  "&7Sargassum &l3&7",
  "&7Sargassum &l2&7",
  "&7Sargassum &l1&7",
];

const newPrice = (rank) => {
  var ordem = ranks.indexOf(rank) + 1;
  return (1000.0*ordem)*1.75;
}

const generateRankData = (rank) => {
  return {
    order: ranks.indexOf(rank) + 1,
    tag: `[${rank}]`,
    name: `${rank}`,
    "release-date": "01/01/2020-10:00",
    prices: {
      price1: { provider: "almas", price: `${newPrice(rank)}` },
      price2: { provider: "fragmentos", price: 40000.0 },
    },
    rankup: {
      command: [
        `lp user {player} parent addtemp ${rank} 8weeks server=tycoon`,
        `eco give {player} 10000`,
      ],
      messages: {
        chat: [``, `&f&l{player} &7agora é &2&l${rank}`, ``],
        actionbar: `&f&l{player} &7agora é &2&l${rank}`,
        title: ` &6&lGG! &fEvoluiu para &2${rank}`,
      },
    },
  };
};

const ranksData = ranks.reduce((acc, rank) => {
  acc[`${rank}`] = generateRankData(rank);
  return acc;
}, {});

console.log(JSON.stringify(ranksData, null, 2));