type Inventory = Array<{ name: string; quantity: number; category: string }>;

export function organizeInventory(inventory: Inventory): object {
  if (!inventory.length) {
    return {};
  }

  return inventory.reduce((acc, item) => {
    return {
      ...acc,
      [item.category]: {
        ...acc[item.category],
        [item.name]:
          acc[item.category] && acc[item.category][item.name]
            ? acc[item.category][item.name] + item.quantity
            : item.quantity,
      },
    };
  }, {});
}
