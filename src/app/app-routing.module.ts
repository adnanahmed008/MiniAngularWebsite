import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "list" },
  { path: "home", loadChildren: () => import("./home/home.module").then(x => x.HomeModule) },
  { path: "list", loadChildren: () => import("./list/list.module").then(x => x.ListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
