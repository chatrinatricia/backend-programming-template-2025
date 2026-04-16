const gachaRepository = require('./gacha-repository');

const PRIZE_LIST = [
  { name: 'Emas 10 gram', kuota: 1, weight: 1 },
  { name: 'Smartphone X', kuota: 5, weight: 5 },
  { name: 'Smartwatch Y', kuota: 10, weight: 10 },
  { name: 'Voucher Rp100.000', kuota: 100, weight: 100 },
  { name: 'Pulsa Rp50.000', kuota: 500, weight: 500 },
];

function maskName(name) {
  if (!name) return 'Anonymous';
  const strName = String(name).trim();

  if (strName.length <= 2) return strName;

  const firstChar = strName[0];
  const lastChar = strName[strName.length - 1];
  const stars = '*'.repeat(strName.length - 2);

  return `${firstChar}${stars}${lastChar}`;
}

function getRandomPrize(prizes) {
  let totalWeight = 0;
  for (let i = 0; i < prizes.length; i += 1) {
    totalWeight += prizes[i].weight;
  }

  let random = Math.random() * totalWeight;
  for (let i = 0; i < prizes.length; i += 1) {
    random -= prizes[i].weight;
    if (random <= 0) {
      return prizes[i];
    }
  }
  return prizes[0];
}

async function rollGacha(userId) {
  const gachaCount = await gachaRepository.countUserGachaToday(userId);
  if (gachaCount >= 5) {
    throw new Error('LIMIT_EXCEEDED');
  }

  const prizeChecks = await Promise.all(
    PRIZE_LIST.map(async (prize) => {
      const winners = await gachaRepository.countPrizeWinners(prize.name);
      return winners < prize.kuota ? prize : null;
    })
  );

  const availablePrizes = prizeChecks.filter((prize) => prize !== null);

  if (availablePrizes.length === 0) {
    await gachaRepository.createGachaLog(userId, 'Zonk', false);
    return {
      win: false,
      prize: 'Zonk',
      message: 'Wah, sepertinya semua hadiah sudah ludes diambil orang lain!',
    };
  }

  const isWinningRoll = Math.random() < 0.5;

  if (!isWinningRoll) {
    await gachaRepository.createGachaLog(userId, 'Zonk', false);
    return {
      win: false,
      prize: 'Zonk',
      message: 'Waduh, zonk nih. Gosok tangan dulu terus klik lagi!',
    };
  }

  const prize = getRandomPrize(availablePrizes);
  await gachaRepository.createGachaLog(userId, prize.name, true);

  return {
    win: true,
    prize: prize.name,
    message: `Hoki parah! Selamat, ${prize.name} berhasil kamu amanin!`,
  };
}

async function getHistory(userId) {
  return gachaRepository.getUserHistory(userId);
}

async function getPrizeStatus() {
  const status = await Promise.all(
    PRIZE_LIST.map(async (prize) => {
      const winners = await gachaRepository.countPrizeWinners(prize.name);
      return {
        hadiah: prize.name,
        total_kuota: prize.kuota,
        sudah_dimenangkan: winners,
        sisa_kuota: prize.kuota - winners,
      };
    })
  );

  return status;
}

async function getWinnerList() {
  const logs = await gachaRepository.getAllGachaLogs();

  return logs
    .filter((log) => log.won === true)
    .map((log) => ({
      prize: log.prizeName,
      winner: maskName(log.userId),
    }));
}

module.exports = {
  rollGacha,
  getHistory,
  getPrizeStatus,
  getWinnerList,
};
