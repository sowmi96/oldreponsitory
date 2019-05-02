import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { DocumentsInfoComponent } from './documents-info/documents-info.component';
import { UserprofileKntschemRegComponent } from './userprofile-kntschem-reg/userprofile-kntschem-reg.component';
import { UserprofileTenderComponent } from './userprofile-tender/userprofile-tender.component';
import { UserprofileBulkorderComponent } from './userprofile-bulkorder/userprofile-bulkorder.component';
import { UserprofileCareerComponent } from './userprofile-career/userprofile-career.component';
import { UserprofileMadeOrderComponent } from './userprofile-made-order/userprofile-made-order.component';
import { UserprofileMyorderComponent } from './userprofile-myorder/userprofile-myorder.component';
import { UserprofileMyorderDetailComponent } from './userprofile-myorder-detail/userprofile-myorder-detail.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserInformationRoutingModule } from './user-information-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { DownloadInvoiceComponent } from './download-invoice/download-invoice.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserInformationRoutingModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    MyProfileComponent,
    PersonalInfoComponent,
    ManageAddressComponent,
    DocumentsInfoComponent,
    UserprofileKntschemRegComponent,
    UserprofileTenderComponent,
    DocumentsInfoComponent,
    UserprofileBulkorderComponent,
    UserprofileCareerComponent,
    UserprofileMadeOrderComponent,
    UserprofileMyorderComponent,
    UserprofileMyorderDetailComponent,
    DownloadInvoiceComponent
  ],
  exports: [
    MyProfileComponent,
    PersonalInfoComponent,
    ManageAddressComponent,
    DocumentsInfoComponent,
    UserprofileKntschemRegComponent,
    UserprofileTenderComponent,
    DocumentsInfoComponent,
    UserprofileBulkorderComponent,
    UserprofileCareerComponent,
    UserprofileMadeOrderComponent,
    UserprofileMyorderComponent,
    UserprofileMyorderDetailComponent
  ]
})
export class UserInformationModule {}
