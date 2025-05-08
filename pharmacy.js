import { DrugTemplateFactory } from "./drugs-template";

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
