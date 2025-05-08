class DrugTemplate {
  constructor(drug) {
    this.drug = drug;
  }

  updateDaily() {
    this._updateExpiresIn();
    this._updateBenefit();
    if (this.drug.isExpired()) {
      this._updateBenefitWhenExpired();
    }
  }

  _updateExpiresIn() {
    this.drug.tick();
  }
  _updateBenefit() {
    this.drug.decreaseBenefit();
  }

  _updateBenefitWhenExpired() {
    this._updateBenefit();
  }
}

class HerbalTeaTemplate extends DrugTemplate {
  _updateBenefit() {
    this.drug.increaseBenefit();
  }
}

class MagicPillTemplate extends DrugTemplate {
  _updateExpiresIn() {}
  _updateBenefit() {}
  _updateBenefitWhenExpired() {}
}

class FervexTemplate extends DrugTemplate {
  TEN_DAYS = 10;
  FIVE_DAYS = 5;
  _updateBenefitWhenExpired() {
    this.drug.dropBenefit();
  }

  _updateBenefit() {
    this.drug.increaseBenefit();
    if (this.drug.willExpireInLessThan(this.TEN_DAYS)) {
      this.drug.increaseBenefit();
    }
    if (this.drug.willExpireInLessThan(this.FIVE_DAYS)) {
      this.drug.increaseBenefit();
    }
  }
}

class DafalganTemplate extends DrugTemplate {
  _updateBenefit() {
    this.drug.decreaseBenefit();
    this.drug.decreaseBenefit();
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

  static create(drug) {
    const TemplateClass = this.registry.get(drug.name) || DrugTemplate;
    return new TemplateClass(drug);
  }
}
