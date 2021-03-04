import { Candidato } from '@app/model/Candidato';
import { Qualificacao } from '@model/Qualificacao';
import { QualificacaoService } from '@services/qualificacao.service';

import { CandidatoService } from '@app/services/candidato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from '@app/model/Experiencia';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-candidato',
    templateUrl: './candidato.component.html',
    styleUrls: ['./candidato.component.css']
})
export class CandidatoComponent implements OnInit {

    candidato: Candidato = new Candidato();
    qualificacoes: Qualificacao[] = [];
    dataSource: MatTableDataSource<Experiencia> = new MatTableDataSource<Experiencia>();

    displayedColumns: string[] = ['qualificacao', 'tempo', 'delete'];

    constructor(private qualificacaoService: QualificacaoService, private candidatoService: CandidatoService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

    ngOnInit(): void {

        let id = this.route.snapshot.paramMap.get('id');

        if (id) {
            forkJoin([
                this.candidatoService.buscarPorId(id),
                this.qualificacaoService.listAll()
            ]).subscribe(result => {
                this.candidato = new Candidato().deserialize(result[0]);
                this.dataSource.data = this.candidato.experiencias;
                this.qualificacoes = this.qualificacaoService.assemble(result[1]);
            });
        }

    }

    public salvar(): void {

        this.candidatoService.save(this.candidato).subscribe(
            (data: Candidato) => {
                this.router.navigate(['candidatos']);
                this.snackBar.open('Candidato salvo com sucesso!', 'Fechar');
            },
            (err: any) => {
                this.snackBar.open(err.error.message, 'Fechar');
            }
        );

    }

    public adicionarExperiencia(): void {
        this.candidato.experiencias.push(new Experiencia());
        this.dataSource.data = this.candidato.experiencias;
    }

    public removerExperiencia(index: number): void {
        this.candidato.experiencias.splice(index, 1);
        this.dataSource.data = this.candidato.experiencias;
    }

}