export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  updateDaily() {
    const drug = DrugTemplateFactory.create(
      this.name,
      this.expiresIn,
      this.benefit,
    );
    drug.updateExpiresIn();
    drug.updateBenefit();
    drug.updateBenefitWhenExpired();

    this.expiresIn = drug.expiresIn;
    this.benefit = drug.benefit;
  }
}

class DrugTemplate {
  MINUMUM_BENEFIT = 0;
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
    if (this.benefit > this.MINUMUM_BENEFIT) {
      this.benefit = this.benefit - 1;
    }
  }

  updateBenefitWhenExpired() {
    if (this.expiresIn < this.EXPIRED) {
      this._updateBenefitWhenExpired();
    }
  }

  _updateBenefitWhenExpired() {
    this.benefit = this.benefit - 1;
  }
}

class HerbalTeaTemplate extends DrugTemplate {
  updateBenefit() {
    if (this.benefit < this.MAXIMUM_BENEFIT) {
      this.benefit = this.benefit + 1;
    }
  }

  _updateBenefitWhenExpired() {
    this.benefit = this.benefit + 1;
  }
}

class MagicPillTemplate extends DrugTemplate {
  updateExpiresIn() {}
  updateBenefit() {}
  updateBenefitWhenExpired() {}
}

class FervexTemplate extends DrugTemplate {
  updateBenefit() {
    if (this.benefit === this.MAXIMUM_BENEFIT) return;
    this.benefit = this.benefit + 1;
    if (this.expiresIn < 10) {
      this.benefit = this.benefit + 1;
    }
    if (this.expiresIn < 5) {
      this.benefit = this.benefit + 1;
    }
  }

  _updateBenefitWhenExpired() {
    this.benefit = 0;
  }
}

class DrugTemplateFactory {
  static registry = new Map([
    ["Magic Pill", MagicPillTemplate],
    ["Fervex", FervexTemplate],
    ["Herbal Tea", HerbalTeaTemplate],
  ]);

  static create(name, expiresIn, benefit) {
    const TemplateClass = this.registry.get(name) || DrugTemplate;
    return new TemplateClass(expiresIn, benefit);
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      drug.updateDaily();
    });

    return this.drugs;
  }
}
