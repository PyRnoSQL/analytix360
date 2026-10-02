import type { ReactElement } from "react";
import { ARTS_MEASURE } from "./arts/measure";
import { ARTS_GAUGES } from "./arts/gauges";
import { ARTS_LAB } from "./arts/lab";
import { ARTS_SHOP } from "./arts/shop";
import { ARTS_TOOLS } from "./arts/tools";

export { CATALOG } from "./catalog";
export const ARTS: Record<string, () => ReactElement> = { ...ARTS_MEASURE, ...ARTS_GAUGES, ...ARTS_LAB, ...ARTS_SHOP, ...ARTS_TOOLS };
