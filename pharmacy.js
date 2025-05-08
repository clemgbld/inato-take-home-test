import { DrugTemplateFactory } from "./drugs-template";

const MAXIMUM_BENEFIT = 50;
const MINIMUM_BENEFIT = 0;
const EXPIRED = 0;

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  tick() {
    this.expiresIn = this.expiresIn - 1;
  }

  increaseBenefit() {
    if (this.benefit < MAXIMUM_BENEFIT) {
      this.benefit = this.benefit + 1;
    }
  }
  decreaseBenefit() {
    if (this.benefit > MINIMUM_BENEFIT) {
      this.benefit = this.benefit - 1;
    }
  }

  dropBenefit() {
    this.benefit = MINIMUM_BENEFIT;
  }

  isExpired() {
    return this.expiresIn < EXPIRED;
  }

  willExpireInLessThan(days) {
    return this.expiresIn < days;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      const drugTemplate = DrugTemplateFactory.create(drug);
      drugTemplate.updateDaily();
    });

    return this.drugs;
  }
}
