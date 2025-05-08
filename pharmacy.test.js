import { Drug, Pharmacy } from "./pharmacy";
import { DRUG_NAMES } from "./drugs-template";

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
        new Pharmacy([
          new Drug(DRUG_NAMES.HERBAL_TEA, 2, 3),
        ]).updateBenefitValue(),
      ).toEqual([new Drug(DRUG_NAMES.HERBAL_TEA, 1, 4)]);
    });

    it.each([
      [0, -1],
      [-1, -2],
    ])(
      "should increase in benefit twice as fast when expired",
      (initialExpiresIn, nextExpiresIn) => {
        expect(
          new Pharmacy([
            new Drug(DRUG_NAMES.HERBAL_TEA, initialExpiresIn, 3),
          ]).updateBenefitValue(),
        ).toEqual([new Drug(DRUG_NAMES.HERBAL_TEA, nextExpiresIn, 5)]);
      },
    );

    it("should never increase the benefit above 50", () => {
      expect(
        new Pharmacy([
          new Drug(DRUG_NAMES.HERBAL_TEA, 4, 50),
        ]).updateBenefitValue(),
      ).toEqual([new Drug(DRUG_NAMES.HERBAL_TEA, 3, 50)]);
    });
  });

  describe("Magic Pill drug", () => {
    it("should never expire nor decrease in benefit", () => {
      expect(
        new Pharmacy([
          new Drug(DRUG_NAMES.MAGIC_PILL, 10, 12),
        ]).updateBenefitValue(),
      ).toEqual([new Drug(DRUG_NAMES.MAGIC_PILL, 10, 12)]);
    });
  });

  describe("Fervex drug", () => {
    it("should increase in benefit the older it gets", () => {
      expect(
        new Pharmacy([new Drug(DRUG_NAMES.FERVEX, 11, 3)]).updateBenefitValue(),
      ).toEqual([new Drug(DRUG_NAMES.FERVEX, 10, 4)]);
    });

    it.each([
      [10, 9],
      [9, 8],
      [8, 7],
      [7, 6],
      [6, 5],
    ])(
      "should increase in benefit twice as fast when there are 10 days or less",
      (initialExpiresIn, nextExpiresIn) => {
        expect(
          new Pharmacy([
            new Drug(DRUG_NAMES.FERVEX, initialExpiresIn, 3),
          ]).updateBenefitValue(),
        ).toEqual([new Drug(DRUG_NAMES.FERVEX, nextExpiresIn, 5)]);
      },
    );
    it.each([
      [5, 4],
      [4, 3],
      [3, 2],
      [2, 1],
      [1, 0],
    ])(
      "should increase in benefit thrice as fast when there are 5 days or less",
      (initialExpiresIn, nextExpiresIn) => {
        expect(
          new Pharmacy([
            new Drug(DRUG_NAMES.FERVEX, initialExpiresIn, 3),
          ]).updateBenefitValue(),
        ).toEqual([new Drug(DRUG_NAMES.FERVEX, nextExpiresIn, 6)]);
      },
    );

    it("should drop benefit to 0 when expired", () => {
      expect(
        new Pharmacy([new Drug(DRUG_NAMES.FERVEX, 0, 49)]).updateBenefitValue(),
      ).toEqual([new Drug(DRUG_NAMES.FERVEX, -1, 0)]);
    });

    it("should never increase the benefit above 50", () => {
      expect(
        new Pharmacy([new Drug(DRUG_NAMES.FERVEX, 5, 50)]).updateBenefitValue(),
      ).toEqual([new Drug(DRUG_NAMES.FERVEX, 4, 50)]);
    });
  });

  describe("Dafalgan drug", () => {
    it("should decrease in benefit twice as fast as normal drugs", () => {
      expect(
        new Pharmacy([
          new Drug(DRUG_NAMES.DAFALGAN, 2, 3),
        ]).updateBenefitValue(),
      ).toEqual([new Drug(DRUG_NAMES.DAFALGAN, 1, 1)]);
    });

    it("should never decrase the benefit below 0", () => {
      expect(
        new Pharmacy([
          new Drug(DRUG_NAMES.DAFALGAN, 2, 0),
        ]).updateBenefitValue(),
      ).toEqual([new Drug(DRUG_NAMES.DAFALGAN, 1, 0)]);
    });
  });

  it("should do nothing when there is no drug in the pharmacy", () => {
    expect(new Pharmacy().updateBenefitValue()).toEqual([]);
  });

  it("should update the benefit and expriresIn of the drugs in the pharmacy across days", () => {
    const pharmacy = new Pharmacy([new Drug("test", 2, 3)]);
    pharmacy.updateBenefitValue();
    expect(pharmacy.updateBenefitValue()).toEqual([new Drug("test", 0, 1)]);
  });

  it("should decrease the benefit and expiresIn of multiple drugs", () => {
    expect(
      new Pharmacy([
        new Drug("test", 2, 3),
        new Drug(DRUG_NAMES.FERVEX, 0, 49),
        new Drug(DRUG_NAMES.MAGIC_PILL, 10, 12),
      ]).updateBenefitValue(),
    ).toEqual([
      new Drug("test", 1, 2),
      new Drug(DRUG_NAMES.FERVEX, -1, 0),
      new Drug(DRUG_NAMES.MAGIC_PILL, 10, 12),
    ]);
  });
});
