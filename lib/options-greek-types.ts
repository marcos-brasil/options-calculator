export type VanilaGreeks = {
  "Vanila Greeks": [
    { legend: "Implied Volatility"; value: string },
    { legend: "Delta"; value: string },
    { legend: "Gamma"; value: string },
    { legend: "Theta"; value: string },
    { legend: "Vega"; value: string }
  ];
};

export type Probabilities = {
  Probabilities: [
    { legend: "At the Money"; value: string },
    { legend: "Out of The Money"; value: string },
    { legend: "Touch the Strike"; value: string }
  ];
};

export type DeltaGreeks = {
  "Delta Greeks": [
    { legend: "Delta"; value: string },
    { legend: "DdeltaDvol"; value: string },
    { legend: "DvannaDvol"; value: string },
    { legend: "DdeltaDtime"; value: string },
    { legend: "Elasticity"; value: string }
  ];
};

export type GammaGreeks = {
  "Gamma Greeks": [
    { legend: "Gamma"; value: string },
    { legend: "Maximal Gamma"; value: string },
    { legend: "GammaP"; value: string },
    { legend: "DgammaDvol"; value: string },
    { legend: "DgammaDspot"; value: string },
    { legend: "DgammaDtime"; value: string }
  ];
};
export type VegaGreeks = {
  "Vega Greeks": [
    { legend: "Vega"; value: string },
    { legend: "VegaP"; value: string },
    { legend: "Elasticity"; value: string },
    { legend: "DvegaDvol"; value: string },
    { legend: "DvommaDvol"; value: string },
    { legend: "DvegaDtime"; value: string }
  ];
};
export type VarianceGreeks = {
  "Variance Greeks": [
    { legend: "Variance Vega"; value: string },
    { legend: "DdeltaDvar"; value: string },
    { legend: "Variance Vomma"; value: string },
    { legend: "Variance Ultima"; value: string }
  ];
};


export type OptionsGreek = VanilaGreeks &
  Probabilities &
  DeltaGreeks &
  GammaGreeks &
  VegaGreeks &
  VarianceGreeks;
