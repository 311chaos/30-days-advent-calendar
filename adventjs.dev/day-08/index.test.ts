import { describe, test, expect } from "vitest";
import { drawRace } from ".";

describe("Day 08", () => {
  test("Sample Case 1", () => {
    /* 
      ~~~~~~~~~~ /1
     ~~~~~r~~~~ /2
    ~~~~~~~r~~ /3
    */

    const expectedOutput = [
      "  ~~~~~~~~~~ /1",
      " ~~~~~r~~~~ /2",
      "~~~~~~~r~~ /3",
    ];

    expect(drawRace([0, 5, -3], 10)).toBe(expectedOutput.join("\n"));
  });

  test("Sample Case 2", () => {
    /* 
           ~~r~~~~~ /1
          ~~~~~~~r /2
         ~~~~~~~~ /3
        ~~~~~r~~ /4
    */

    const expectedOutput = [
      "   ~~r~~~~~ /1",
      "  ~~~~~~~r /2",
      " ~~~~~~~~ /3",
      "~~~~~r~~ /4",
    ];

    expect(drawRace([2, -1, 0, 5], 8)).toBe(expectedOutput.join("\n"));
  });

  test("Sample Case 3", () => {
    /* 
          ~~~r~~~~~~~~ /1
         ~~~~~~~~r~~~ /2
        ~~~~~~~~~~r~ /3
    */

    const expectedOutput = [
      "  ~~~r~~~~~~~~ /1",
      " ~~~~~~~r~~~~ /2",
      "~~~~~~~~~~r~ /3",
    ];

    expect(drawRace([3, 7, -2], 12)).toBe(expectedOutput.join("\n"));
  });
});
