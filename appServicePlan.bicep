param location string

resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: 'myAppServicePlan'
  location: location
  sku: {
    name: 'F1'
    tier: 'Free'
  }
}