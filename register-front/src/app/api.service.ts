import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { servidor } from "./app.component";
import { UserModel } from "./model/user.model";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	private headers = new HttpHeaders();

	private httpClient = inject(HttpClient);

	save(user: UserModel) {
		return this.httpClient.post(`${servidor}/user/save`, user, { headers: this.headers });
	}

	delete(id: number) {
		return this.httpClient.delete(`${servidor}/user/${id}`, { headers: this.headers });
	}

	findAll() {
		return this.httpClient.get(`${servidor}/user/findAll`, { headers: this.headers });
	}

	findById(id: number) {
		return this.httpClient.get(`${servidor}/user/${id}`, { headers: this.headers });
	}
}
