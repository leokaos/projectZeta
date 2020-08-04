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

const routes: Routes = [
  { path: 'dashboard', component: DashComponent },
  { path: 'candidatos', component: ListCandidateComponent },
  { path: 'candidato/:id', component: EditCandidateComponent },
  { path: 'qualificacoes', component: ListQualificacoesComponent },
  { path: 'qualificacao/:id', component: EditQualificacoesComponent },
  { path: 'qualificacao', component: EditQualificacoesComponent },
  { path: 'tipoQualificacoes', component: ListTipoQualificacoesComponent },
  { path: 'vagas', component: ListVagasComponent },
  { path: 'vaga/:id', component: EditVagasComponent },
  { path: 'empresas', component: ListEmpresasComponent },
  { path: '**', component: DashComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
