
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

// import { ResizableModule } from 'angular-resizable-element';
import {ShContextMenuModule} from 'ng2-right-click-menu';
 
// import {NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Navbar2Component } from './navbar2/navbar2.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MytemplateComponent } from './mytemplate/mytemplate.component';
// import { MylinechartComponent } from './mytemplate/mylinechart/mylinechart.component';
// import { MybarchartComponent } from './mytemplate/mybarchart/mybarchart.component';
import { SidebarModule } from 'ng-sidebar';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ResizableModule } from 'angular-resizable-element';
import { ChartPopupComponent } from './chart-popup/chart-popup.component';
// import { CollapseModule, BsDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { MychartComponent } from './mychart/mychart.component';
import { DataComponent } from './chart-popup/data/data.component';
import { StylesComponent } from './chart-popup/styles/styles.component';

import { ColorPickerModule } from 'ngx-color-picker';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { UploadComponent } from './upload/upload.component';
import { HttpClientModule } from '@angular/common/http';
import { SavePdfComponent } from './save-pdf/save-pdf.component';
import { ImageComponent } from './image/image.component';
import { TextComponent } from './text/text.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LayoutComponent } from './layout/layout.component';
import { TemplateEditorComponent } from './template-editor/template-editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UiSwitchModule } from 'ngx-toggle-switch';

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'name',
  keepSelectedItems: false,
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Navbar2Component,
    MytemplateComponent,
    // MylinechartComponent,
    // MybarchartComponent,
    SidebarComponent,
    ChartPopupComponent,
    // MydoughnutchartComponent,
    // MyradarchartComponent,
    // MypiechartComponent,
    // MypolarchartComponent,
    // MybubblechartComponent,
    // MyscatterchartComponent,
    MychartComponent,
    DataComponent,
    StylesComponent,
    UploadComponent,
    SavePdfComponent,
    ImageComponent,
    TextComponent,
    LoginComponent,
    SignupComponent,
    LayoutComponent,
    TemplateEditorComponent,
    DashboardComponent,
    // NgbDropdownToggle
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule,
    DragDropModule,
    SidebarModule.forRoot(),
    ResizableModule,
    FormsModule,
    ShContextMenuModule,
    ColorPickerModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    HttpClientModule,
    UiSwitchModule
  ],
  exports : [
    ChartPopupComponent,
  ],
  entryComponents: [ChartPopupComponent],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
