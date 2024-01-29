export const CoinList = (currency: any) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id: any) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id: any, days = 365, currency: any) =>
  `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=${currency}&days=${days}&precision=1`;

export const TrendingCoins = (currency: any) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
  // https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=30&precision=1
