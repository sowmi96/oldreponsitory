import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { DownloadInvoiceComponent } from "./download-invoice/download-invoice.component";

const routes: Routes = [
  {
    path: "",
    component: MyProfileComponent,
    data: { title: "Profile" }
  },
  {
    path: "invoice",
    component: DownloadInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInformationRoutingModule {}
