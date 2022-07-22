import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from '@app/components/categorias/categorias.component';
import { DashComponent } from '@app/components/dashboard/dash.component';
import { EmpresasComponent } from '@app/components/empresas/empresas.component';
import { ProfissionaisComponent } from '@app/components/profissionais/profissionais.component';
import { ProfissionalComponent } from '@app/components/profissional/profissional.component';
import { QualificacaoComponent } from '@app/components/qualificacao/qualificacao.component';
import { QualificacoesComponent } from '@app/components/qualificacoes/qualificacoes.component';
import { VagaComponent } from '@app/components/vaga/vaga.component';
import { VagasComponent } from '@app/components/vagas/vagas.component';
import { AuthGuard } from '@app/guard/auth.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashComponent, canActivate: [AuthGuard] },
  { path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuard] },
  { path: 'qualificacoes', component: QualificacoesComponent, canActivate: [AuthGuard] },
  { path: 'qualificacao/:id', component: QualificacaoComponent, canActivate: [AuthGuard] },
  { path: 'qualificacao', component: QualificacaoComponent, canActivate: [AuthGuard] },
  { path: 'profissionais', component: ProfissionaisComponent, canActivate: [AuthGuard] },
  { path: 'profissional/:id', component: ProfissionalComponent, canActivate: [AuthGuard] },
  { path: 'profissional', component: ProfissionalComponent, canActivate: [AuthGuard] },
  { path: 'vagas', component: VagasComponent, canActivate: [AuthGuard] },
  { path: 'vaga/:id', component: VagaComponent, canActivate: [AuthGuard] },
  { path: 'vaga', component: VagaComponent, canActivate: [AuthGuard] },
  { path: 'empresas', component: EmpresasComponent, canActivate: [AuthGuard] },
  { path: '', component: DashComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
