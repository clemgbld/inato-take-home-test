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

class DrugTemplateFactory {
  static create(name, expiresIn, benefit) {
    if (name == "Magic Pill") {
      return new MagicPillTemplate(expiresIn, benefit);
    }
    if (name == "Fervex") {
      return new FervexTemplate(expiresIn, benefit);
    }
    if (name == "Herbal Tea") {
      return new HerbalTeaTemplate(expiresIn, benefit);
    }
    return new DrugTemplate(expiresIn, benefit);
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
