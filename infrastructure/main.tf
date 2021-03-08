terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = ">= 2.50"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rbsports-tfstate-rg"
    storage_account_name = "rbsportstfstate"
    container_name       = "rbsports-tfstate-sc"
    key                  = "core.rbsports.tfstate"
  }
}

provider "azurerm" {
    features {}
 }


resource "azurerm_resource_group" "state-rg" {
  name     = "rbsports-tfstate-rg"
  location = "East US"
  lifecycle {
    prevent_destroy = true
  }
}

resource "azurerm_storage_account" "state-sa" {
  depends_on = [azurerm_resource_group.state-rg]
  name = "rbsportstfstate"
  resource_group_name = azurerm_resource_group.state-rg.name
  location = "East US"
  account_tier = "Standard"
  account_replication_type = "ZRS"
   
  lifecycle {
    prevent_destroy = true
  }
}

resource "azurerm_storage_container" "core-container" {
  depends_on = [azurerm_storage_account.state-sa]
  name                 = "rbsports-tfstate-sc"
  storage_account_name = azurerm_storage_account.state-sa.name
}