import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
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

export default function Calculator() {
  const [adType, setAdType] = useState<AdType>("silver");
  const [hasMaxPlan, setHasMaxPlan] = useState(false);
  const [salePrice, setSalePrice] = useState("");
  const [productCost, setProductCost] = useState("");
  const [stock, setStock] = useState("");

  const calculations = useMemo(() => {
    const price = parseFloat(salePrice) || 0;
    const cost = parseFloat(productCost) || 0;
    const stockQty = parseFloat(stock) || 0;

    if (price <= 0 || cost < 0) {
      return null;
    }

    let taxRate = TAX_RATES[adType];
    if (hasMaxPlan) {
      taxRate = Math.max(0, taxRate - MAX_BONUS);
    }

    const tax = price * taxRate;
    const profit = price - cost - tax;
    const profitMargin = ((profit / price) * 100).toFixed(2);
    const totalProfit = (profit * stockQty).toFixed(2);

    return {
      tax: tax.toFixed(2),
      profit: profit.toFixed(2),
      profitMargin,
      totalProfit,
      taxRate: (taxRate * 100).toFixed(1),
    };
  }, [adType, hasMaxPlan, salePrice, productCost, stock]);

  const adTypeLabels = {
    silver: "Prata",
    gold: "Ouro",
    diamond: "Diamante",
  };

  return (
    <Layout activeTab="calculator">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Calculadora de Taxas</h1>
          <p className="text-muted-foreground text-lg">
            Calcule o lucro com base no tipo de anúncio e configurações do seu plano
          </p>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg border-border dark:shadow-2xl dark:border-slate-700">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border dark:from-slate-800 dark:to-slate-800 dark:border-slate-700">
            <CardTitle>Dados do Produto</CardTitle>
            <CardDescription>Configure os parâmetros para calcular o lucro</CardDescription>
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

                {/* Price Input */}
                <div className="space-y-2">
                  <Label htmlFor="salePrice" className="font-medium">
                    Preço de Venda *
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                    <Input
                      id="salePrice"
                      type="number"
                      placeholder="0.00"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      className="pl-8 dark:bg-slate-800 dark:border-slate-700 dark:text-foreground"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                {/* Cost Input */}
                <div className="space-y-2">
                  <Label htmlFor="productCost" className="font-medium">
                    Custo do Produto
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

                {/* Stock Input */}
                <div className="space-y-2">
                  <Label htmlFor="stock" className="font-medium">
                    Estoque (Quantidade - opcional)
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
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
                {calculations ? (
                  <>
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-slate-800 dark:to-slate-800 rounded-lg p-6 border border-primary/20 dark:border-slate-700">
                      <p className="text-sm text-muted-foreground mb-2">Taxa Aplicada</p>
                      <p className="text-3xl font-bold text-primary">{calculations.taxRate}%</p>
                    </div>

                    <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-slate-800 dark:to-slate-800 rounded-lg p-6 border border-accent/20 dark:border-slate-700">
                      <p className="text-sm text-muted-foreground mb-2">Taxa (R$)</p>
                      <p className="text-3xl font-bold text-accent">R$ {calculations.tax}</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                      <p className="text-sm text-muted-foreground mb-2">Lucro por Unidade</p>
                      <p className="text-3xl font-bold text-green-700 dark:text-green-400">R$ {calculations.profit}</p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-2">Margem: {calculations.profitMargin}%</p>
                    </div>

                    {stock && parseFloat(stock) > 0 && (
                      <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-muted-foreground mb-2">Lucro Total (Estoque)</p>
                        <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">R$ {calculations.totalProfit}</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                          {stock} unidades × R$ {calculations.profit}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-96 bg-muted dark:bg-slate-800 rounded-lg border border-border dark:border-slate-700">
                    <p className="text-muted-foreground text-center">
                      Preencha os campos obrigatórios para ver os resultados
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-400">Como funciona?</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800 dark:text-blue-300 space-y-2">
            <p>
              <strong>Taxa:</strong> Porcentagem cobrada pela plataforma sobre o preço de venda
            </p>
            <p>
              <strong>Lucro:</strong> Preço de venda menos o custo do produto e a taxa
            </p>
            <p>
              <strong>Plano MAX:</strong> Reduz a taxa em 5%, aumentando seu lucro por venda
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
