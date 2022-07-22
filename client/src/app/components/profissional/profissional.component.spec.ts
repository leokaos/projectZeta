import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { ProfissionalComponent } from './profissional.component';

describe('ProfissionalComponent', () => {
    let component: ProfissionalComponent;
    let fixture: ComponentFixture<ProfissionalComponent>;
    let httpMock: HttpTestingController;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfissionalComponent],
            imports: [MaterialComponentsModule, FormsModule, RouterTestingModule.withRoutes([{ path: 'profissional', component: ProfissionalComponent }]), BrowserAnimationsModule, HttpClientTestingModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{ provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: 123 }) } } }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfissionalComponent);
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

        let searchAllQualificacoesRequest = httpMock.expectOne('http://localhost:8090/secured/qualificacao');
        expect(searchAllQualificacoesRequest.request.method).toBe('GET');
        searchAllQualificacoesRequest.flush([{}]);

        let searchByIdRequest = httpMock.expectOne('http://localhost:8090/secured/profissional/123');
        expect(searchByIdRequest.request.method).toBe('GET');
        searchByIdRequest.flush({});

    }

});