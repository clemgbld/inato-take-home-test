export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  updateDaily() {
    let drug;
    if (this.name == "Magic Pill") {
      drug = new MagicPillTemplate(this.expiresIn, this.benefit);
    } else if (this.name == "Fervex") {
      drug = new FervexTemplate(this.expiresIn, this.benefit);
    } else if (this.name == "Herbal Tea") {
      drug = new HerbalTeaTemplate(this.expiresIn, this.benefit);
    } else {
      drug = new DrugTemplate(this.expiresIn, this.benefit);
    }
    drug.updateExpiresIn();
    drug.updateBenefit();
    drug.updateBenefitWhenExpired();

    this.expiresIn = drug.expiresIn;
    this.benefit = drug.benefit;
  }
}

class DrugTemplate {
  constructor(expiresIn, benefit) {
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  updateExpiresIn() {
    this.expiresIn = this.expiresIn - 1;
  }
  updateBenefit() {
    if (this.benefit > 0) {
      this.benefit = this.benefit - 1;
    }
  }

  updateBenefitWhenExpired() {
    if (this.expiresIn < 0) {
      this.benefit = this.benefit - 1;
    }
  }
}

class HerbalTeaTemplate extends DrugTemplate {
  updateBenefit() {
    if (this.benefit < 50) {
      this.benefit = this.benefit + 1;
    }
  }

  updateBenefitWhenExpired() {
    if (this.expiresIn < 0) {
      this.benefit = this.benefit + 1;
    }
  }
}

class MagicPillTemplate extends DrugTemplate {
  updateExpiresIn() {}
  updateBenefit() {}
  updateBenefitWhenExpired() {}
}

class FervexTemplate extends DrugTemplate {
  updateBenefit() {
    if (this.benefit === 50) return;
    this.benefit = this.benefit + 1;
    if (this.expiresIn < 10) {
      this.benefit = this.benefit + 1;
    }
    if (this.expiresIn < 5) {
      this.benefit = this.benefit + 1;
    }
  }

  updateBenefitWhenExpired() {
    if (this.expiresIn < 0) {
      this.benefit = 0;
    }
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      this.drugs[i].updateDaily();
    }

    return this.drugs;
  }
}
