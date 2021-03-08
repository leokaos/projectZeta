import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { CandidatoComponent } from '@app/components/candidato/candidato.component';
import { CandidatosComponent } from '@app/components/candidatos/candidatos.component';
import { CategoriasComponent } from '@app/components/categorias/categorias.component';

import { DashComponent } from '@app/components/dashboard/dash.component';
import { EmpresasComponent } from '@app/components/empresas/empresas.component';
import { LoginComponent } from '@app/components/login/login.component';
import { QualificacaoComponent } from '@app/components/qualificacao/qualificacao.component';
import { QualificacoesComponent } from '@app/components/qualificacoes/qualificacoes.component';
import { VagaComponent } from '@app/components/vaga/vaga.component';
import { VagasComponent } from '@app/components/vagas/vagas.component';
import { LoginGuard } from '@app/login.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashComponent, canActivate: [LoginGuard] },
  { path: 'candidatos', component: CandidatosComponent, canActivate: [LoginGuard] },
  { path: 'candidato/:id', component: CandidatoComponent, canActivate: [LoginGuard] },
  { path: 'candidato', component: CandidatoComponent, canActivate: [LoginGuard] },
  { path: 'qualificacoes', component: QualificacoesComponent, canActivate: [LoginGuard] },
  { path: 'qualificacao/:id', component: QualificacaoComponent, canActivate: [LoginGuard] },
  { path: 'qualificacao', component: QualificacaoComponent, canActivate: [LoginGuard] },
  { path: 'categorias', component: CategoriasComponent, canActivate: [LoginGuard] },
  { path: 'vagas', component: VagasComponent, canActivate: [LoginGuard] },
  { path: 'vaga/:id', component: VagaComponent, canActivate: [LoginGuard] },
  { path: 'empresas', component: EmpresasComponent, canActivate: [LoginGuard] },
  { path: '**', component: LoginComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
