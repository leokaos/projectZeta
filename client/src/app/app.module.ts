import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// ROUTING
import { AppRoutingModule } from '@app/modules/app-routing.module';

// LIBS
import { MaterialComponentsModule } from '@app/modules/material-components.module';

// COMPONENTS
import { AppComponent } from '@app/app.component';
import { DashComponent } from '@app/components/dash/dash.component';

import { ListCandidateComponent } from '@candidate/list-candidate/list-candidate.component';
import { EditCandidateComponent } from '@candidate/edit-candidate/edit-candidate.component';

import { EditQualificacoesComponent } from '@qualificacoes/edit-qualificacoes/edit-qualificacoes.component';
import { ListQualificacoesComponent } from '@qualificacoes/list-qualificacoes/list-qualificacoes.component';

import { ListTipoQualificacoesComponent } from '@tipoQualificacoes/list-tipo-qualificacoes/list-tipo-qualificacoes.component';
import { EditTipoQualificacoesComponent } from '@tipoQualificacoes/edit-tipo-qualificacoes/edit-tipo-qualificacoes.component';

import { ListVagasComponent } from '@vagas/list-vagas/list-vagas.component';
import { ShowDialogTextoVagaComponent } from '@vagas/show-dialog-texto-vaga/show-dialog-texto-vaga.component';
import { EditVagasComponent } from '@vagas/edit-vagas/edit-vagas.component';

import { CustomHttpInterceptor } from './auth.interceptor';
import { EditInlineComponent } from './components/edit-inline/edit-inline.component';
import { EventoPanelComponent } from './components/evento-panel/evento-panel.component';
import { MAT_DATE_LOCALE } from '@angular/material';

// MODULES

@NgModule({
  declarations: [
    AppComponent,
    ListCandidateComponent,
    DashComponent,
    EditCandidateComponent,
    EditQualificacoesComponent,
    ListQualificacoesComponent,
    ListTipoQualificacoesComponent,
    EditTipoQualificacoesComponent,
    ListVagasComponent,
    ShowDialogTextoVagaComponent,
    EditVagasComponent,
    EditInlineComponent,
    EventoPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    GraphQLModule,
    DragDropModule,
    CKEditorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true
  },
  {
    provide: MAT_DATE_LOCALE,
    useValue: 'en-GB'
  }
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditTipoQualificacoesComponent, ShowDialogTextoVagaComponent]
})
export class AppModule { }
