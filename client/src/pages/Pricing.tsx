import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import Layout from "@/components/Layout";

type AdType = "silver" | "gold" | "diamond";

interface TaxRates {
  silver: number;
  gold: number;
  diamond: number;
}

const TAX_RATES: TaxRates = {
  silver: 0.10,
  gold: 0.12,
  diamond: 0.13,
};

const MAX_BONUS = 0.05;

export default function Pricing() {
  const [adType, setAdType] = useState<AdType>("gold");
  const [hasMaxPlan, setHasMaxPlan] = useState(false);
  const [productCost, setProductCost] = useState("");
  const [desiredMargin, setDesiredMargin] = useState([50]);
  const [stock, setStock] = useState("");

  const calculations = useMemo(() => {
    const cost = parseFloat(productCost) || 0;
    const margin = desiredMargin[0] / 100;

    if (cost < 0) {
      return null;
    }

    let taxRate = TAX_RATES[adType];
    if (hasMaxPlan) {
      taxRate = Math.max(0, taxRate - MAX_BONUS);
    }

    // Formula: Price = Cost / (1 - TaxRate - DesiredMargin)
    // This ensures: Profit = Price * (1 - TaxRate - Cost/Price) = Price * DesiredMargin
    const denominator = 1 - taxRate - margin;

    if (denominator <= 0) {
      return null;
    }

    const idealPrice = cost / denominator;
    const tax = idealPrice * taxRate;
    const profit = idealPrice - cost - tax;
    const actualMargin = ((profit / idealPrice) * 100).toFixed(2);
    const totalProfit = (profit * (parseFloat(stock) || 1)).toFixed(2);

    return {
      idealPrice: idealPrice.toFixed(2),
      tax: tax.toFixed(2),
      profit: profit.toFixed(2),
      actualMargin,
      totalProfit,
      taxRate: (taxRate * 100).toFixed(1),
    };
  }, [adType, hasMaxPlan, productCost, desiredMargin, stock]);

  const adTypeLabels = {
    silver: "Prata",
    gold: "Ouro",
    diamond: "Diamante",
  };

  return (
    <Layout activeTab="pricing">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Gerador de Preços</h1>
          <p className="text-muted-foreground text-lg">
            Gere o preço ideal com base na margem de lucro desejada
          </p>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg border-border dark:shadow-2xl dark:border-slate-700">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border dark:from-slate-800 dark:to-slate-800 dark:border-slate-700">
            <CardTitle>Configurar Preço Ideal</CardTitle>
            <CardDescription>Defina a margem de lucro desejada e obtenha o preço recomendado</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Inputs */}
              <div className="space-y-6">
                {/* Ad Type Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Tipo de Anúncio</Label>
                  <RadioGroup value={adType} onValueChange={(value) => setAdType(value as AdType)}>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted dark:hover:bg-slate-800 transition-colors border border-transparent dark:border-slate-700">
                      <RadioGroupItem value="silver" id="silver" />
                      <Label htmlFor="silver" className="cursor-pointer flex-1 font-medium">
                        Prata
                        <span className="block text-sm text-muted-foreground font-normal">Taxa: 10%</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted dark:hover:bg-slate-800 transition-colors border border-yellow-400 dark:border-yellow-500">
                      <RadioGroupItem value="gold" id="gold" />
                      <Label htmlFor="gold" className="cursor-pointer flex-1 font-medium">
                        Ouro
                        <span className="block text-sm text-muted-foreground font-normal">Taxa: 12%</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted dark:hover:bg-slate-800 transition-colors border border-transparent dark:border-slate-700">
                      <RadioGroupItem value="diamond" id="diamond" />
                      <Label htmlFor="diamond" className="cursor-pointer flex-1 font-medium">
                        Diamante
                        <span className="block text-sm text-muted-foreground font-normal">Taxa: 13%</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Max Plan Toggle */}
                <div className="flex items-center justify-between p-4 bg-accent/10 dark:bg-slate-800 rounded-lg border border-accent/20 dark:border-slate-700">
                  <div>
                    <Label className="font-medium">Plano MAX?</Label>
                    <p className="text-sm text-muted-foreground">Adiciona -5% à taxa</p>
                  </div>
                  <Switch checked={hasMaxPlan} onCheckedChange={setHasMaxPlan} />
                </div>

                {/* Cost Input */}
                <div className="space-y-2">
                  <Label htmlFor="productCost" className="font-medium">
                    Custo do Produto *
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                    <Input
                      id="productCost"
                      type="number"
                      placeholder="0.00"
                      value={productCost}
                      onChange={(e) => setProductCost(e.target.value)}
                      className="pl-8 dark:bg-slate-800 dark:border-slate-700 dark:text-foreground"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                {/* Margin Slider */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">Margem de Lucro Desejada</Label>
                    <span className="text-2xl font-bold text-primary">{desiredMargin[0]}%</span>
                  </div>
                  <Slider
                    value={desiredMargin}
                    onValueChange={setDesiredMargin}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Ajuste o percentual de lucro que você deseja obter em cada venda
                  </p>
                </div>

                {/* Stock Input */}
                <div className="space-y-2">
                  <Label htmlFor="stock" className="font-medium">
                    Estoque (Quantidade - opcional)
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="1"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-foreground"
                    step="1"
                    min="0"
                  />
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="space-y-4">
                {calculations && parseFloat(productCost) >= 0 ? (
                  <>
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-slate-800 dark:to-slate-800 rounded-lg p-6 border border-primary/20 dark:border-slate-700">
                      <p className="text-sm text-muted-foreground mb-2">Preço Ideal</p>
                      <p className="text-4xl font-bold text-primary">R$ {calculations.idealPrice}</p>
                      <p className="text-sm text-primary/70 dark:text-primary/50 mt-2">Recomendado para venda</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-slate-800 dark:to-slate-800 rounded-lg p-4 border border-accent/20 dark:border-slate-700">
                        <p className="text-xs text-muted-foreground mb-2">Taxa (R$)</p>
                        <p className="text-xl font-bold text-accent">R$ {calculations.tax}</p>
                        <p className="text-xs text-accent/70 dark:text-accent/50 mt-1">{calculations.taxRate}%</p>
                      </div>

                      <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                        <p className="text-xs text-muted-foreground mb-2">Lucro</p>
                        <p className="text-xl font-bold text-green-700 dark:text-green-400">R$ {calculations.profit}</p>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">{calculations.actualMargin}%</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-muted-foreground mb-2">Custo do Produto</p>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">R$ {productCost || "0.00"}</p>
                    </div>

                    {stock && parseFloat(stock) > 0 && (
                      <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                        <p className="text-sm text-muted-foreground mb-2">Lucro Total (Estoque)</p>
                        <p className="text-3xl font-bold text-purple-700 dark:text-purple-400">R$ {calculations.totalProfit}</p>
                        <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">
                          {stock} unidades × R$ {calculations.profit}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-96 bg-muted dark:bg-slate-800 rounded-lg border border-border dark:border-slate-700">
                    <p className="text-muted-foreground text-center">
                      Preencha o custo do produto para ver o preço ideal
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-900 dark:text-green-400">Como usar?</CardTitle>
          </CardHeader>
          <CardContent className="text-green-800 dark:text-green-300 space-y-2">
            <p>
              <strong>1. Selecione o tipo de anúncio:</strong> Prata, Ouro ou Diamante
            </p>
            <p>
              <strong>2. Defina o custo do produto:</strong> O valor que você pagou para adquirir
            </p>
            <p>
              <strong>3. Ajuste a margem desejada:</strong> Use o slider para definir o lucro que você quer
            </p>
            <p>
              <strong>4. Obtenha o preço ideal:</strong> O sistema calcula automaticamente o melhor preço
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
