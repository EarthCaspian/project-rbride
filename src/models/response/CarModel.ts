import { ColorModel } from "./ColorModel";
import { ModelModel } from "./ModelModel";

export interface CarModel {
	id: number;
	modelYear: number;
	plate: string;
	minFindeksRate: number;
	kilometer: number;
	dailyPrice: number;
	imagePath: string;
	model: ModelModel;
	color: ColorModel;
}

