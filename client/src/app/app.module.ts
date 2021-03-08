import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WebSocketConfig } from '@services/websocket.service'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { DashComponent } from '@app/components/dashboard/dash.component';
import { LoginComponent } from '@app/components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriasComponent } from '@components/categorias/categorias.component';
import { CategoriaComponent } from '@components/categoria/categoria.component';
import { QualificacoesComponent } from '@components/qualificacoes/qualificacoes.component';
import { AuthenticatorHttpInterceptor } from './auth.interceptor';
import { QualificacaoComponent } from '@components/qualificacao/qualificacao.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { CandidatosComponent } from './components/candidatos/candidatos.component';
import { CandidatoComponent } from './components/candidato/candidato.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { VagasComponent } from './components/vagas/vagas.component';
import { GraphQLModule } from './graphql.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { EditInlineComponent } from './components/edit-inline/edit-inline.component';
import { ShowVagaComponent } from './components/show-vaga/show-vaga.component';
import { VagaComponent } from './components/vaga/vaga.component';
import { PanelVagasComponent } from './components/panel-vagas/panel-vagas.component';
import { PanelCandidatosComponent } from './components/panel-candidatos/panel-candidatos.component';
import { PanelQualificacoesComponent } from './components/panel-qualificacoes/panel-qualificacoes.component';
import { TagCloudModule } from 'angular-tag-cloud-module';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    LoginComponent,
    CategoriasComponent,
    CategoriaComponent,
    QualificacoesComponent,
    QualificacaoComponent,
    EmpresasComponent,
    CandidatosComponent,
    CandidatoComponent,
    AvatarComponent,
    EventosComponent,
    VagasComponent,
    EditInlineComponent,
    ShowVagaComponent,
    VagaComponent,
    PanelVagasComponent,
    PanelCandidatosComponent,
    PanelQualificacoesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialComponentsModule,
    AppRoutingModule,
    FormsModule,
    GraphQLModule,
    ReactiveFormsModule,
    TagCloudModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticatorHttpInterceptor,
      multi: true
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB'
    },
    StompService,
    {
      provide: StompConfig,
      useValue: WebSocketConfig
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CategoriaComponent, ShowVagaComponent, PanelVagasComponent, PanelQualificacoesComponent, PanelCandidatosComponent]
})
export class AppModule { }
