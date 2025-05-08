export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  updateDaily() {
    // handle expiration update
    if (this.name != "Magic Pill") {
      this.expiresIn = this.expiresIn - 1;
    }
    // handle benefit update
    if (this.name === "Herbal Tea") {
      if (this.benefit < 50) {
        this.benefit = this.benefit + 1;
      }
    } else if (this.name === "Fervex") {
      if (this.benefit < 50) {
        this.benefit = this.benefit + 1;
        if (this.expiresIn < 10) {
          this.benefit = this.benefit + 1;
        }
        if (this.expiresIn < 5) {
          this.benefit = this.benefit + 1;
        }
      }
    } else if (this.name === "Magic Pill") {
    } else {
      if (this.benefit > 0) {
        this.benefit = this.benefit - 1;
      }
    }

    // handle benefit update when expires
    if (this.expiresIn < 0) {
      if (this.name === "Fervex") {
        this.benefit = 0;
      } else if (this.name === "Herbal Tea") {
        this.benefit = this.benefit + 1;
      } else {
        this.benefit = this.benefit - 1;
      }
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
