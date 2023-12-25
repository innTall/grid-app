const BinanceService = {
  baseUrl: "https://api.binance.com/api/v3",
  async binanceRequest(path) {
    try {
      const response = await fetch(`${this.baseUrl}${path}`);
      const data = await response.json();
      return [null, data];
    } catch (error) {
      return [error];
    }
  },
  async getQuoteAssets() {
    try {
      const url = "src/data/quoteAssets.json";
      const response = await fetch(url);
      const data = await response.json();
      return [null, data];
    } catch (error) {
      console.error("error ocurred", error);
      return [error];
    }
  },
  getSymbols() {
    const path = "/ticker/price";
    return this.binanceRequest(path);
  },
};

export default BinanceService;
