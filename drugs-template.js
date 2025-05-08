class DrugTemplate {
  MINIUMUM_BENEFIT = 0;
  MAXIMUM_BENEFIT = 50;
  EXPIRED = 0;
  constructor(expiresIn, benefit) {
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  updateExpiresIn() {
    this.expiresIn = this.expiresIn - 1;
  }
  updateBenefit() {
    if (
      this.benefit > this.MINIUMUM_BENEFIT &&
      this.benefit < this.MAXIMUM_BENEFIT
    ) {
      this._updateBenefit();
    }
  }

  updateBenefitWhenExpired() {
    if (this.expiresIn < this.EXPIRED) {
      this._updateBenefitWhenExpired();
    }
  }

  _updateBenefitWhenExpired() {
    if (this.benefit > this.MINIUMUM_BENEFIT) {
      this.benefit = this.benefit - 1;
    }
  }

  _updateBenefit() {
    this.benefit = this.benefit - 1;
  }
}

class HerbalTeaTemplate extends DrugTemplate {
  _updateBenefitWhenExpired() {
    if (this.benefit < this.MAXIMUM_BENEFIT) {
      this.benefit = this.benefit + 1;
    }
  }

  _updateBenefit() {
    this.benefit = this.benefit + 1;
  }
}

class MagicPillTemplate extends DrugTemplate {
  updateExpiresIn() {}
  updateBenefit() {}
  updateBenefitWhenExpired() {}
}

class FervexTemplate extends DrugTemplate {
  _updateBenefitWhenExpired() {
    this.benefit = 0;
  }

  _updateBenefit() {
    this.benefit = this.benefit + 1;
    if (this.expiresIn < 10) {
      this.benefit = this.benefit + 1;
    }
    if (this.expiresIn < 5) {
      this.benefit = this.benefit + 1;
    }
  }
}

class DafalganTemplate extends DrugTemplate {
  _updateBenefit() {
    this.benefit = this.benefit - 2;
  }

  _updateBenefitWhenExpired() {
    if (this.benefit > this.MINIUMUM_BENEFIT) {
      this.benefit = this.benefit - 2;
    }
  }
}

export const DRUG_NAMES = {
  MAGIC_PILL: "Magic Pill",
  FERVEX: "Fervex",
  HERBAL_TEA: "Herbal Tea",
  DAFALGAN: "Dafalgan",
};

export class DrugTemplateFactory {
  static registry = new Map([
    [DRUG_NAMES.MAGIC_PILL, MagicPillTemplate],
    [DRUG_NAMES.FERVEX, FervexTemplate],
    [DRUG_NAMES.HERBAL_TEA, HerbalTeaTemplate],
    [DRUG_NAMES.DAFALGAN, DafalganTemplate],
  ]);

  static create(name, expiresIn, benefit) {
    const TemplateClass = this.registry.get(name) || DrugTemplate;
    return new TemplateClass(expiresIn, benefit);
  }
}
