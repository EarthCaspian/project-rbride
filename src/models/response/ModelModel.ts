import { BrandModel } from "./BrandModel";


export interface ModelModel {
	name: string;
	brand: BrandModel;
}

export interface GetAllModelModel {
	id: number;
	name: string;
	brand: BrandModel; 
}