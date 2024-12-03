import { expect, test } from "vitest";

import { createFrame } from "./index";

test("createFrame", () => {
  const result = createFrame(["Alice", "Bob", "Charlie", "David"]);

  const expectedResult = `***********
* Alice   *
* Bob     *
* Charlie *
* David   *
***********`;

  expect(result).toBe(expectedResult);
});
