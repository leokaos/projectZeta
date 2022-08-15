import { Qualificacao } from '@model/Qualificacao';
import { QualificacaoService } from '@services/qualificacao.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from '@app/model/Experiencia';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
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

    constructor(private qualificacaoService: QualificacaoService,
        private profissionalService: ProfissionalService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar) { }

    ngOnInit(): void {

        let id = this.route.snapshot.paramMap.get('id');

        this.qualificacaoService.listAll().subscribe(data => {
            this.qualificacoes = this.qualificacaoService.assemble(data);
            this.loadProfissional(id)
        });
    }

    public loadProfissional(id: string | null) {

        if (id) {

            this.profissionalService.buscarPorId(id).subscribe(data => {
                this.profissional = new Profissional().deserialize(data);
                this.dataSource.data = this.profissional.experiencias;
            })
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