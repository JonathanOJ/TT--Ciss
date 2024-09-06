import { Component, inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UserModel } from "../../model/user.model";
import { MessageService } from "primeng/api";
import { ApiService } from "../../api.service";
import { Subscription } from "rxjs";
import { Table } from "primeng/table";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styles: [
		`
			::ng-deep .p-inputtext {
				width: 100%;
			}
		`,
	],
	providers: [MessageService, ApiService],
})
export class RegisterComponent implements OnInit, OnDestroy {
	@ViewChild("dt2") dt2: Table | undefined;

	users: UserModel[] = [];
	selectedUser: UserModel = new UserModel();
	user: UserModel = new UserModel();

	searchValue: string = "";

	visibleDelete: boolean = false;
	visibleCreate: boolean = false;
	isInvalid: boolean = false;

	onCreateSub: Subscription = new Subscription();
	onDeleteSub: Subscription = new Subscription();
	findUsersSub: Subscription = new Subscription();

	private toastService = inject(MessageService);
	private api = inject(ApiService);

	ngOnInit(): void {
		this.findUsers();
	}

	ngOnDestroy(): void {
		this.onCreateSub ? this.onCreateSub.unsubscribe() : null;
		this.onDeleteSub ? this.onDeleteSub.unsubscribe() : null;
		this.findUsersSub ? this.findUsersSub.unsubscribe() : null;
	}

	findUsers() {
		this.findUsersSub = this.api.findAll().subscribe({
			next: (response: any) => {
				this.users = response;
			},
			error: (error) => {
				this.toastService.add({
					severity: "error",
					summary: "",
					detail: "Erro ao buscar usuários!",
				});
			},
		});
	}

	onDelete(id: number) {
		this.onDeleteSub = this.api.delete(id).subscribe({
			next: (response: any) => {
				this.users = this.users.filter((user) => user.id !== id);

				this.toastService.add({
					severity: "success",
					summary: "",
					detail: "Usuário deletado com sucesso!",
				});
				this.visibleDelete = false;
			},
			error: (error) => {
				this.toastService.add({
					severity: "error",
					summary: "",
					detail: "Erro ao deletar usuário!",
				});
			},
		});
	}

	onEdit(user: UserModel) {
		this.user = user;
		this.visibleCreate = true;
	}

	onCreate(user: UserModel) {
		const isValid = this.validate(user);

		user.nis = user.nis.replace(/\D/g, "");
		user.email = user.email.trim();

		if (isValid) {
			this.onCreateSub = this.api.save(user).subscribe({
				next: (response: any) => {
					!user.id ? this.findUsers() : "";

					this.toastService.add({
						severity: "success",
						summary: "",
						detail: "Usuário cadastrado com sucesso!",
					});
					this.visibleCreate = false;
				},
				error: (error) => {
					const errorMessage = error.error;
					this.toastService.add({
						severity: "error",
						summary: "",
						detail: errorMessage ? errorMessage : "Erro ao cadastrar usuário!",
					});
				},
			});
		}
	}

	handleCreateUser() {
		this.user = new UserModel();
		this.visibleCreate = true;
	}

	validate(user: UserModel): boolean {
		const showWarning = (detail: any) => {
			this.toastService.add({
				severity: "warn",
				summary: "",
				detail,
			});
		};

		const validations = [
			{ condition: !user.name, message: "Verifique o campo nome!" },
			{
				condition: user.name.length < 2 || user.name.length > 30,
				message: "O campo nome deve ter entre 2 e 30 caracteres!",
			},
			{ condition: !user.surname, message: "Verifique o campo sobrenome!" },
			{
				condition: user.surname.length < 2 || user.surname.length > 50,
				message: "O campo sobrenome deve ter entre 2 e 50 caracteres!",
			},
			{ condition: !user.email, message: "Verifique o campo e-mail!" },
			{
				condition: !user.email.includes("@") || !user.email.includes("."),
				message: "O campo e-mail deve ser um e-mail válido!",
			},
			{ condition: !user.nis, message: "Verifique o campo NIS!" },
		];

		for (const validation of validations) {
			if (validation.condition) {
				showWarning(validation.message);
				this.isInvalid = true;
				return false;
			}
		}

		return true;
	}

	onInput(event: Event): void {
		const inputElement = event.target as HTMLInputElement;
		this.dt2 ? this.dt2.filterGlobal(inputElement.value || "", "contains") : "";
	}

	clear(table?: Table) {
		table ? table.clear() : "";
		this.searchValue = "";
	}
}
