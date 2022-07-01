import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Qualificacao } from '@app/model/Qualificacao';
import { MaterialComponentsModule } from '@app/modules/material-components.module';
import { QualificacoesComponent } from './qualificacoes.component';

describe('QualificacoesComponent', () => {

    let component: QualificacoesComponent;
    let fixture: ComponentFixture<QualificacoesComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QualificacoesComponent],
            imports: [HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule, MaterialComponentsModule, FormsModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QualificacoesComponent);
        component = fixture.componentInstance;
        httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
        fixture.detectChanges();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should get all qualifications', () => {

        const deserializeSpy = spyOn(Qualificacao.prototype, 'deserialize').and.callThrough();

        const req = httpMock.expectOne('http://localhost:8090/secured/qualificacao');
        expect(req.request.method).toBe('GET');

        req.flush([{ 'id': 123 }, { 'id': 456 }]);

        expect(component.dataSource.data.length).toBe(2);
        expect(deserializeSpy).toHaveBeenCalledTimes(2);

    });

    it('should remove one qualification with success', () => {

        const deserializeSpy = spyOn(Qualificacao.prototype, 'deserialize').and.callThrough();
        const openSpy = spyOn(component.snackBar, 'open');

        const req = httpMock.expectOne('http://localhost:8090/secured/qualificacao');
        expect(req.request.method).toBe('GET');
        req.flush([{ 'id': 123 }, { 'id': 456 }]);

        expect(component.dataSource.data.length).toBe(2);
        expect(deserializeSpy).toHaveBeenCalledTimes(2);

        component.remover(123);

        const deleteRequest = httpMock.expectOne('http://localhost:8090/secured/qualificacao/123');
        expect(deleteRequest.request.method).toBe('DELETE');
        deleteRequest.flush({});

        expect(component.dataSource.data.length).toBe(1);
        expect(openSpy).toHaveBeenCalledOnceWith('Sucesso!', 'Fechar');
    });

    it('should not remove one qualification due an error', () => {

        const deserializeSpy = spyOn(Qualificacao.prototype, 'deserialize').and.callThrough();
        const openSpy = spyOn(component.snackBar, 'open');

        const req = httpMock.expectOne('http://localhost:8090/secured/qualificacao');
        expect(req.request.method).toBe('GET');
        req.flush([{ 'id': '123' }, { 'id': '456' }]);

        expect(component.dataSource.data.length).toBe(2);
        expect(deserializeSpy).toHaveBeenCalledTimes(2);

        component.remover(123);

        const deleteRequest = httpMock.expectOne('http://localhost:8090/secured/qualificacao/123');
        expect(deleteRequest.request.method).toBe('DELETE');
        deleteRequest.error(new ErrorEvent('ERROR', { message: 'IT CAN NOT BE DELETED.' }), { status: 403 });

        expect(component.dataSource.data.length).toBe(2);
        expect(openSpy).toHaveBeenCalledOnceWith('IT CAN NOT BE DELETED.', 'Fechar');
    });

});