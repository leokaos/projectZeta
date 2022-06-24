import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@modules/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from '@config/keycloak-init';
import { GraphQLModule } from './modules/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { StompService } from '@services/stomp.service';
import { stompServiceFactory } from '@config/stomp.config';
import { MaterialComponentsModule } from './modules/material-components.module';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { PanelCandidatosComponent } from './components/panel-candidatos/panel-candidatos.component';
import { PanelQualificacoesComponent } from './components/panel-qualificacoes/panel-qualificacoes.component';
import { DashComponent } from './components/dashboard/dash.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { QualificacaoComponent } from './components/qualificacao/qualificacao.component';
import { QualificacoesComponent } from './components/qualificacoes/qualificacoes.component';
import { ProfissionaisComponent } from './components/profissionais/profissionais.component';
import { ProfissionalComponent } from './components/profissional/profissional.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { VagasComponent } from './components/vagas/vagas.component';
import { VagaComponent } from './components/vaga/vaga.component';
import { ShowVagaComponent } from './components/show-vaga/show-vaga.component';
import { EditInlineComponent } from './components/edit-inline/edit-inline.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelCandidatosComponent,
    PanelQualificacoesComponent,
    PanelQualificacoesComponent,
    EmpresasComponent,
    CategoriasComponent,
    CategoriaComponent,
    QualificacaoComponent,
    QualificacoesComponent,
    ProfissionaisComponent,
    ProfissionalComponent,
    EventosComponent,
    AvatarComponent,
    VagasComponent,
    VagaComponent,
    ShowVagaComponent,
    EditInlineComponent,
    DashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    TagCloudModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: StompService,
      useFactory: stompServiceFactory,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
