import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Standard drugs", () => {
    it("should decrease the benefit and expiresIn", () => {
      expect(
        new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("test", 1, 2)]);
    });

    it.each([
      [0, -1],
      [-1, -2],
    ])(
      "should decrease the benefit twice as fast when expired",
      (initialExpiresIn, nextExpiresIn) => {
        expect(
          new Pharmacy([
            new Drug("test", initialExpiresIn, 3),
          ]).updateBenefitValue(),
        ).toEqual([new Drug("test", nextExpiresIn, 1)]);
      },
    );

    it("should never decrase the benefit below 0", () => {
      expect(
        new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue(),
      ).toEqual([new Drug("test", 1, 0)]);
    });
  });

  describe("Herbal Tea drug", () => {
    it("should increase in benefit the older it gets", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 2, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 1, 4)]);
    });

    it.each([
      [0, -1],
      [-1, -2],
    ])(
      "should increase in benefit twice as fast when expired",
      (initialExpiresIn, nextExpiresIn) => {
        expect(
          new Pharmacy([
            new Drug("Herbal Tea", initialExpiresIn, 3),
          ]).updateBenefitValue(),
        ).toEqual([new Drug("Herbal Tea", nextExpiresIn, 5)]);
      },
    );

    it("should never increase the benefit above 50", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 4, 50)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 3, 50)]);
    });
  });

  describe("Magic Pill drug", () => {
    it("should never expire nor decrease in benefit", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 10, 12)]).updateBenefitValue(),
      ).toEqual([new Drug("Magic Pill", 10, 12)]);
    });
  });

  describe("Fervex drug", () => {
    it("should increase in benefit the older it gets", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 12, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 11, 4)]);
    });
  });
});
