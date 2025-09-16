import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import SistemaERP from "@/pages/sistema-erp";
import SistemaCRM from "@/pages/sistema-crm";
import SistemaRestaurant from "@/pages/sistema-restaurant";
import SistemaFinancial from "@/pages/sistema-financial";
import SistemaInventory from "@/pages/sistema-inventory";
import SistemaEducation from "@/pages/sistema-education";
import SistemaEcommerce from "@/pages/sistema-ecommerce";
import DemoERP from "@/pages/demo-erp";
import DemoCRM from "@/pages/demo-crm";
import DemoRestaurant from "@/pages/demo-restaurant";
import DemoFinancial from "@/pages/demo-financial";
import DemoInventory from "@/pages/demo-inventory";
import DemoEducation from "@/pages/demo-education";
import EcommerceDemo from "@/pages/demo/ecommerce";
import Cart from "@/pages/demo/cart";
import ProductDetail from "@/pages/demo/product";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sistema/erp" component={SistemaERP} />
      <Route path="/sistema/crm" component={SistemaCRM} />
      <Route path="/sistema/restaurant" component={SistemaRestaurant} />
      <Route path="/sistema/financial" component={SistemaFinancial} />
      <Route path="/sistema/inventory" component={SistemaInventory} />
      <Route path="/sistema-inventory" component={DemoInventory} />
      <Route path="/sistema/education" component={SistemaEducation} />
      <Route path="/sistema/ecommerce" component={SistemaEcommerce} />
      <Route path="/sistema-ecommerce" component={SistemaEcommerce} />
      <Route path="/demo/erp" component={DemoERP} />
      <Route path="/demo/crm" component={DemoCRM} />
      <Route path="/demo/restaurant" component={DemoRestaurant} />
      <Route path="/demo-restaurant" component={DemoRestaurant} />
      <Route path="/demo/financial" component={DemoFinancial} />
      <Route path="/demo/inventory" component={DemoInventory} />
      <Route path="/demo/education" component={DemoEducation} />
      <Route path="/demo/ecommerce" component={EcommerceDemo} />
      <Route path="/demo/cart" component={Cart} />
      <Route path="/demo/produto/:id" component={ProductDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
