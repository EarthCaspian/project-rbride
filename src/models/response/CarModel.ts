import { ColorModel } from "./ColorModel";
import { ModelModel } from "./ModelModel";

export interface CarModel {
	modelYear: number;
	plate: string;
	minFindeksRate: number;
	kilometer: bigint;
	dailyPrice: number;
	imagePath: string;
	model: ModelModel;
	color: ColorModel;
}
