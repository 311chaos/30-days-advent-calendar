import { isOdd } from "../utils";

type RuleMap = Record<number, { after: number[] }>;
type Rules = number[][];

export const parseRules = (input: string) => {
  const instructions = input.split("\n");

  const orderingRules = instructions
    .filter((instruction) => instruction.includes("|"))
    .map((instruction) => instruction.split("|").map(Number));

  const updates = instructions
    .filter((instruction) => instruction.includes(","))
    .map((instruction) => instruction.split(",").map(Number));

  return { orderingRules, updates };
};

export const buildRuleMap = (rules: Rules): RuleMap => {
  const ruleMap = rules.reduce((acc, [firstNum, secondNum]) => {
    return {
      ...acc,
      [firstNum]: {
        after: [...new Set([...(acc[firstNum]?.after ?? [])])],
      },
      [secondNum]: {
        after: [...new Set([...(acc[secondNum]?.after ?? []), firstNum])],
      },
    };
  }, {});

  return ruleMap;
};

export const validatePages = ({
  ruleMap,
  rules,
}: {
  ruleMap: RuleMap;
  rules: Rules;
}) => {
  return rules.reduce(
    (acc, rule) => {
      const isValid = rule.every((pageNum, pageNumIndex) => {
        const pagesAfter = rule.filter((_, i) => i > pageNumIndex);

        return ruleMap[pageNum].after.every(
          (page) => !pagesAfter.includes(page)
        );
      });

      return {
        validRules: [...acc.validRules, ...(isValid ? [rule] : [])],
        invalidRules: [...acc.invalidRules, ...(isValid ? [] : [rule])],
      };
    },
    { validRules: [] as Rules, invalidRules: [] as Rules }
  );
};

export const sumValidPages = (validRules: Rules) => {
  const rulesAreFormattedCorrectly = validRules.every((rule) =>
    isOdd(rule.length)
  );

  if (!rulesAreFormattedCorrectly) {
    throw new Error("All rules must have an odd number of pages");
  }

  return validRules.reduce((acc, rule) => {
    const middleIndex = Math.floor(rule.length / 2);
    return (acc += rule[middleIndex]);
  }, 0);
};

export const fixInvalidRules = ({
  invalidRules,
  ruleMap,
}: {
  invalidRules: Rules;
  ruleMap: RuleMap;
}) => {
  return invalidRules.map((rule) => {
    const orderedRule: number[] = [];

    // Create a new map that only contains the pages that are part of the rule.
    let ruleMapSubset = rule.reduce((acc, pageNum) => {
      return {
        ...acc,
        [pageNum]: {
          after: ruleMap[pageNum]
            ? ruleMap[pageNum].after.filter((page) => rule.includes(page))
            : [],
        },
      };
    }, {} as RuleMap);

    // Need to iterate over the ruleMapSubset and find the page with the least amount of after pages.
    // We can then add that page to the orderedRule and remove it from the ruleMapSubset and remove it from all other pages AFTER arrays

    while (Object.keys(ruleMapSubset).length > 0) {
      Object.entries(ruleMapSubset)
        .filter(([_, values]) => values.after.length === 0)
        .map(([key]) => Number(key))
        .forEach((key) => {
          orderedRule.push(key);
          // MUTATE the ruleMapSubet
          ruleMapSubset = Object.entries(ruleMapSubset)
            .filter(([k]) => {
              return k !== key.toString();
            })
            .reduce((acc, [k, v]) => {
              return {
                ...acc,
                [k]: {
                  after: v.after.filter((page) => page !== key),
                },
              };
            }, {} as RuleMap);
        });
    }

    return orderedRule;
  });
};
