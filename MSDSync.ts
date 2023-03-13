import { Dropdown } from "./MSDSync/index.js";

const test = new Dropdown("hello", ["World"]).Create();

Cheat.Print(test.GetElements()[0])