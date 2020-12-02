// locale ngx
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
defineLocale('pt-br', ptBrLocale);
/////////////

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroPessoaFisicaComponent } from './autenticado/pessoa-fisica/cadastro-pessoa-fisica/cadastro-pessoa-fisica.component';
import { EdicaoPessoaFisicaComponent } from './autenticado/pessoa-fisica/edicao-pessoa-fisica/edicao-pessoa-fisica.component';
import { ListagemPessoaFisicaComponent } from './autenticado/pessoa-fisica/listagem-pessoa-fisica/listagem-pessoa-fisica.component';
import { LoginComponent } from './anonimo/acesso/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppFormBuilder } from './core/helpers/form.helper';
import { BemVindoComponent } from './autenticado/bem-vindo/bem-vindo.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpInterceptorService } from './core/services/http-interceptor.service';
import { AutenticadoComponent } from './autenticado/autenticado.component';
import { HeaderComponent } from './autenticado/header/header.component';
import { CampoTextoComponent } from './core/components/campo-texto/campo-texto.component';
import { CampoDataComponent } from './core/components/campo-data/campo-data.component';
import { ErrorMessagesComponent } from './core/components/error-messages/error-messages.component';
import { NgxMaskModule } from 'ngx-mask';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TituloComponent } from './autenticado/titulo/titulo.component'
import { CnpjOuCpfPipe } from './core/pipes/cpfOuCnpj.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CadastroPessoaFisicaComponent,
    EdicaoPessoaFisicaComponent,
    ListagemPessoaFisicaComponent,
    LoginComponent,
    BemVindoComponent,
    AutenticadoComponent,
    HeaderComponent,
    CampoTextoComponent,
    CampoDataComponent,
    ErrorMessagesComponent,
    TituloComponent,
    CnpjOuCpfPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule,
    BrowserAnimationsModule,
    BsDatepickerModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center' }),
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    AppFormBuilder,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private bsLocaleService: BsLocaleService) {
    this.bsLocaleService.use('pt-br');
  }
}
