const gachaService = require('./gacha-service');

async function gameGacha(request, response, next) {
  try {
    const { userId } = request.body;

    if (!userId) {
      return response.status(400).json({
        success: false,
        message: 'userId wajib ada ya, No Id = No Gacha!',
      });
    }

    const result = await gachaService.rollGacha(userId);

    return response.status(200).json({
      success: true,
      message: result.message,
      prize: result.prize,
    });
  } catch (error) {
    if (error.message === 'LIMIT_EXCEEDED') {
      return response.status(403).json({
        success: false,
        error: 'kuota Full',
        message:
          'Sold Out! Jatah hoki kamu hari ini udah ludes. Amankan slot kamu lagi besok pagi ya!',
      });
    }
    return next(error);
  }
}

async function getHistory(request, response, next) {
  try {
    const { userId } = request.params;
    const history = await gachaService.getHistory(userId);

    return response.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    return next(error);
  }
}

async function getPrizeStatus(request, response, next) {
  try {
    const status = await gachaService.getPrizeStatus();
    return response.status(200).json({
      success: true,
      data: status,
    });
  } catch (error) {
    return next(error);
  }
}

async function getWinners(request, response, next) {
  try {
    const winners = await gachaService.getWinnerList();
    return response.status(200).json({
      success: true,
      data: winners,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  gameGacha,
  getHistory,
  getPrizeStatus,
  getWinners,
};
