import { ref, watch, computed, toRef } from "vue";
import BinanceService from "../services/binanceService.js";

const useBinance = () => {
  const quoteAssets = ref(null);
  const selectedQuoteAsset = ref(
    localStorage.getItem("selectedQuoteAsset") || null
  );
  const symbols = ref(null);

  BinanceService.getQuoteAssets().then(([error, data]) => {
    if (error) return console.log(error);
    quoteAssets.value = data;
  });

  BinanceService.getSymbols().then(([error, data]) => {
    if (error) return console.log(error);
    symbols.value = data;
  });

  const pairs = computed(() => {
    return symbols.value
      ?.filter((item) => item.symbol.endsWith(selectedQuoteAsset.value))
      .sort((a, b) => {
        return a.symbol.localeCompare(b.symbol);
      });
  });

  watch(selectedQuoteAsset, (newValue) => {
    if (newValue) {
      localStorage.setItem("selectedQuoteAsset", newValue);
    }
  });

  return {
    quoteAssets,
    selectedQuoteAsset,
    pairs,
  };
};

const Binance = useBinance();

export default Binance;
