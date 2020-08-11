import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { DashComponent } from '@app/components/dash/dash.component';
import { ListCandidateComponent } from '@candidate/list-candidate/list-candidate.component';
import { EditCandidateComponent } from '@candidate/edit-candidate/edit-candidate.component';
import { ListQualificacoesComponent } from '@qualificacoes/list-qualificacoes/list-qualificacoes.component';
import { EditQualificacoesComponent } from '@qualificacoes/edit-qualificacoes/edit-qualificacoes.component';
import { ListTipoQualificacoesComponent } from '@tipoQualificacoes/list-tipo-qualificacoes/list-tipo-qualificacoes.component';
import { ListVagasComponent } from '@app/components/vagas/list-vagas/list-vagas.component';
import { EditVagasComponent } from '@app/components/vagas/edit-vagas/edit-vagas.component';
import { ListEmpresasComponent } from '@app/components/empresas/list-empresas/list-empresas.component';
import { LoginComponent } from '@app/components/login/login.component';
import { LoginGuard } from '@app/login.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashComponent, canActivate: [LoginGuard] },
  { path: 'candidatos', component: ListCandidateComponent, canActivate: [LoginGuard] },
  { path: 'candidato/:id', component: EditCandidateComponent, canActivate: [LoginGuard] },
  { path: 'qualificacoes', component: ListQualificacoesComponent, canActivate: [LoginGuard] },
  { path: 'qualificacao/:id', component: EditQualificacoesComponent, canActivate: [LoginGuard] },
  { path: 'qualificacao', component: EditQualificacoesComponent, canActivate: [LoginGuard] },
  { path: 'tipoQualificacoes', component: ListTipoQualificacoesComponent, canActivate: [LoginGuard] },
  { path: 'vagas', component: ListVagasComponent, canActivate: [LoginGuard] },
  { path: 'vaga/:id', component: EditVagasComponent, canActivate: [LoginGuard] },
  { path: 'empresas', component: ListEmpresasComponent, canActivate: [LoginGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
