import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, SubirArchivoService, HospitalService, MedicoService, AdminGuard } from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import {  } from './guards/admin.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService, 
    SidebarService, 
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
})
export class ServiceModule { }
