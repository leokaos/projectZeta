import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { CandidatosComponent } from '../candidatos/candidatos.component';
import { CandidatoComponent } from './candidato.component';

describe('CandidatoComponent', () => {
    let component: CandidatoComponent;
    let fixture: ComponentFixture<CandidatoComponent>;
    let httpMock: HttpTestingController;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CandidatoComponent],
            imports: [MaterialComponentsModule, FormsModule, RouterTestingModule.withRoutes([{ path: 'candidatos', component: CandidatosComponent }]), BrowserAnimationsModule, HttpClientTestingModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{ provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: '123' }) } } }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CandidatoComponent);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
        fixture.detectChanges();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should add a new experience', () => {

        defaultLoad();

        expect(component.dataSource.data.length).toBe(0);

        component.adicionarExperiencia();

        expect(component.dataSource.data.length).toBe(1);
    });

    it('should remove a experience', () => {

        defaultLoad();

        expect(component.dataSource.data.length).toBe(0);

        component.adicionarExperiencia();

        expect(component.dataSource.data.length).toBe(1);

        component.removerExperiencia(0);

        expect(component.dataSource.data.length).toBe(0);
    });

    function defaultLoad() {

        let searchByIdRequest = httpMock.expectOne('http://localhost:8090/secured/candidato/123');
        expect(searchByIdRequest.request.method).toBe('GET');
        searchByIdRequest.flush({});

        let searchAllQualificacoesRequest = httpMock.expectOne('http://localhost:8090/secured/qualificacao');
        expect(searchAllQualificacoesRequest.request.method).toBe('GET');
        searchAllQualificacoesRequest.flush([{}]);
    }

});