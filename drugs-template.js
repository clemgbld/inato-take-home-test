class DrugTemplate {
  constructor(drug) {
    this.drug = drug;
  }

  updateDaily() {
    this.updateExpiresIn();
    this.updateBenefit();
    if (this.drug.isExpired()) {
      this.updateBenefitWhenExpired();
    }
  }

  updateExpiresIn() {
    this.drug.tick();
  }
  updateBenefit() {
    this.drug.decreaseBenefit();
  }

  updateBenefitWhenExpired() {
    this.updateBenefit();
  }
}

class HerbalTeaTemplate extends DrugTemplate {
  updateBenefit() {
    this.drug.increaseBenefit();
  }
}

class MagicPillTemplate extends DrugTemplate {
  updateExpiresIn() {}
  updateBenefit() {}
  updateBenefitWhenExpired() {}
}

class FervexTemplate extends DrugTemplate {
  TEN_DAYS = 10;
  FIVE_DAYS = 5;
  updateBenefitWhenExpired() {
    this.drug.dropBenefit();
  }

  updateBenefit() {
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
  updateBenefit() {
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
