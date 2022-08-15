import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@modules/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from '@config/keycloak-init';
import { GraphQLModule } from '@modules/graphql.module';
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
import { EventoEntidadeComponent } from './components/evento-entidade/evento-entidade.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CandidatosComponent } from './components/candidatos/candidatos.component';
import { UserComponent } from './components/user/user.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { PanelVagasComponent } from './components/panel-vagas/panel-vagas.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelCandidatosComponent,
    PanelQualificacoesComponent,
    PanelVagasComponent,
    EmpresasComponent,
    CategoriasComponent,
    CategoriaComponent,
    EventoEntidadeComponent,
    QualificacaoComponent,
    QualificacoesComponent,
    ProfissionaisComponent,
    ProfissionalComponent,
    EventosComponent,
    AvatarComponent,
    VagasComponent,
    VagaComponent,
    ShowVagaComponent,
    DashComponent,
    CandidatosComponent,
    UserComponent
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
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule
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
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
