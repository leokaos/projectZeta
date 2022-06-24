import { Qualificacao } from '@model/Qualificacao';
import { QualificacaoService } from '@services/qualificacao.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from '@app/model/Experiencia';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Profissional } from '@app/model/Profissional';
import { ProfissionalService } from '@app/services/profissional.service';

@Component({
    selector: 'app-profissional',
    templateUrl: './profissional.component.html',
    styleUrls: ['./profissional.component.scss']
})
export class ProfissionalComponent implements OnInit {

    profissional: Profissional = new Profissional();
    qualificacoes: Qualificacao[] = [];
    dataSource: MatTableDataSource<Experiencia> = new MatTableDataSource<Experiencia>();

    displayedColumns: string[] = ['qualificacao', 'tempo', 'delete'];

    constructor(private qualificacaoService: QualificacaoService, private profissionalService: ProfissionalService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

    ngOnInit(): void {

        let id = this.route.snapshot.paramMap.get('id');

        if (id) {
            forkJoin([
                this.profissionalService.buscarPorId(id),
                this.qualificacaoService.listAll()
            ]).subscribe(result => {
                this.profissional = new Profissional().deserialize(result[0]);
                this.dataSource.data = this.profissional.experiencias;
                this.qualificacoes = this.qualificacaoService.assemble(result[1]);
            });
        }

    }

    public salvar(): void {

        this.profissionalService.save(this.profissional).subscribe(
            (data: Profissional) => {
                this.router.navigate(['profissionais']);
                this.snackBar.open('Profissional salvo com sucesso!', 'Fechar');
            },
            (err: any) => {
                this.snackBar.open(err.error.message, 'Fechar');
            }
        );

    }

    public adicionarExperiencia(): void {
        this.profissional.experiencias.push(new Experiencia());
        this.dataSource.data = this.profissional.experiencias;
    }

    public removerExperiencia(index: number): void {
        this.profissional.experiencias.splice(index, 1);
        this.dataSource.data = this.profissional.experiencias;
    }

}