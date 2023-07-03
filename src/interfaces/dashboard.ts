export interface IDashboardSummary {
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number;
  numberOfClients: number;
  numberOfAdmins: number;
  numberOfProducts: number;
  productsWithNoInventory: number;
  lowInventory: number;
}
