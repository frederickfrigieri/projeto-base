import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.scss']
})
export class ConfirmarComponent implements OnInit {

  @Input() descricaoBotao = 'Excluir';
  @Output() confirmacao = new EventEmitter<boolean>();

  modalRef: BsModalRef;

  mostrarBotoesConfirmacao = false;
  mostrarBotaoPrincial = true;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  abrirModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  emitirConfiracao(confirmou: boolean): void {
    this.modalRef.hide();
    if (confirmou) { this.confirmacao.emit(confirmou); }
  }



}
