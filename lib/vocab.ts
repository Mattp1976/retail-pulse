lib/vocab.tsexport const WORLDVIEWS = ["uk", "europe", "north_america", "global"] as const;
export type Worldview = typeof WORLDVIEWS[number];

export const SEGMENTS = [
  "fashion",
  "grocery",
  "beauty",
  "home",
  "electronics",
  "luxury",
  "value_discount",
  "convenience",
  "department_stores",
  "marketplaces",
  "dtc",
  "hospitality_food_to_go"
] as const;

export const OPERATOR_FUNCTIONS = [
  "trading_merchandising",
  "store_operations",
  "supply_chain_logistics",
  "ecommerce_digital",
  "marketing_crm",
  "customer_experience",
  "finance_pricing",
  "people_labour",
  "property_estates",
  "risk_compliance",
  "technology_data"
] as const;

export const OPERATIONAL_THEMES = [
  "pricing_promotions",
  "availability_shortages",
  "lead_times_shipping",
  "shrink_loss_prevention",
  "wage_pressure_staffing",
  "footfall_store_performance",
  "returns_refunds",
  "loyalty_retention",
  "payments_fraud",
  "regulation_compliance",
  "sustainability_reporting_cost",
  "m_and_a_competitive"
] as const;

export const IMPACT_AREAS = [
  "pricing",
  "supply_chain",
  "labour",
  "store_ops",
  "ecommerce",
  "marketing",
  "customer_demand",
  "regulation",
  "property",
  "loyalty",
  "technology",
  "risk"
] as const;

export const GEOGRAPHY = [
  "uk",
  "england",
  "scotland",
  "wales",
  "northern_ireland",
  "europe",
  "north_america",
  "global"
] as const;

export const TIME_HORIZON = ["now", "next_quarter", "next_year"] as const;
export const CONFIDENCE = ["high", "medium", "low"] as const;
export const SENTIMENT = ["positive", "neutral", "negative"] as const;
