import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "nisFormat",
})
export class NisFormatPipe implements PipeTransform {
	transform(value: string | number): string {
		let nis = value.toString();

		if (nis.length !== 11) {
			return nis;
		}

		return `${nis.slice(0, 3)}.${nis.slice(3, 8)}.${nis.slice(8, 10)}-${nis.slice(10, 11)}`;
	}
}
